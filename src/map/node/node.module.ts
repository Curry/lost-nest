import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { NodeSchema } from './node.schema';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SystemModule } from 'eve/system/system.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Node',
        schema: NodeSchema,
        collection: 'nodes',
      },
    ]),
    SystemModule,
  ],
  exports: [NodeService],
  providers: [
    NodeService,
    NodeResolver,
    {
      provide: 'PUB_SUB',
      useValue: new RedisPubSub(),
    },
  ],
})
export class NodeModule {}
