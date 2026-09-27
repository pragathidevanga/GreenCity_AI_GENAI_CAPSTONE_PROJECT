import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recommendationRoutes from './routes/recommendationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', recommendationRoutes);
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'Green City AI Backend API',
    timestamp: new Date().toISOString()
  });
});

// Standalone listener for local dev
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌱 Green City AI Server running on http://localhost:${PORT}`);
  });
}

export default app;
