import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { Static } from './static';

@ObjectType()
export class System {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  constellationId: number;

  @Field(() => Int, { nullable: true })
  starId: number;

  @Field(() => Int, { nullable: true })
  regionId: number;

  @Field(() => String)
  systemName: string;

  @Field(() => String, { nullable: true })
  security: string;

  @Field(() => Float)
  trueSec: number;

  @Field(() => Float)
  securityStatus: number;

  @Field(() => String, { nullable: true })
  securityClass: string;

  @Field(() => String)
  effect: string;

  @Field(() => [Static])
  statics?: Static[];
}
