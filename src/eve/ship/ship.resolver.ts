import { Resolver, Args } from '@nestjs/graphql';
import { Ship } from './ship.model';
import { Query } from '@nestjs/graphql';
import { ShipService } from './ship.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentCharacter } from '../character/decorators/character.decorator';

@Resolver(() => Ship)
export class ShipResolver {
  constructor(private service: ShipService) {}

  @Query(() => Ship)
  @UseGuards(GqlAuthGuard)
  currentShip(@CurrentCharacter() char: { hash: string; id: number }) {
    return this.service.getShip(char.id);
  }

  @Query(() => Ship)
  ship(@Args('name') name: string) {
    return this.service.getShipByName(name);
  }
}
