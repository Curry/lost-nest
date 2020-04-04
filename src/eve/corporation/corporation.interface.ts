import { Document } from 'mongoose';

export interface Corporation extends Document {
  corporationId: number;
  corporationName: string;
  ticker: string;
  dateFounded: Date;
  memberCount: number;
  isNPC: boolean;
  allianceId: number;
  factionId: number;
}
