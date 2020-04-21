import { Resolver, Query, Args, Subscription, ObjectType, Field } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Node } from './map/node/node.model';
import { Connection } from './map/connection/connection.model';

@ObjectType()
export class StateChange {
  @Field(() => String)
  type: string;
  // @Field(() => String)
  // props: string;

  @Field(() => Node, { nullable: true })
  node: Node

  @Field(() => Connection, { nullable: true})
  connection: Connection
}

@Resolver()
export class AppResolver {
  constructor(private service: AppService) {}

  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`;
  }

  @Subscription(() => StateChange, {
    resolve: val => val
  })
  subscribe(@Args('mapId') mapId: number) {
    return this.service.asyncIterator(mapId);
  }
}
