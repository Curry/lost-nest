import { Resolver, Args } from '@nestjs/graphql';
import { Ship } from './ship.model';
import { Query } from '@nestjs/graphql';
import { ShipService } from './ship.service';

@Resolver(() => Ship)
export class ShipResolver {
  constructor(private service: ShipService) {}

  @Query(() => Ship)
  ship(@Args('name') name: string) {
    return this.service.getShipByName(name);
  }
}
