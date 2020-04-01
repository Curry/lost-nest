import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../models/user';

@Resolver(() => User)
export class UserResolver {
}
