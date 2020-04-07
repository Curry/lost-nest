import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  characterId: number;
  @Field(() => Date)
  lastLogin: Date;
  @Field(() => Boolean)
  active: boolean;
  @Field(() => String)
  name: string;
  @Field(() => String)
  ownerHash: string;
  @Field(() => String)
  esiAccessToken: string;
  @Field(() => Date)
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
