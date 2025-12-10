/**
 * Garnet AI Engine - API Testing Demo
 * Run this after starting the server to test all endpoints
 */

const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testCaptionGeneration() {
  console.log('\n🎬 Testing Caption Generation...');
  
  try {
    const response = await axios.post(`${API_BASE}/caption/generate`, {
      content: 'Amazing sunset timelapse over the ocean with dolphins jumping',
      platform: 'youtube_shorts',
      tone: 'inspirational'
    });
    
    console.log('✅ Caption:', response.data.caption);
    console.log('📊 Length:', response.data.length, 'characters');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testCaptionVariations() {
  console.log('\n🎨 Testing Caption Variations...');
  
  try {
    const response = await axios.post(`${API_BASE}/caption/variations`, {
      content: 'Quick cooking tutorial for 5-minute pasta',
      platform: 'instagram_reels',
      count: 3
    });
    
    response.data.variations.forEach((v, i) => {
      console.log(`\n${i + 1}. [${v.tone}] ${v.caption}`);
    });
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testHashtagGeneration() {
  console.log('\n#️⃣ Testing Hashtag Generation...');
  
  try {
    const response = await axios.post(`${API_BASE}/hashtags/generate`, {
      content: 'Fitness workout routine for beginners at home',
      platform: 'instagram',
      count: 10
    });
    
    console.log('✅ Hashtags:', response.data.hashtags.join(' '));
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testPostingTimes() {
  console.log('\n⏰ Testing Best Posting Times...');
  
  try {
    const response = await axios.post(`${API_BASE}/hashtags/posting-times`, {
      platform: 'youtube_shorts',
      timezone: 'Asia/Calcutta'
    });
    
    console.log('✅ Best times:', JSON.stringify(response.data.suggestions, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testContentAnalysis() {
  console.log('\n📊 Testing Content Analysis...');
  
  try {
    const response = await axios.post(`${API_BASE}/content/analyze`, {
      content: 'Travel vlog exploring hidden gems in Bali with drone footage',
      mediaType: 'video'
    });
    
    console.log('✅ Analysis:', JSON.stringify(response.data.analysis, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testWatermarkDetection() {
  console.log('\n🔍 Testing Watermark Detection...');
  
  try {
    const response = await axios.post(`${API_BASE}/watermark/detect`, {
      mediaUrl: 'https://example.com/video.mp4',
      ownershipConfirmed: true
    });
    
    console.log('✅ Detection:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Garnet AI Engine - API Demo\n');
  console.log('Make sure the server is running on http://localhost:3000\n');
  
  await testCaptionGeneration();
  await testCaptionVariations();
  await testHashtagGeneration();
  await testPostingTimes();
  await testContentAnalysis();
  await testWatermarkDetection();
  
  console.log('\n✨ Demo complete!\n');
}

// Run all tests
runAllTests().catch(console.error);
