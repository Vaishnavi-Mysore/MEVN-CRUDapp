import express from "express";
import Module from "../models/module.model.js";

const router = express.Router();

// Get all modules
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find().populate('category')?.populate('topicsCovered');
        res.json(modules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific module
router.get('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id).populate('category', '_id').populate('topicsCovered').lean();
        if (!module) {
            return res.status(404).send({ message: 'Module not found' });
        }

        // Transform the category field to just contain the _id as a string
        module.category = module.category._id;

        res.status(200).json(module);   
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new module
router.post('/', async (req, res) => {
    const module = new Module({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    });
    try {
        const newModule = await module.save();
        res.status(201).json(newModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a module
router.put('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (req.body.name != null) {
            module.name = req.body.name;
        }
        if (req.body.category != null) {
            module.category = req.body.category;
        }
        if (req.body.description != null) {
            module.description = req.body.description;
        }
        const updatedModule = await module.save();
        res.json(updatedModule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a module
router.delete('/:id', async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        // await module.remove();
        res.json({ message: 'Module deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;