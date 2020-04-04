import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemResolver } from './system.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemSchema } from './system.schema';
import { WormholeModule } from '../wormhole/wormhole.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'System',
        schema: SystemSchema,
        collection: 'systems'
      },
    ]),
    WormholeModule
  ],
  exports: [SystemService],
  providers: [SystemService, SystemResolver]
})
export class SystemModule {}
