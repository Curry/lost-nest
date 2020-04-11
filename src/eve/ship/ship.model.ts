import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Ship {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  mass: number;

  @Field(() => String, { nullable: true })
  alias: string;
}
