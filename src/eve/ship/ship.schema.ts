import * as mongoose from 'mongoose';

export const ShipSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  mass: Number,
});
