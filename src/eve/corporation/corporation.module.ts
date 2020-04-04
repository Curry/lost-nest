import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporationService } from './corporation.service';
import { CorporationResolver } from './corporation.resolver';
import { CorporationSchema } from './corporation.schema';
import { AllianceModule } from '../alliance/alliance.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Corporation',
        schema: CorporationSchema,
        collection: 'corporations',
      },
    ]),
    AllianceModule,
  ],
  exports: [CorporationService],
  providers: [CorporationService, CorporationResolver],
})
export class CorporationModule {}
