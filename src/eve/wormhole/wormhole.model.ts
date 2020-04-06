import { Field, Float, ObjectType, Int } from '@nestjs/graphql';
import { Class } from '../common/enums/class.enum';

@ObjectType()
export class Wormhole {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Class])
  sourceClasses: Class[];

  @Field(() => Class)
  targetClass: Class;

  @Field(() => Float)
  lifetime: number;

  @Field(() => Float)
  maxMass: number;

  @Field(() => Float)
  massRegen: number;

  @Field(() => Float)
  maxOnePass: number;

  @Field(() => Float, { nullable: true })
  scanStrength: number;
}
