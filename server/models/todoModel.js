import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
})

export default mongoose.model("Todo", todoSchema);