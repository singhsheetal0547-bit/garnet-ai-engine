const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    this.defaultModel = process.env.DEFAULT_CAPTION_MODEL || 'mistralai/mistral-large-2512';
  }

  async generateCompletion(prompt, options = {}) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: options.model || this.defaultModel,
          messages: [
            {
              role: 'system',
              content: options.systemPrompt || 'You are a helpful AI assistant specialized in social media content creation.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://garnet.app',
            'X-Title': 'Garnet AI Engine'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error.response?.data || error.message);
      throw new Error('Failed to generate AI completion');
    }
  }

  async generateCaption(content, platform = 'youtube_shorts', tone = 'casual') {
    const platformLimits = {
      youtube_shorts: 100,
      instagram_reels: 125,
      tiktok: 150
    };

    const maxLength = platformLimits[platform] || 150;

    const prompt = `Generate an engaging ${tone} caption for ${platform} based on this content: "${content}". 
    
Requirements:
- Maximum ${maxLength} characters
- ${tone} tone
- Platform: ${platform}
- Include a hook in the first 5 words
- Make it scroll-stopping
- No hashtags (those come separately)

Return ONLY the caption text, nothing else.`;

    return await this.generateCompletion(prompt, {
      systemPrompt: 'You are an expert social media content creator who writes viral captions.',
      temperature: 0.8
    });
  }

  async generateHashtags(content, platform = 'instagram', count = 10) {
    const prompt = `Generate ${count} highly relevant and trending hashtags for ${platform} based on this content: "${content}".

Requirements:
- Mix of popular and niche hashtags
- Platform: ${platform}
- Include engagement-driving tags
- No banned or spam hashtags
- Return as comma-separated list

Return ONLY the hashtags with # prefix, comma-separated.`;

    const result = await this.generateCompletion(prompt, {
      systemPrompt: 'You are a social media growth expert specializing in hashtag strategy.',
      temperature: 0.6
    });

    return result.split(',').map(tag => tag.trim());
  }

  async suggestBestPostingTime(platform, timezone = 'UTC') {
    const prompt = `What are the top 3 best times to post on ${platform} for maximum engagement? 
    
Consider:
- Platform: ${platform}
- Timezone: ${timezone}
- Current trends
- Audience behavior

Return as JSON array: [{"time": "HH:MM", "day": "Monday", "reason": "why"}]`;

    const result = await this.generateCompletion(prompt, {
      systemPrompt: 'You are a social media analytics expert.',
      temperature: 0.5,
      maxTokens: 300
    });

    try {
      return JSON.parse(result);
    } catch {
      return [];
    }
  }

  async analyzeContentQuality(content, mediaType = 'video') {
    const prompt = `Analyze this ${mediaType} content and provide improvement suggestions: "${content}"

Provide:
1. Quality score (1-10)
2. Strengths (3 points)
3. Improvements (3 actionable tips)
4. Engagement prediction (low/medium/high)

Return as JSON: {"score": 8, "strengths": [], "improvements": [], "engagement": "high"}`;

    const result = await this.generateCompletion(prompt, {
      systemPrompt: 'You are a content quality analyst.',
      temperature: 0.6
    });

    try {
      return JSON.parse(result);
    } catch {
      return { score: 0, strengths: [], improvements: [], engagement: 'unknown' };
    }
  }
}

module.exports = new AIService();
