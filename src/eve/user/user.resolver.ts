import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql.auth';
import { CurrentUser } from './decorators/user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.service.findUser(user.username);
  }
}
