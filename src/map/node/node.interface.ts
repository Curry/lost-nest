import { Document } from 'mongoose';

export interface Node extends Document {
  mapId: number;
  systemId: number;
  alias: string;
  posX: number;
  posY: number;
}
