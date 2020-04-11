import { Resolver, Query, Args } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.model';

@Resolver(() => Connection)
export class ConnectionResolver {
  constructor(private service: ConnectionService) {}

  @Query(() => [Connection])
  connections(@Args('map') map: number) {
    return this.service.getConnectionsByMapId(map);
  }
}
