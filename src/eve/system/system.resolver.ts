import { Resolver, Query, Args } from '@nestjs/graphql';
import { System } from './models/system.model';
import { SystemService } from './system.service';

@Resolver(() => System)
export class SystemResolver {
  constructor(private service: SystemService) {}

  @Query(() => [System], { name: 'systems' })
  getSystems() {
    return this.service.getSystems();
  }

  @Query(() => System, { name: 'system' })
  getSystemById(@Args('id') id: number) {
    return this.service.getSystemById(id);
  }

  @Query(() => [System], { name: 'systemName' })
  getSystemsByName(@Args('name') name: string) {
    return this.service.getSystemsByName(name);
  }

  @Query(() => [System], { name: 'systemStatic' })
  getSystemsByStatic(@Args('type') type: string) {
    return this.service.getSystemByStatic(type);
  }
}
