import { Document } from 'mongoose';

export interface Alliance extends Document {
  allianceId: number;
  allianceName: string;
  ticker: string;
  dateFounded: Date;
  factionId: number;
}
