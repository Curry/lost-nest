import * as mongoose from 'mongoose';

export const ConnectionSchema = new mongoose.Schema(
  {
    mapId: Number,
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
    target: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  },
  { timestamps: true },
);
