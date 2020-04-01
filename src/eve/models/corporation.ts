import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Faction } from "./faction";
import { Alliance } from "./alliance";

@ObjectType()
export class Corporation {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    ticker: string;

    @Field(() => Date, { nullable: true })
    dateFounded: Date;

    @Field(() => Int)
    memberCount: number;

    @Field(() => Boolean)
    isNPC: boolean;

    @Field(() => Alliance, { nullable: true })
    allianceId: Alliance;
    
    @Field(() => Faction, { nullable: true })
    factionId: Faction;
}