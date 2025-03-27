require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed", err));

// Mood Schema
const MoodSchema = new mongoose.Schema({
    mood: String,
    timestamp: { type: Date, default: Date.now }
});
const Mood = mongoose.model('Mood', MoodSchema);

// Route to save mood data
app.post('/moods', async (req, res) => {
    try {
        const newMood = new Mood(req.body);
        await newMood.save();
        res.status(201).json({ message: "Mood saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving mood" });
    }
});

// Route to get mood data (for parental dashboard)
app.get('/moods', async (req, res) => {
    try {
        const moods = await Mood.find();
        res.json(moods);
    } catch (error) {
        res.status(500).json({ error: "Error fetching mood data" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
