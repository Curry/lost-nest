import { Schema } from 'mongoose';

export const CharacterSchema = new Schema(
  {
    characterId: Number,
    lastLogin: Date,
    active: Boolean,
    name: String,
    ownerHash: String,
    esiAccessToken: String,
    esiAccessTokenExpires: Date,
    esiRefreshToken: String,
    esiScopes: String,
    corporationId: { type: Number, default: '' },
    allianceId: { type: Number, default: '' },
  },
  { timestamps: true },
);
