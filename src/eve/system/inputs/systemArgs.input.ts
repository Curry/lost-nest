import { ArgsType, Field } from '@nestjs/graphql';
import { Effect } from 'src/eve/enums/effect.enum';
import { Class } from 'src/eve/enums/class.enum';

@ArgsType()
export class SystemArgs {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  systemName: string;

  @Field(() => [Class], { defaultValue: [] })
  statics: Class[];

  @Field(() => Effect, { nullable: true })
  effect: Effect;

  @Field(() => Class, { nullable: true })
  class: Class;
}
