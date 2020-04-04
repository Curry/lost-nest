import { Resolver } from '@nestjs/graphql';
import { AllianceService } from './alliance.service';
import { Alliance } from './alliance.model';

@Resolver(() => Alliance)
export class AllianceResolver {
  constructor(private service: AllianceService) {}
}
