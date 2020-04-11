import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Connection {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  mapId: number;

  @Field(() => String)
  source: string;

  @Field(() => String)
  target: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
