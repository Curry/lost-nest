import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { System } from '../models/system';
import { Static } from '../models/static';
import { EveService } from '../eve.service';

@Resolver(() => System)
export class SystemResolver {
  constructor(private service: EveService) {}

  @Query(() => System, { name: 'system' })
  getSystem(@Args('id') id: number) {
    return this.service.getSystemById(id);
  }

  @Query(() => [System], { name: 'systemName' })
  getSystemByName(@Args('name') name: string) {
    return this.service.getSystemsFuzzyByName(name);
  }

  @ResolveField('statics', () => [Static])
  statics(@Parent() system: System) {
    return this.service.getStaticsForSystem(system.id);
  }
}
