require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const captionRoutes = require('./routes/caption');
const hashtagRoutes = require('./routes/hashtag');
const watermarkRoutes = require('./routes/watermark');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/caption', captionRoutes);
app.use('/api/hashtags', hashtagRoutes);
app.use('/api/watermark', watermarkRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Garnet AI Engine running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
