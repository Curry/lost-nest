import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Connection extends Document {
  mapId: number;
  source: mongoose.Types.ObjectId;
  target: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date
}
