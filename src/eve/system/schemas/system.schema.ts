import { Schema } from 'mongoose';

export const SystemSchema = new Schema({
    _id: Number,
    constellationId: Number,
    starId: Number,
    regionId: Number,
    systemName: String,
    security: String,
    trueSec: Number,
    securityStatus: Number,
    securityClass: String,
    class: Number,
    effect: String,
    statics: [{ type: Schema.Types.Number, ref: 'Static', autopopulate: true}]
});