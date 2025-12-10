# Garnet AI Engine

AI-powered content creation engine for the Garnet app - intelligent caption generation, hashtag optimization, watermark detection, and content suggestions.

## Features

### 1. Caption Generator
- Analyzes video/image content
- Generates engaging, platform-optimized captions
- Supports YouTube Shorts, Instagram Reels, TikTok formats
- Multiple tone options (casual, professional, humorous, inspirational)

### 2. Hashtag Optimizer
- Trending hashtag suggestions
- Platform-specific recommendations
- Engagement prediction
- Niche-specific tags

### 3. Watermark Detection
- Identifies watermarks in images/videos
- Safe removal workflow with ownership verification
- Provenance tracking

### 4. Content Suggestions
- Best posting times
- Content improvement tips
- Engagement optimization
- A/B testing recommendations

## Quick Start

```bash
npm install
npm run dev
```

## API Endpoints

### Generate Caption
```
POST /api/caption/generate
{
  "mediaUrl": "https://...",
  "platform": "youtube_shorts",
  "tone": "casual",
  "maxLength": 150
}
```

### Generate Hashtags
```
POST /api/hashtags/generate
{
  "content": "Amazing sunset timelapse",
  "platform": "instagram",
  "count": 10
}
```

### Detect Watermark
```
POST /api/watermark/detect
{
  "mediaUrl": "https://...",
  "ownershipConfirmed": true
}
```

## Tech Stack

- Node.js + Express
- OpenRouter AI (multiple models)
- FFmpeg for video processing
- Sharp for image processing
- Redis for caching

## License

MIT
