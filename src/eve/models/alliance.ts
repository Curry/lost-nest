import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Faction } from "./faction";

@ObjectType()
export class Alliance {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    ticker: string;

    @Field(() => Date, { nullable: true })
    dateFounded: Date;
    
    @Field(() => Faction, { nullable: true })
    factionId: Faction;
}