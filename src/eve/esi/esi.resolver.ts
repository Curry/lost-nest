import { Resolver, Query } from '@nestjs/graphql';
import { EsiService } from './esi.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentCharacter } from '../character/decorators/character.decorator';

@Resolver()
export class EsiResolver {
  constructor(private service: EsiService) {}

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  online(@CurrentCharacter() char: { hash: string, id: number}) {
    return this.service.getOnline(char.id);
  }
}
