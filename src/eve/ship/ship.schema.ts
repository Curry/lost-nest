import { Schema } from 'mongoose'

export const ShipSchema = new Schema({
    _id: Number,
    name: String,
    mass: Number,
})
