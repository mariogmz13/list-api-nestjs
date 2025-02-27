/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    // username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

})