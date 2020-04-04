import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Corporation {
  @Field(() => Int)
  corporationId: number;

  @Field(() => String)
  corporationName: string;

  @Field(() => String)
  ticker: string;

  @Field(() => Date, { nullable: true })
  dateFounded: Date;

  @Field(() => Int)
  memberCount: number;

  @Field(() => Boolean)
  isNPC: boolean;

  @Field(() => Int, { nullable: true })
  allianceId: number;

  @Field(() => Int, { nullable: true })
  factionId: number;
}
