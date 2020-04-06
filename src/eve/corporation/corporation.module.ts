import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporationService } from './corporation.service';
import { CorporationResolver } from './corporation.resolver';
import { CorporationSchema } from './corporation.schema';
import { AllianceModule } from '../alliance/alliance.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Corporation',
        schema: CorporationSchema,
        collection: 'corporations',
      },
    ]),
    AllianceModule
  ],
  exports: [CorporationService],
  providers: [
    CorporationService,
    CorporationResolver,
    {
      provide: 'PUB_SUB',
      useValue: new RedisPubSub(),
    },
  ],
})
export class CorporationModule {}
