import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ConnectionInput {
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
