import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CorporationInput {
  @Field(() => Int)
  corporationId: number;

  @Field(() => String)
  corporationName: string;

  @Field(() => String)
  ticker: string;

  @Field(() => Date, { defaultValue: null })
  dateFounded: Date;

  @Field(() => Int)
  memberCount: number;

  @Field(() => Boolean, { defaultValue: false })
  isNPC: boolean;

  @Field(() => Int, { defaultValue: null })
  allianceId: number;

  @Field(() => Int, { defaultValue: null })
  factionId: number;
}
