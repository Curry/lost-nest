import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;
}
