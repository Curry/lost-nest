import * as mongoose from 'mongoose';

 const NodeSchema = new mongoose.Schema(
  {
    mapId: Number,
    systemId: Number,
    alias: { type: String, default: null },
    posX: { type: Number, default: 0 },
    posY: { type: Number, default: 0 },
  },
  { timestamps: true, toObject: { virtuals: true } },
);

NodeSchema.virtual('system', {
  ref: 'System',
  localField: 'systemId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true
});

export { NodeSchema }
