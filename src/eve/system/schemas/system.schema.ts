import { Schema } from 'mongoose';

const SystemSchema = new Schema({
    id: Number,
    constellationId: Number,
    starId: Number,
    regionId: Number,
    systemName: String,
    security: String,
    trueSec: Number,
    securityStatus: Number,
    securityClass: String,
    effect: String,
});

SystemSchema.virtual('statics', {
    ref: 'Static',
    localField: 'statics',
    foreignField: 'id',
    autopopulate: true,
})

export { SystemSchema }