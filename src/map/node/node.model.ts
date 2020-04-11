import { Field, Int, ObjectType } from '@nestjs/graphql';
import { System } from 'eve/system/system.model';

@ObjectType()
export class Node {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  mapId: number;

  @Field(() => System)
  system: System;
}
