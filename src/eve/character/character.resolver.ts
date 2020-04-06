import { Resolver } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './character.model';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private service: CharacterService) {}
}
