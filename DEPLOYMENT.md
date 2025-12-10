# Garnet AI Engine - Deployment Guide

## Quick Deploy to Railway

### 1. Prerequisites
- Railway account
- OpenRouter API key
- GitHub repository (already created)

### 2. Deploy Steps

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OPENROUTER_API_KEY=your_key_here
railway variables set NODE_ENV=production
railway variables set PORT=3000

# Deploy
railway up
```

### 3. Environment Variables Required

```
OPENROUTER_API_KEY=sk-or-v1-xxxxx
NODE_ENV=production
PORT=3000
REDIS_HOST=redis.railway.internal (if using Railway Redis)
REDIS_PORT=6379
```

### 4. Add Redis (Optional but Recommended)

```bash
# Add Redis service
railway add redis

# Redis will auto-configure connection
```

---

## Alternative: Deploy to Render

### 1. Create New Web Service
- Connect GitHub repo: `singhsheetal0547-bit/garnet-ai-engine`
- Build Command: `npm install`
- Start Command: `npm start`

### 2. Environment Variables
Add in Render dashboard:
- `OPENROUTER_API_KEY`
- `NODE_ENV=production`

---

## Alternative: Deploy to Vercel (Serverless)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add OPENROUTER_API_KEY
```

---

## Local Development

### 1. Clone Repository
```bash
git clone https://github.com/singhsheetal0547-bit/garnet-ai-engine.git
cd garnet-ai-engine
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Test API
```bash
node demo/test-api.js
```

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Add OpenRouter API key
- [ ] Configure Redis for caching
- [ ] Set up rate limiting
- [ ] Enable CORS for your frontend domain
- [ ] Add monitoring (Sentry, LogRocket)
- [ ] Set up CI/CD pipeline
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Add API authentication

---

## Scaling Considerations

### For High Traffic:
1. **Add Redis caching** - Cache AI responses for common queries
2. **Implement rate limiting** - Prevent API abuse
3. **Use CDN** - For static assets
4. **Load balancing** - Multiple instances
5. **Queue system** - For heavy processing (BullMQ + Redis)

### Cost Optimization:
1. **Cache aggressively** - Reduce AI API calls
2. **Batch requests** - Process multiple items together
3. **Use cheaper models** - For simple tasks
4. **Implement tiered pricing** - Free tier with limits

---

## Monitoring

### Recommended Tools:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - Performance monitoring
- **Uptime Robot** - Uptime monitoring

### Key Metrics to Track:
- API response times
- AI model latency
- Error rates
- Request volume
- Cache hit rates
- Cost per request
