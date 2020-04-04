import { Field, Float, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class Wormhole {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => [Number])
    sourceClasses: number[];

    @Field(() => Float)
    targetClass: number;

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