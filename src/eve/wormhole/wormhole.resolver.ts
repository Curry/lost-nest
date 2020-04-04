import { Resolver, Query, Args } from '@nestjs/graphql';
import { WormholeService } from './wormhole.service';
import { Wormhole } from './wormhole.model';
import { Class } from '../common/enums/class.enum';

@Resolver(() => Wormhole)
export class WormholeResolver {
  constructor(private service: WormholeService) {}

  @Query(() => [Wormhole], { name: 'wormhole' })
  getWormholesBySource(@Args('source', { type: () => Class }) source: Class) {
    return this.service.getWormholesBySource(source);
  }
}
