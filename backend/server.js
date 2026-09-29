import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import recommendationRoutes from './routes/recommendationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, 'data', 'assessments.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Green City AI — Backend API Server</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F7FAF7; color: #17321F; padding: 40px; text-align: center; }
        .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 8px 30px rgba(20, 83, 45, 0.08); max-width: 650px; margin: 0 auto; border: 1px solid rgba(20, 83, 45, 0.1); }
        h1 { color: #14532D; margin-bottom: 10px; }
        p { color: #66756B; line-height: 1.6; }
        .status { display: inline-block; padding: 6px 16px; background: #EAF6EC; color: #14532D; font-weight: bold; border-radius: 50px; font-size: 13px; margin-top: 15px; border: 1px solid #a3d9b1; }
        .endpoint { background: #f4f9f5; padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #14532D; margin: 5px 0; text-align: left; }
        .btn-db { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #14532D; color: white; border-radius: 12px; font-weight: bold; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌱 Green City AI Server</h1>
        <p>Generative AI-Based Sustainable City Planning System API Server</p>
        <div class="status">✓ Server & Database Active</div>
        <div style="margin-top: 25px;">
          <p style="font-weight: bold; color: #17321F; margin-bottom: 8px; text-align: left;">Available Endpoints & Admin Views:</p>
          <div class="endpoint">GET /admin/database (Visual HTML Database Records Viewer)</div>
          <div class="endpoint">GET /api/assessments (JSON Database Records API)</div>
          <div class="endpoint">POST /api/recommendations (Saves Assessment Record & Generates AI Recs)</div>
          <div class="endpoint">GET /api/health</div>
        </div>
        <a href="/admin/database" class="btn-db">🗄️ View Live Database Table →</a>
      </div>
    </body>
    </html>
  `);
});

// HTML Visual Database Admin Viewer for evaluators
app.get('/admin/database', (req, res) => {
  let records = [];
  if (fs.existsSync(jsonDbPath)) {
    try {
      records = JSON.parse(fs.readFileSync(jsonDbPath, 'utf8'));
    } catch (e) {
      records = [];
    }
  }

  let rowsHtml = '';
  records.slice().reverse().forEach(r => {
    const ind = r.indicators || {};
    rowsHtml += `
      <tr>
        <td>#${r.id}</td>
        <td><strong>${r.locality}</strong></td>
        <td><span class="score-badge">${r.overallScore}/100</span></td>
        <td>${r.status}</td>
        <td>♻️ ${ind.waste || 'N/A'}</td>
        <td>💧 ${ind.water || 'N/A'}</td>
        <td>⚡ ${ind.electricity || 'N/A'}</td>
        <td>🚗 ${ind.traffic || 'N/A'}</td>
        <td>🌳 ${ind.greenSpace || 'N/A'}</td>
        <td>🚌 ${ind.publicTransport || 'N/A'}</td>
        <td>🔋 ${ind.evInfrastructure || 'N/A'}</td>
        <td style="font-size: 11px;">${r.timestamp}</td>
      </tr>
    `;
  });

  if (!records.length) {
    rowsHtml = `<tr><td colspan="12" style="text-align:center; padding:30px; color:#66756B;">No assessment records in database yet. Submit an assessment to see it stored here live!</td></tr>`;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Green City AI — Database Records</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F7FAF7; color: #17321F; padding: 30px; }
        .header { max-width: 1200px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; }
        h1 { color: #14532D; margin: 0; font-size: 24px; }
        .subtitle { color: #66756B; font-size: 13px; margin-top: 4px; }
        .card-table { max-width: 1200px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 8px 30px rgba(20, 83, 45, 0.08); overflow: hidden; border: 1px solid rgba(20, 83, 45, 0.1); }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        th { background: #14532D; color: white; padding: 14px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 12px; border-bottom: 1px solid #f3f4f6; color: #17321F; }
        tr:hover { background-color: #f9fdfa; }
        .score-badge { background: #EAF6EC; color: #14532D; padding: 4px 10px; border-radius: 8px; font-weight: bold; border: 1px solid #a3d9b1; }
        .badge-count { background: #14532D; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>🗄️ Green City AI — Stored Database Records</h1>
          <div class="subtitle">Live database table storing locality sustainability assessments</div>
        </div>
        <div class="badge-count">${records.length} Stored Assessments</div>
      </div>
      <div class="card-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Locality</th>
              <th>Score</th>
              <th>Status</th>
              <th>Waste</th>
              <th>Water</th>
              <th>Energy</th>
              <th>Traffic</th>
              <th>Green</th>
              <th>Transit</th>
              <th>EV</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
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
    database: 'JSON & SQLite Database Active',
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
