import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class Faction {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => Int)
    sizeFactor: number;

    @Field(() => Int)
    stationCount: number;

    @Field(() => Int)
    stationSystemCount: number;
}