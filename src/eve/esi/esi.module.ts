import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EsiService } from './esi.service';
import { EsiResolver } from './esi.resolver';
import { EsiSchema } from './esi.schema';
import { CorporationModule } from '../corporation/corporation.module';
import { AllianceModule } from '../alliance/alliance.module';
import { CharacterModule } from '../character/character.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Esi',
        schema: EsiSchema,
        collection: 'esis'
      },
    ]),
    HttpModule,
    CorporationModule,
    AllianceModule,
    CharacterModule,
    AuthModule,
  ],
  exports: [EsiService],
  providers: [EsiService, EsiResolver]
})
export class EsiModule {}