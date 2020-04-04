import { Resolver, Query, Args } from '@nestjs/graphql';
import { System } from './system.model';
import { SystemService } from './system.service';
import { SystemArgs } from '../common/inputs/systemArgs.input';

@Resolver(() => System)
export class SystemResolver {
  constructor(private service: SystemService) {}

  @Query(() => System)
  system(@Args('id') id: number) {
    return this.service.getSystemById(id);
  }

  @Query(() => [System])
  systems(@Args() types: SystemArgs) {
    return this.service.getSystems(types);
  }
}
