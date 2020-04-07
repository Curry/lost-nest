import { Module, HttpModule } from '@nestjs/common';
import { EsiService } from './esi.service';
import { EsiResolver } from './esi.resolver';
import { CharacterModule } from '../character/character.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    CharacterModule,
    AuthModule,
  ],
  exports: [EsiService],
  providers: [EsiService, EsiResolver]
})
export class EsiModule {}
