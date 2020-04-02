import { Field, Float, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class Static {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

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