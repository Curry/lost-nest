import { Field, ObjectType } from '@nestjs/graphql';
import { System } from 'eve/system/system.model';

@ObjectType()
export class Node {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  mapId: number;

  @Field(() => Number)
  systemId: number;

  @Field(() => String, { nullable: true })
  alias: string;

  @Field(() => Number)
  posX: number;

  @Field(() => Number)
  posY: number;

  @Field(() => System)
  system: System;
}
