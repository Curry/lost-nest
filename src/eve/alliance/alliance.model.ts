import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Alliance {
  @Field(() => Int)
  allianceId: number;

  @Field(() => String)
  allianceName: string;

  @Field(() => String)
  ticker: string;

  @Field(() => Date, { nullable: true })
  dateFounded: Date;

  @Field(() => Int, { nullable: true })
  factionId: number;
}
