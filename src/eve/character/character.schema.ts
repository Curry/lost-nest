import { Schema } from 'mongoose';

export const CharacterSchema = new Schema({
    characterId: Number,
    lastLogin: Date,
    active: Boolean,
    name: String,
    ownerHash: String,
    esiAccessToken: String,
    esiAccessTokenExpires: Date,
    esiRefreshToken: String,
    esiScopes: String,
    corporationId: Number,
    allianceId: Number,
    roleId: Number,
    cloneLocationId: Number,
    cloneLocationType: String,
    kicked: Date,
    banned: Date,
    shared: Boolean,
    logLocation: Boolean,
    selectLocation: Boolean,
    securityStatus: Boolean
}, { timestamps: true });
