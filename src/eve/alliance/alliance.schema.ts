import { Schema } from 'mongoose';

export const AllianceSchema = new Schema({
  allianceId: Number,
  allianceName: String,
  ticker: String,
  dateFounded: Date,
  factionId: Number,
});
