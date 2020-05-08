import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NodeInput {
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
}
