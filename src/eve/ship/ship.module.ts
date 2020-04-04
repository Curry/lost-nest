import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipResolver } from './ship.resolver';
import { ShipSchema } from './ship.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ship',
        schema: ShipSchema,
        collection: 'ships',
      },
    ]),
  ],
  providers: [ShipService, ShipResolver],
})
export class ShipModule {}
