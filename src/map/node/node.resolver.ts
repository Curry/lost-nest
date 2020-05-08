import { Resolver, Args, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './node.model';
import { SystemService } from 'eve/system/system.service';
import { System } from 'eve/system/system.model';
import { NodeInput } from './node.input';

@Resolver(() => Node)
export class NodeResolver {
  constructor(
    private service: NodeService,
    private systemService: SystemService,
  ) {}

  @Query(() => [Node])
  nodes(@Args('map') map: number) {
    return this.service.findNodesByMapId(map);
  }

  @ResolveField('system', () => System)
  system(@Parent() node: Node) {
    return this.systemService.getSystemById(node.systemId);
  }

  @Mutation(() => Node)
  addNode(
    @Args('map') map: number,
    @Args('system') system: number,
  ) {
    return this.service.saveNode(map, system);
  }

  @Mutation(() => Node)
  syncNode(
    @Args('node') node: NodeInput,
  ) {
    return this.service.syncChanges(node);
  }

  @Mutation(() => Node)
  moveNode(
    @Args('id') id: string,
    @Args('posX') posX: number,
    @Args('posY') posY: number
  ) {
    return this.service.moveNode(id, posX, posY);
  }

  @Mutation(() => Node)
  deleteNode(
    @Args('id') id: string
  ) {
    return this.service.deleteNode(id);
  }

  @Mutation(() => Node)
  deleteNodeBySystem(
    @Args('systemId') systemId: number
  ) {
    return this.service.deleteNodeBySystem(systemId);
  }
}
