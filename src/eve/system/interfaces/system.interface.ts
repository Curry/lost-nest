import { Document } from 'mongoose';

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
    class: number;
    effect: string;
    statics: number[];
}