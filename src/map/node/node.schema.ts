import * as mongoose from 'mongoose';

export const NodeSchema = new mongoose.Schema(
  {
    mapId: Number,
    systemId: Number,
    alias: { type: String, default: null },
    posX: { type: Number, default: 0 },
    posY: { type: Number, default: 0 }
  },
  { timestamps: true },
);
