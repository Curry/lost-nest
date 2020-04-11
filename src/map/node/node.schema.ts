import * as mongoose from 'mongoose';

export const NodeSchema = new mongoose.Schema(
  {
    mapId: Number,
    system: { type: Number, ref: 'System', autopopulate: true },
  },
  { timestamps: true },
);
