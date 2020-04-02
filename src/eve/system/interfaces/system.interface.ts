import { Document } from 'mongoose';
import { Static } from './static.interface';

export interface System extends Document {
    id: number;
    constellationId: number;
    starId: number;
    regionId: number;
    systemName: string;
    security: string;
    trueSec: number;
    securityStatus: number;
    securityClass: string;
    effect: string;
    statics: Static[];
}