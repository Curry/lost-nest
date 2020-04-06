import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Esi {
  @Field(() => Int)
  id: number;
}
