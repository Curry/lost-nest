import { Resolver, Query } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './character.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentCharacter } from './decorators/character.decorator';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private service: CharacterService) {}

  @Query(() => Character)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentCharacter() char: { hash: string; id: number }) {
    return this.service.findCharacter(char.id);
  }
}
