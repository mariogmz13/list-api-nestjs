/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: Boolean,
    created_at: Date,
    updated_at: Date,
})