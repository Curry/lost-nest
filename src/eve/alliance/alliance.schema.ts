import * as mongoose from 'mongoose';

export const AllianceSchema = new mongoose.Schema({
  allianceId: Number,
  allianceName: String,
  ticker: String,
  dateFounded: Date,
  factionId: Number,
});
