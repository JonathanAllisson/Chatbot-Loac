import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    id_user: String,
    title_email: String,
});

export const Session = mongoose.model('Session', SessionSchema);
