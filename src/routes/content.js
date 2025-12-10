const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Analyze content quality
router.post('/analyze', async (req, res) => {
  try {
    const { content, mediaType = 'video' } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content description is required' });
    }

    const analysis = await aiService.analyzeContentQuality(content, mediaType);

    res.json({
      success: true,
      analysis,
      mediaType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content suggestions
router.post('/suggestions', async (req, res) => {
  try {
    const { niche, platform = 'youtube_shorts' } = req.body;

    if (!niche) {
      return res.status(400).json({ error: 'Content niche is required' });
    }

    const prompt = `Generate 5 viral content ideas for ${platform} in the ${niche} niche. 
    
For each idea provide:
- Title/hook
- Brief description
- Why it will perform well
- Estimated engagement level

Return as JSON array.`;

    const result = await aiService.generateCompletion(prompt, {
      systemPrompt: 'You are a viral content strategist.',
      temperature: 0.8
    });

    res.json({
      success: true,
      suggestions: result,
      niche,
      platform
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
