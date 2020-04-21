import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.model';

@Resolver(() => Connection)
export class ConnectionResolver {
  constructor(private service: ConnectionService) {}

  @Mutation(() => Connection)
  addConnection(
    @Args('map') map: number,
    @Args('source') source: string,
    @Args('target') target: string,
  ) {
    return this.service.saveConnection(map, source, target);
  }

  @Mutation(() => Connection)
  removeConnection(
    @Args('source') source: string,
    @Args('target') target: string,
  ) {
    return this.service.deleteConnection(source, target);
  }

  @Mutation(() => [Connection], { nullable: true })
  removeConnectionsByNode(
    @Args('nodeId') nodeId: string
  ) {
    return this.service.deleteConnectionsForNode(nodeId);
  }

  @Query(() => [Connection])
  connections(@Args('map') map: number) {
    return this.service.getConnectionsByMapId(map);
  }
}
