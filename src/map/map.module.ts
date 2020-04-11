import { Module } from '@nestjs/common';
import { ConnectionModule } from '../map/connection/connection.module';
import { NodeModule } from '../map/node/node.module';

@Module({
  imports: [ConnectionModule, NodeModule],
})
export class MapModule {}
