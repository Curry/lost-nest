import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { ConnectionSchema } from './connection.schema';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Connection',
        schema: ConnectionSchema,
        collection: 'connections',
      },
    ]),
  ],
  exports: [ConnectionService],
  providers: [
    ConnectionService,
    ConnectionResolver,
    {
      provide: 'PUB_SUB',
      useValue: new RedisPubSub(),
    },
  ],
})
export class ConnectionModule {}
