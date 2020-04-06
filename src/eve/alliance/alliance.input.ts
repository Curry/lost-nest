import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AllianceInput {
  @Field(() => Int)
  allianceId: number;

  @Field(() => String)
  allianceName: string;

  @Field(() => String)
  ticker: string;

  @Field(() => Date, { defaultValue: null })
  dateFounded: Date;

  @Field(() => Int, { defaultValue: null })
  factionId: number;
}
