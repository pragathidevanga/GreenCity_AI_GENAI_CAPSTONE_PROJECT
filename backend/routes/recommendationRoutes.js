import express from 'express';
import { generateAIRecommendations } from '../services/aiService.js';

const router = express.Router();

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

export default router;
