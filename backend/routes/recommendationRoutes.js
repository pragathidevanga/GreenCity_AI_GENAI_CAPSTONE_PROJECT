import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAIRecommendations } from '../services/aiService.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, '..', 'data', 'assessments.json');

// Helper to save assessment record to JSON database
function saveToDatabase(locality, overallScore, indicators, problemAreas, recommendations) {
  try {
    const dir = path.dirname(jsonDbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let records = [];
    if (fs.existsSync(jsonDbPath)) {
      const fileContent = fs.readFileSync(jsonDbPath, 'utf8');
      try {
        records = JSON.parse(fileContent);
      } catch (e) {
        records = [];
      }
    }

    let status = 'Moderate Sustainability';
    if (overallScore < 40) status = 'Needs Major Improvement';
    else if (overallScore < 60) status = 'Needs Improvement';
    else if (overallScore >= 80) status = 'Good Sustainability';

    const newRecord = {
      id: records.length + 1,
      locality,
      overallScore: overallScore || 50,
      status,
      indicators: indicators || {},
      problemAreas: problemAreas || [],
      recommendations: recommendations || [],
      timestamp: new Date().toLocaleString()
    };

    records.push(newRecord);
    fs.writeFileSync(jsonDbPath, JSON.stringify(records, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving to database:', err.message);
  }
}

// POST /api/recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { locality, overallScore, indicators, problemAreas } = req.body;

    if (!locality) {
      return res.status(400).json({
        success: false,
        error: 'Locality name is required.'
      });
    }

    const result = await generateAIRecommendations({
      locality,
      overallScore: overallScore || 50,
      indicators: indicators || {},
      problemAreas: problemAreas || []
    });

    // Save to database
    saveToDatabase(locality, overallScore, indicators, problemAreas, result.recommendations);

    return res.json({
      success: true,
      locality,
      overallScore,
      ...result
    });
  } catch (error) {
    console.error('Error handling recommendation request:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process recommendation request.',
      isFallback: true,
      message: 'We couldn\'t generate AI recommendations right now. Please try again.'
    });
  }
});

// GET /api/assessments (Returns all stored assessment database records)
router.get('/assessments', (req, res) => {
  try {
    if (!fs.existsSync(jsonDbPath)) {
      return res.json({ success: true, count: 0, data: [] });
    }
    const data = JSON.parse(fs.readFileSync(jsonDbPath, 'utf8'));
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch database records.' });
  }
});

export default router;
