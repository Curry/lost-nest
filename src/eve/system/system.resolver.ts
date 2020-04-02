import { Resolver, Query, Args } from '@nestjs/graphql';
import { System } from './models/system.model';
import { SystemService } from './system.service';
import { SystemArgs } from './inputs/systemArgs.input';

@Resolver(() => System)
export class SystemResolver {
  constructor(private service: SystemService) {}

  @Query(() => System, { name: 'system' })
  getSystemById(@Args('id') id: number) {
    return this.service.getSystemById(id);
  }

  @Query(() => [System], { name: 'systems' })
  getSystemsByStatics(@Args() types: SystemArgs) {
    return this.service.getSystemsByStatics(types);
  }
}
