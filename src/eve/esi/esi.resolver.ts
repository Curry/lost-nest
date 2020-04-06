import { Resolver, Query } from '@nestjs/graphql';
import { EsiService } from './esi.service';
import { Esi } from './esi.model';

@Resolver(() => Esi)
export class EsiResolver {
  constructor(private service: EsiService) {}

  @Query(() => Boolean)
  val(){
    this.service.getNAlliances(100).subscribe(val => console.log(val));
    return true;
  }
}
