import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { CorporationService } from './corporation.service';
import { Corporation } from './corporation.model';
import { AllianceService } from '../alliance/alliance.service';
import { Alliance } from '../alliance/alliance.model';
import { map } from 'rxjs/operators';
import { CorporationInput } from './corporation.input';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver(() => Corporation)
export class CorporationResolver {
  constructor(
    private service: CorporationService,
    private allianceService: AllianceService,
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
  ) {}

  @Query(() => Corporation)
  corporation(@Args('name') name: string) {
    return this.service.getCorporationByName(name);
  }

  @Mutation(() => Corporation)
  addCorporation(@Args('corporationData') corporationData: CorporationInput) {
    return this.service.saveCorporation(corporationData);
  }

  @ResolveField(() => String, { nullable: true })
  allianceName(@Parent() corporation: Corporation) {
    return this.allianceService
      .getAllianceById(corporation.allianceId)
      .pipe(map(val => val?.allianceName));
  }

  @ResolveField(() => Alliance, { nullable: true })
  alliance(@Parent() corporation: Corporation) {
    return this.allianceService.getAllianceById(corporation.allianceId);
  }

  @Subscription(() => Corporation, {
    resolve: val => val
  })
  corpChanged() {
    console.log('subscription')
    return this.pubSub.asyncIterator('test');
  }
}
