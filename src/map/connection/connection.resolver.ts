import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
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
    @Args('map') map: number,
    @Args('source') source: string,
    @Args('target') target: string,
  ) {
    return this.service.deleteConnection(map, source, target);
  }

  @Mutation(() => Boolean, { nullable: true })
  removeConnectionsByNode(
    @Args('nodeId') nodeId: string
  ) {
    return this.service.deleteConnectionsForNode(nodeId);
  }

  @Query(() => [Connection])
  connections(@Args('map') map: number) {
    return this.service.getConnectionsByMapId(map);
  }

  @Subscription(() => Connection, {
    resolve: val => {
      return { id: val._id, ...val }
    },
  })
  connectionAdded(@Args('map') map: number) {
    return this.service.asyncAddIterator(map);
  }

  @Subscription(() => String, {
    resolve: val => val
  })
  connectionRemoved() {
    return this.service.asyncRemoveIterator();
  }
}
