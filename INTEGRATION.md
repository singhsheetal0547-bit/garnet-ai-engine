# Integrating Garnet AI Engine with Your App

## React Native Integration

### 1. Install Axios
```bash
npm install axios
```

### 2. Create API Service

```javascript
// services/garnetAI.js
import axios from 'axios';

const API_BASE = 'https://your-deployment-url.com/api';

class GarnetAI {
  async generateCaption(content, platform = 'youtube_shorts', tone = 'casual') {
    try {
      const response = await axios.post(`${API_BASE}/caption/generate`, {
        content,
        platform,
        tone
      });
      return response.data;
    } catch (error) {
      console.error('Caption generation failed:', error);
      throw error;
    }
  }

  async generateHashtags(content, platform = 'instagram', count = 10) {
    try {
      const response = await axios.post(`${API_BASE}/hashtags/generate`, {
        content,
        platform,
        count
      });
      return response.data;
    } catch (error) {
      console.error('Hashtag generation failed:', error);
      throw error;
    }
  }

  async getCaptionVariations(content, platform, count = 3) {
    try {
      const response = await axios.post(`${API_BASE}/caption/variations`, {
        content,
        platform,
        count
      });
      return response.data;
    } catch (error) {
      console.error('Caption variations failed:', error);
      throw error;
    }
  }

  async getBestPostingTimes(platform, timezone = 'UTC') {
    try {
      const response = await axios.post(`${API_BASE}/hashtags/posting-times`, {
        platform,
        timezone
      });
      return response.data;
    } catch (error) {
      console.error('Posting times failed:', error);
      throw error;
    }
  }

  async analyzeContent(content, mediaType = 'video') {
    try {
      const response = await axios.post(`${API_BASE}/content/analyze`, {
        content,
        mediaType
      });
      return response.data;
    } catch (error) {
      console.error('Content analysis failed:', error);
      throw error;
    }
  }
}

export default new GarnetAI();
```

### 3. Use in Components

```javascript
// screens/EditorScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import garnetAI from '../services/garnetAI';

export default function EditorScreen() {
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateCaption = async () => {
    setLoading(true);
    try {
      const result = await garnetAI.generateCaption(
        content,
        'youtube_shorts',
        'casual'
      );
      setCaption(result.caption);
    } catch (error) {
      alert('Failed to generate caption');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateHashtags = async () => {
    setLoading(true);
    try {
      const result = await garnetAI.generateHashtags(content, 'instagram', 10);
      setHashtags(result.hashtags);
    } catch (error) {
      alert('Failed to generate hashtags');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Describe your content:</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="e.g., Amazing sunset timelapse..."
        multiline
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      <Button title="Generate Caption" onPress={handleGenerateCaption} />
      <Button title="Generate Hashtags" onPress={handleGenerateHashtags} />

      {loading && <ActivityIndicator />}

      {caption && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Caption:</Text>
          <Text>{caption}</Text>
        </View>
      )}

      {hashtags.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Hashtags:</Text>
          <Text>{hashtags.join(' ')}</Text>
        </View>
      )}
    </View>
  );
}
```

---

## Web Integration (React)

### 1. Create Hook

```javascript
// hooks/useGarnetAI.js
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://your-deployment-url.com/api';

export function useGarnetAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCaption = async (content, platform, tone) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/caption/generate`, {
        content,
        platform,
        tone
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateHashtags = async (content, platform, count) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/hashtags/generate`, {
        content,
        platform,
        count
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateCaption,
    generateHashtags,
    loading,
    error
  };
}
```

### 2. Use in Component

```javascript
// components/AIAssistant.jsx
import React, { useState } from 'react';
import { useGarnetAI } from '../hooks/useGarnetAI';

export default function AIAssistant({ content }) {
  const { generateCaption, generateHashtags, loading } = useGarnetAI();
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const handleGenerate = async () => {
    const [captionResult, hashtagResult] = await Promise.all([
      generateCaption(content, 'youtube_shorts', 'casual'),
      generateHashtags(content, 'instagram', 10)
    ]);

    setCaption(captionResult.caption);
    setHashtags(hashtagResult.hashtags);
  };

  return (
    <div className="ai-assistant">
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate AI Content'}
      </button>

      {caption && (
        <div className="caption">
          <h3>Caption</h3>
          <p>{caption}</p>
        </div>
      )}

      {hashtags.length > 0 && (
        <div className="hashtags">
          <h3>Hashtags</h3>
          <p>{hashtags.join(' ')}</p>
        </div>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Error Handling
```javascript
try {
  const result = await garnetAI.generateCaption(content);
  // Success
} catch (error) {
  if (error.response?.status === 429) {
    // Rate limit exceeded
    alert('Too many requests. Please wait.');
  } else if (error.response?.status === 400) {
    // Bad request
    alert('Invalid input. Please check your content.');
  } else {
    // Generic error
    alert('Something went wrong. Please try again.');
  }
}
```

### 2. Caching
```javascript
// Cache results to avoid duplicate API calls
const cache = new Map();

async function getCachedCaption(content, platform, tone) {
  const key = `${content}-${platform}-${tone}`;
  
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const result = await garnetAI.generateCaption(content, platform, tone);
  cache.set(key, result);
  
  return result;
}
```

### 3. Debouncing
```javascript
import { debounce } from 'lodash';

const debouncedGenerate = debounce(async (content) => {
  const result = await garnetAI.generateCaption(content);
  setCaption(result.caption);
}, 500);
```

---

## Testing

```javascript
// __tests__/garnetAI.test.js
import garnetAI from '../services/garnetAI';

describe('Garnet AI Service', () => {
  it('should generate caption', async () => {
    const result = await garnetAI.generateCaption(
      'Test content',
      'youtube_shorts',
      'casual'
    );
    
    expect(result.success).toBe(true);
    expect(result.caption).toBeDefined();
    expect(result.caption.length).toBeLessThanOrEqual(100);
  });

  it('should generate hashtags', async () => {
    const result = await garnetAI.generateHashtags('Test content', 'instagram', 5);
    
    expect(result.success).toBe(true);
    expect(result.hashtags).toHaveLength(5);
    expect(result.hashtags[0]).toMatch(/^#/);
  });
});
```
