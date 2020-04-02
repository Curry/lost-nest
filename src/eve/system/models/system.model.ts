import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { Static } from './static.model';
import { Effect } from 'src/eve/enums/effect.enum';

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

  @Field(() => Number)
  class: number;

  @Field(() => Effect, { nullable: true })
  effect: string;

  @Field(() => [Static])
  statics?: Static[];
}
