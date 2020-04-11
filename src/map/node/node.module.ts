import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { NodeSchema } from './node.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Node',
        schema: NodeSchema,
        collection: 'nodes',
      },
    ]),
  ],
  exports: [NodeService],
  providers: [NodeService, NodeResolver],
})
export class NodeModule {}
