export class ESIAlliance {
    alliance_id: number;
    faction_id?: number;
    creator_corporation_id: number;
    creator_id: number;
    date_founded: Date;
    executor_corporation_id: number;
    name: string;
    ticker: string;
    corporations: ESICorporation[];
    corpIds: number[];
}


export class ESICorporation {
    alliance_id: number;
    corporation_id: number
    ceo_id: number;
    creator_id: number;
    date_founded: Date;
    description: string;
    home_station_id: number;
    member_count: number;
    name: string
    shares: number
    tax_rate: number;
    ticker: string;
    url: string;
    war_eligible: boolean;
    faction_id?: number;
}

export interface IEveRawProfile {
    CharacterID: number;
    CharacterName: string;
    ExpiresOn: Date;
    Scopes: string;
    TokenType: string;
    CharacterOwnerHash: string;
    IntellectualProperty: string;
}