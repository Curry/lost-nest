import { Document } from 'mongoose';

export interface Wormhole extends Document {
    id: number;
    name: string;
    sourceClasses: number[];
    targetClass: number;
    lifetime: number;
    maxMass: number;
    massRegen: number;
    maxOnePass: number;
    scanStrength: number;
}