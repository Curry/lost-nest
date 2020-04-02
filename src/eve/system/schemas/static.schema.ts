import { Schema } from 'mongoose'

export const StaticSchema = new Schema({
    _id: Number,
    name: String,
    targetClass: Number,
    lifetime: Number,
    maxMass: Number,
    massRegen: Number,
    maxOnePass: Number,
    scanStrength: Number,
})