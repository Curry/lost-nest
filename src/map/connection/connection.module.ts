import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { ConnectionSchema } from './connection.schema';
import { NodeModule } from '../node/node.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Connection',
        schema: ConnectionSchema,
        collection: 'connections',
      },
    ]),
    NodeModule,
  ],
  exports: [ConnectionService],
  providers: [ConnectionService, ConnectionResolver],
})
export class ConnectionModule {}
