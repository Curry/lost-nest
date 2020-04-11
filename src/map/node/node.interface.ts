import { Document } from 'mongoose';

export interface Node extends Document {
  mapId: number;
  system: number;
}
