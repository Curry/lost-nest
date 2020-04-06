import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: { type: String, lowercase: true },
    username: String,
    password: String,
    activeCharacter: { type: Number, ref: 'Character', autopopulate: true, default: null },
    characters: [{ type: Number, ref: 'Character', autopopulate: true, default: null }],
});