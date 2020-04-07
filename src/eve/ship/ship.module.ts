import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipResolver } from './ship.resolver';
import { ShipSchema } from './ship.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EsiModule } from '../esi/esi.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ship',
        schema: ShipSchema,
        collection: 'ships',
      },
    ]),
    EsiModule,
  ],
  exports: [ShipService],
  providers: [ShipService, ShipResolver],
})
export class ShipModule {}
