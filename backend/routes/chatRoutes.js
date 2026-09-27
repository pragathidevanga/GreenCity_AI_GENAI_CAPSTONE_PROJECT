import express from 'express';
import { generateChatReply } from '../services/aiService.js';

const router = express.Router();

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message content is required.'
      });
    }

    const reply = await generateChatReply(message);

    return res.json({
      success: true,
      reply
    });
  } catch (error) {
    console.error('Error handling chat request:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process chat query.',
      reply: 'Green City AI Assistant encountered a temporary connection issue. Please try asking again.'
    });
  }
});

export default router;
