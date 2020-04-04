import { Schema } from 'mongoose';

export const WormholeSchema = new Schema({
  _id: Number,
  name: String,
  sourceClasses: [Number],
  targetClass: Number,
  lifetime: Number,
  maxMass: Number,
  massRegen: Number,
  maxOnePass: Number,
  scanStrength: Number,
});
