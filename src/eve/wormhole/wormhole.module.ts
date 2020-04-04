import { Module } from '@nestjs/common';
import { WormholeService } from './wormhole.service';
import { WormholeResolver } from './wormhole.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { WormholeSchema } from './wormhole.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Wormhole',
        schema: WormholeSchema,
        collection: 'wormholes'
      }
    ])
  ],
  exports: [WormholeService],
  providers: [WormholeService, WormholeResolver]
})
export class WormholeModule {}
