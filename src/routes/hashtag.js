const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Generate hashtags
router.post('/generate', async (req, res) => {
  try {
    const { content, platform = 'instagram', count = 10 } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const hashtags = await aiService.generateHashtags(content, platform, count);

    res.json({
      success: true,
      hashtags,
      platform,
      count: hashtags.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Suggest best posting times
router.post('/posting-times', async (req, res) => {
  try {
    const { platform = 'instagram', timezone = 'UTC' } = req.body;

    const suggestions = await aiService.suggestBestPostingTime(platform, timezone);

    res.json({
      success: true,
      suggestions,
      platform,
      timezone
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
