import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { Effect } from '../common/enums/effect.enum';
import { Wormhole } from '../wormhole/wormhole.model';

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

  @Field(() => [Wormhole])
  statics?: Wormhole[];
}
