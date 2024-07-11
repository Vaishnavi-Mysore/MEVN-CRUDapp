import express from "express";
import Module from "../models/module.model.js";
import Topic from "../models/topic.model.js";

const router = express.Router();

// Get all topics for a module
router.get('/', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id).populate('topicsCovered');
        res.json(module.topicsCovered);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new topic for a module
router.post('/', async (req, res) => {
    const topic = new Topic({
        title: req.body.title,
    });
    try {
        const newTopic = await topic.save();
        const module = req?.baseUrl?.split('/')[2] ? await Module.findById(req?.baseUrl?.split('/')[2]) : await Module.findById(req.params.id);
        if (!module) {
            console.log('Module not found');
            return res.status(404).json({ message: 'Module not found' });
        }
        module.topicsCovered.push(newTopic);
        await module.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a topic
router.put('/:topicId', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.topicId);
        if (req.body.title != null) {
            topic.title = req.body.title;
        }
        if (req.body.content != null) {
            topic.content = req.body.content;
        }
        const updatedTopic = await topic.save();
        res.json(updatedTopic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a topic
router.delete('/:topicId', async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.topicId);
        const module = req?.baseUrl?.split('/')[2] ? await Module.findById(req?.baseUrl?.split('/')[2]) : await Module.findById(req.params.id);
        module.topicsCovered.pull(topic);
        await module.save();
        res.json({ message: 'Topic deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;