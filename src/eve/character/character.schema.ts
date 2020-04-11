import * as mongoose from 'mongoose';

export const CharacterSchema = new mongoose.Schema(
  {
    characterId: Number,
    lastLogin: Date,
    active: { type: Boolean, default: false },
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
