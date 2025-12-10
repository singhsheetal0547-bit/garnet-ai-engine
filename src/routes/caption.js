const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Generate caption
router.post('/generate', async (req, res) => {
  try {
    const { content, platform = 'youtube_shorts', tone = 'casual' } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const caption = await aiService.generateCaption(content, platform, tone);

    res.json({
      success: true,
      caption,
      platform,
      tone,
      length: caption.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate multiple caption variations
router.post('/variations', async (req, res) => {
  try {
    const { content, platform = 'youtube_shorts', count = 3 } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const tones = ['casual', 'professional', 'humorous', 'inspirational', 'educational'];
    const variations = [];

    for (let i = 0; i < Math.min(count, 5); i++) {
      const tone = tones[i % tones.length];
      const caption = await aiService.generateCaption(content, platform, tone);
      variations.push({ caption, tone });
    }

    res.json({
      success: true,
      variations,
      platform
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
