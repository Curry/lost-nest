import * as mongoose from 'mongoose';

export const SystemSchema = new mongoose.Schema({
  _id: Number,
  constellationId: Number,
  regionId: Number,
  systemName: String,
  security: String,
  trueSec: Number,
  securityStatus: Number,
  securityClass: String,
  class: Number,
  effect: String,
  statics: [{ type: Number, ref: 'Wormhole', autopopulate: true }],
  staticTargets: [Number],
  planets: [String],
  moons: Number,
});
