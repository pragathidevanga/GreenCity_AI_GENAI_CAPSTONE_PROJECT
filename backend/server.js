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

// Root welcome endpoint (Fixes "Cannot GET /" error)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Green City AI — Backend API Server</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F7FAF7; color: #17321F; padding: 40px; text-align: center; }
        .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 8px 30px rgba(20, 83, 45, 0.08); max-width: 600px; margin: 0 auto; border: 1px solid rgba(20, 83, 45, 0.1); }
        h1 { color: #14532D; margin-bottom: 10px; }
        p { color: #66756B; line-height: 1.6; }
        .status { display: inline-block; padding: 6px 16px; background: #EAF6EC; color: #14532D; font-weight: bold; border-radius: 50px; font-size: 13px; margin-top: 15px; border: 1px solid #a3d9b1; }
        .endpoint { background: #f4f9f5; padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #14532D; margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌱 Green City AI Server</h1>
        <p>Generative AI-Based Sustainable City Planning System API</p>
        <div class="status">✓ Backend Server Running Healthy</div>
        <div style="margin-top: 25px; text-align: left;">
          <p style="font-weight: bold; color: #17321F; margin-bottom: 8px;">Active API Endpoints:</p>
          <div class="endpoint">GET /api/health</div>
          <div class="endpoint">POST /api/recommendations</div>
          <div class="endpoint">POST /api/chat</div>
        </div>
      </div>
    </body>
    </html>
  `);
});

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
