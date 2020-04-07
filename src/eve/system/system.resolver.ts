import { Resolver, Query, Args } from '@nestjs/graphql';
import { System } from './system.model';
import { SystemService } from './system.service';
import { Class } from '../common/enums/class.enum';
import { Effect } from '../common/enums/effect.enum';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentCharacter } from '../character/decorators/character.decorator';

@Resolver(() => System)
export class SystemResolver {
  constructor(private service: SystemService) {}

  @Query(() => System)
  @UseGuards(GqlAuthGuard)
  location(@CurrentCharacter() char: { hash: string, id: number}) {
    return this.service.getLocation(char.id);
  }

  @Query(() => System)
  systemId(@Args('id') id: number) {
    return this.service.getSystemById(id);
  }

  @Query(() => System)
  systemName(@Args('name') name: string) {
    return this.service.getSystemByName(name);
  }

  @Query(() => [String])
  systemReg(@Args('name') name: string) {
    return this.service.getSystemsRegex(name);
  }

  @Query(() => [System])
  systems(
    @Args('class', { type: () => Class, defaultValue: null }) sourceClass: Class,
    @Args('statics', { type: () => [Class], defaultValue: [] }) statics: Class[],
    @Args('effect', { type: () => Effect, defaultValue: null }) effect: Effect,
  ) {
    return this.service.getSystems(sourceClass, statics, effect);
  }
}
