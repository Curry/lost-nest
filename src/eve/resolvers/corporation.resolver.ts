import { Resolver, Query, Args } from '@nestjs/graphql';
import { Corporation } from '../models/corporation';
import { CorporationService } from '../services/corporation.service';

@Resolver(() => Corporation)
export class CorporationResolver {
    constructor(private service: CorporationService) {}
    
    @Query(() => Corporation, { name: 'corporation' })
    getCorporation(@Args('id') id: number) {
      return this.service.getCorporationById(id);
    }
  
}
