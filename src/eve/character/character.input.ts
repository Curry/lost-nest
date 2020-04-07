import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CharacterInput {
  @Field(() => Int)
  characterId: number;

  @Field(() => Date, { defaultValue: null })
  lastLogin: Date;

  @Field(() => Boolean, { defaultValue: true })
  active: boolean;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerHash: string;

  @Field(() => String)
  esiAccessToken: string;

  @Field(() => Date, { defaultValue: null })
  esiAccessTokenExpires: Date;

  @Field(() => String)
  esiRefreshToken: string;

  @Field(() => String)
  esiScopes: string;

  @Field(() => Int)
  corporationId: number;

  @Field(() => Int)
  allianceId: number;
}
