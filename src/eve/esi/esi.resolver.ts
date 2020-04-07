import { Resolver, Query } from '@nestjs/graphql';
import { EsiService } from './esi.service';
import { Esi } from './esi.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentCharacter } from '../character/decorators/character.decorator';

@Resolver(() => Esi)
export class EsiResolver {
  constructor(private service: EsiService) {}

  @Query(() => Boolean)
  val(){
    this.service.getNAlliances(100).subscribe(val => console.log(val));
    return true;
  }

  @Query(() => Number)
  @UseGuards(GqlAuthGuard)
  location(@CurrentCharacter() char: { hash: string, id: number}) {
    return this.service.getLocation(char.id);
  }
}
