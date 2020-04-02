import { Document } from 'mongoose';

export interface Static extends Document {
    id: number;
    name: string;
    targetClass: number;
    lifetime: number;
    maxMass: number;
    massRegen: number;
    maxOnePass: number;
}