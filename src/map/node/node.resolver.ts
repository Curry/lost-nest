import { Resolver, Args, Query } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './node.model';

@Resolver(() => Node)
export class NodeResolver {
  constructor(private service: NodeService) {}

  @Query(() => [Node])
  nodes(@Args('map') map: number) {
    return this.service.findNodesByMapId(map);
  }
}
