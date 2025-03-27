const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');

// Save Mood Entry
router.post('/add', async (req, res) => {
    try {
        const newMood = new Mood(req.body);
        await newMood.save();
        res.json({ message: "✅ Mood saved!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Moods for a User
router.get('/:userId', async (req, res) => {
    try {
        const moods = await Mood.find({ userId: req.params.userId });
        res.json(moods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
