import * as mongoose from 'mongoose';

export const CorporationSchema = new mongoose.Schema({
  corporationId: Number,
  corporationName: String,
  ticker: String,
  dateFounded: Date,
  memberCount: Number,
  isNPC: Boolean,
  allianceId: Number,
  factionId: Number,
});
