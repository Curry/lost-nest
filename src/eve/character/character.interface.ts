import { Document } from 'mongoose';

export interface Character extends Document {
    id: number;
    characterId: number;
    lastLogin: Date;
    active: boolean;
    name: string;
    ownerHash: string;
    esiAccessToken: string;
    esiAccessTokenExpires: Date;
    esiRefreshToken: string;
    esiScopes: string;
    corporationId: number;
    allianceId: number;
}
