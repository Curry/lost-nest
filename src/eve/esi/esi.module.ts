import { Module, HttpModule } from '@nestjs/common';
import { EsiService } from './esi.service';
import { EsiResolver } from './esi.resolver';
import { CharacterModule } from '../character/character.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
  imports: [HttpModule, CharacterModule, AuthModule],
  exports: [EsiService],
  providers: [
    EsiService,
    EsiResolver,
    {
      provide: 'PUB_SUB',
      useValue: new RedisPubSub(),
    },
  ],
})
export class EsiModule {}
