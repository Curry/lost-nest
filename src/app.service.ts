import { Injectable, Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class AppService {
  constructor(@Inject('PUB_SUB') private pubSub: RedisPubSub) {}

  asyncIterator = (mapId: number) =>
    this.pubSub.asyncIterator(`sub.${mapId}`);
}
