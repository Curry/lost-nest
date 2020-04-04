import { Document } from 'mongoose';

export interface Ship extends Document {
  id: number;
  name: string;
  mass: number;
}
