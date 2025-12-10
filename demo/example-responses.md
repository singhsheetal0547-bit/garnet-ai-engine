# Garnet AI Engine - Example API Responses

## Caption Generation

### Request
```json
POST /api/caption/generate
{
  "content": "Amazing sunset timelapse over the ocean with dolphins jumping",
  "platform": "youtube_shorts",
  "tone": "inspirational"
}
```

### Response
```json
{
  "success": true,
  "caption": "Watch nature's masterpiece unfold 🌅 When dolphins dance with the setting sun, magic happens ✨",
  "platform": "youtube_shorts",
  "tone": "inspirational",
  "length": 98
}
```

---

## Hashtag Generation

### Request
```json
POST /api/hashtags/generate
{
  "content": "Fitness workout routine for beginners at home",
  "platform": "instagram",
  "count": 10
}
```

### Response
```json
{
  "success": true,
  "hashtags": [
    "#homeworkout",
    "#fitnessmotivation",
    "#beginnerfitness",
    "#workoutathome",
    "#fitnesstips",
    "#healthylifestyle",
    "#exerciseroutine",
    "#fitnessjourney",
    "#homegym",
    "#workoutforbeginners"
  ],
  "platform": "instagram",
  "count": 10
}
```

---

## Caption Variations

### Request
```json
POST /api/caption/variations
{
  "content": "Quick cooking tutorial for 5-minute pasta",
  "platform": "instagram_reels",
  "count": 3
}
```

### Response
```json
{
  "success": true,
  "variations": [
    {
      "caption": "Pasta in 5 minutes? YES! 🍝 Your weeknight dinner just got easier. Save this for later!",
      "tone": "casual"
    },
    {
      "caption": "Efficient cooking meets delicious results. Master this 5-minute pasta technique today.",
      "tone": "professional"
    },
    {
      "caption": "Who needs takeout when you can make pasta faster than delivery? 😂🍝 Game changer!",
      "tone": "humorous"
    }
  ],
  "platform": "instagram_reels"
}
```

---

## Best Posting Times

### Request
```json
POST /api/hashtags/posting-times
{
  "platform": "youtube_shorts",
  "timezone": "Asia/Calcutta"
}
```

### Response
```json
{
  "success": true,
  "suggestions": [
    {
      "time": "18:00",
      "day": "Friday",
      "reason": "Peak engagement time when users are winding down from work"
    },
    {
      "time": "12:00",
      "day": "Sunday",
      "reason": "Weekend leisure browsing peak"
    },
    {
      "time": "20:00",
      "day": "Wednesday",
      "reason": "Mid-week evening relaxation period"
    }
  ],
  "platform": "youtube_shorts",
  "timezone": "Asia/Calcutta"
}
```

---

## Content Analysis

### Request
```json
POST /api/content/analyze
{
  "content": "Travel vlog exploring hidden gems in Bali with drone footage",
  "mediaType": "video"
}
```

### Response
```json
{
  "success": true,
  "analysis": {
    "score": 8,
    "strengths": [
      "Unique angle focusing on hidden gems rather than tourist spots",
      "Drone footage adds production value",
      "Bali is a trending travel destination"
    ],
    "improvements": [
      "Add local culture insights for deeper engagement",
      "Include budget breakdown for practical value",
      "Create a series to build anticipation"
    ],
    "engagement": "high"
  },
  "mediaType": "video"
}
```

---

## Watermark Detection

### Request
```json
POST /api/watermark/detect
{
  "mediaUrl": "https://example.com/video.mp4",
  "ownershipConfirmed": true
}
```

### Response
```json
{
  "success": true,
  "detected": false,
  "message": "Watermark detection requires ML model integration",
  "ownershipConfirmed": true,
  "provenanceLog": {
    "timestamp": "2025-12-10T05:12:00.000Z",
    "action": "watermark_detection",
    "confirmed": true
  }
}
```
