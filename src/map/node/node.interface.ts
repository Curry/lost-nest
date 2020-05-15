import { Document } from 'mongoose';
import { System } from 'eve/system/system.interface';

export interface Node extends Document {
  mapId: number;
  systemId: number;
  system: System;
  alias: string;
  posX: number;
  posY: number;
}
