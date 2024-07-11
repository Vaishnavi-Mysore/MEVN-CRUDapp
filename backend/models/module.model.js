import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    topicsCovered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;