import os
import json
import sqlite3
import datetime
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
DB_PATH = os.path.join(os.path.dirname(__file__), "backend", "database.db")
JSON_DB_PATH = os.path.join(os.path.dirname(__file__), "backend", "data", "assessments.json")

# Ensure directories exist
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
os.makedirs(os.path.dirname(JSON_DB_PATH), exist_ok=True)

def init_db():
    """Initialize SQLite database table for storing assessments"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS assessments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                locality TEXT NOT NULL,
                overall_score INTEGER NOT NULL,
                status TEXT NOT NULL,
                waste_score INTEGER,
                water_score INTEGER,
                electricity_score INTEGER,
                traffic_score INTEGER,
                green_space_score INTEGER,
                public_transport_score INTEGER,
                ev_infrastructure_score INTEGER,
                recommendations_json TEXT,
                timestamp TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
    except Exception as e:
        print("Error initializing SQLite database:", e)

init_db()

def save_assessment_to_db(locality, overall_score, status, indicators, recommendations):
    """Save assessment record to SQLite database and JSON file"""
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    recs_json = json.dumps(recommendations)
    
    # 1. Save to SQLite database.db
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO assessments (
                locality, overall_score, status,
                waste_score, water_score, electricity_score, traffic_score,
                green_space_score, public_transport_score, ev_infrastructure_score,
                recommendations_json, timestamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            locality, overall_score, status,
            indicators.get("waste", 0),
            indicators.get("water", 0),
            indicators.get("electricity", 0),
            indicators.get("traffic", 0),
            indicators.get("greenSpace", 0),
            indicators.get("publicTransport", 0),
            indicators.get("evInfrastructure", 0),
            recs_json, timestamp
        ))
        conn.commit()
        conn.close()
    except Exception as e:
        print("Error saving to SQLite DB:", e)

    # 2. Save to JSON file storage
    try:
        records = []
        if os.path.exists(JSON_DB_PATH):
            with open(JSON_DB_PATH, "r") as f:
                try:
                    records = json.load(f)
                except Exception:
                    records = []
        
        records.append({
            "id": len(records) + 1,
            "locality": locality,
            "overallScore": overall_score,
            "status": status,
            "indicators": indicators,
            "recommendations": recommendations,
            "timestamp": timestamp
        })

        with open(JSON_DB_PATH, "w") as f:
            json.dump(records, f, indent=2)
    except Exception as e:
        print("Error saving to JSON file DB:", e)

def generate_fallback_recommendations(locality, overall_score, indicators, problem_areas):
    recommendations_map = {
        "waste": {
            "category": "Waste Management",
            "icon": "♻️",
            "title": "Integrated Waste Segregation & Circular Economy",
            "description": f"Implement mandatory 3-way source waste segregation, establish neighborhood composting units, and conduct e-waste drives in {locality}."
        },
        "water": {
            "category": "Water Conservation",
            "icon": "💧",
            "title": "Rainwater Harvesting & Smart Metering",
            "description": f"Mandate rooftop rainwater harvesting for apartment complexes and install digital water meters to detect pipe leakage across {locality}."
        },
        "electricity": {
            "category": "Electricity Efficiency",
            "icon": "⚡",
            "title": "Solar Energy Incentive & Smart LED Upgrade",
            "description": "Incentivize net-metered rooftop solar PV panels for commercial buildings and upgrade streetlights to automated LED fixtures."
        },
        "traffic": {
            "category": "Traffic Management",
            "icon": "🚗",
            "title": "Sustainable Mobility & Signal Synchronization",
            "description": "Implement adaptive traffic signal control systems, optimize heavy-vehicle access timings, and dedicate lanes for cycling and pedestrian safety."
        },
        "greenSpace": {
            "category": "Green Spaces",
            "icon": "🌳",
            "title": "Urban Forestry & Miyawaki Pocket Parks",
            "description": f"Transform vacant public patches into dense Miyawaki urban forests and expand vertical gardens across {locality}."
        },
        "publicTransport": {
            "category": "Public Transportation",
            "icon": "🚌",
            "title": "Electric Mini-Bus Route Expansion",
            "description": f"Introduce electric feeder mini-buses connecting metro stations to residential and IT hubs in {locality}."
        },
        "evInfrastructure": {
            "category": "EV Infrastructure",
            "icon": "🔋",
            "title": "Public Solar EV Charging Hubs",
            "description": "Deploy fast-charging EV hubs at public parking zones, commercial centers, and transit stations with standardized plug access."
        }
    }

    keys = list(indicators.keys()) if indicators else []
    selected_keys = [k for k in keys if indicators.get(k, 100) < 60]
    if not selected_keys:
        selected_keys = sorted(keys, key=lambda k: indicators.get(k, 100))[:2]

    recs = [
        recommendations_map.get(k, {
            "category": k,
            "icon": "🌱",
            "title": f"Targeted Improvement for {k}",
            "description": f"Enhance monitoring and infrastructure efficiency for {k} in {locality}."
        }) for k in selected_keys
    ]

    expected_benefits = [
        f"Measurable reduction in peak resource consumption across {locality}.",
        "Improved public health metrics and lower localized air pollution.",
        "Higher citizen satisfaction through reliable green infrastructure and smart services."
    ]

    return {
        "recommendations": recs,
        "expectedBenefits": expected_benefits,
        "isFallback": True,
        "message": "AI service is currently unavailable. Showing rule-based recommendations for demonstration."
    }

@app.route('/', methods=['GET'])
def index():
    return """
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
        <p>Generative AI-Based Sustainable City Planning System API & SQLite Database Service</p>
        <div class="status">✓ Server & SQLite Database Active</div>
        <div style="margin-top: 25px;">
          <p style="font-weight: bold; color: #17321F; margin-bottom: 8px; text-align: left;">Available Endpoints & Admin Views:</p>
          <div class="endpoint">GET /admin/database (Visual SQLite Database Records Viewer)</div>
          <div class="endpoint">GET /api/assessments (JSON Database Export API)</div>
          <div class="endpoint">POST /api/recommendations (Saves Assessment to DB & Generates AI Recs)</div>
          <div class="endpoint">GET /api/health</div>
        </div>
        <a href="/admin/database" class="btn-db">🗄️ View Live SQLite Database Table →</a>
      </div>
    </body>
    </html>
    """

@app.route('/admin/database', methods=['GET'])
def admin_database():
    """Visual HTML Database Admin Viewer to show teachers saved records"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessments ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()

    table_rows_html = ""
    for r in rows:
        table_rows_html += f"""
        <tr>
          <td>#{r['id']}</td>
          <td><strong>{r['locality']}</strong></td>
          <td><span class="score-badge">{r['overall_score']}/100</span></td>
          <td>{r['status']}</td>
          <td>♻️ {r['waste_score']}</td>
          <td>💧 {r['water_score']}</td>
          <td>⚡ {r['electricity_score']}</td>
          <td>🚗 {r['traffic_score']}</td>
          <td>🌳 {r['green_space_score']}</td>
          <td>🚌 {r['public_transport_score']}</td>
          <td>🔋 {r['ev_infrastructure_score']}</td>
          <td style="font-size: 11px;">{r['timestamp']}</td>
        </tr>
        """

    if not rows:
        table_rows_html = "<tr><td colspan='12' style='text-align:center; padding:30px; color:#66756B;'>No assessment records in database yet. Submit an assessment to see it stored here live!</td></tr>"

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Green City AI — SQLite Database Records</title>
      <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F7FAF7; color: #17321F; padding: 30px; }}
        .header {{ max-width: 1200px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; }}
        h1 {{ color: #14532D; margin: 0; font-size: 24px; }}
        .subtitle {{ color: #66756B; font-size: 13px; margin-top: 4px; }}
        .card-table {{ max-width: 1200px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 8px 30px rgba(20, 83, 45, 0.08); overflow: hidden; border: 1px solid rgba(20, 83, 45, 0.1); }}
        table {{ width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }}
        th {{ background: #14532D; color: white; padding: 14px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }}
        td {{ padding: 12px; border-bottom: 1px solid #f3f4f6; color: #17321F; }}
        tr:hover {{ background-color: #f9fdfa; }}
        .score-badge {{ background: #EAF6EC; color: #14532D; padding: 4px 10px; border-radius: 8px; font-weight: bold; border: 1px solid #a3d9b1; }}
        .badge-count {{ background: #14532D; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; }}
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>🗄️ Green City AI — SQLite Database Records</h1>
          <div class="subtitle">Live database table storing user locality assessments (database.db)</div>
        </div>
        <div class="badge-count">{len(rows)} Stored Assessments</div>
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
            {table_rows_html}
          </tbody>
        </table>
      </div>
    </body>
    </html>
    """

@app.route('/api/assessments', methods=['GET'])
def get_assessments():
    """JSON API endpoint returning all stored assessment database records"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessments ORDER BY id DESC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({"success": True, "count": len(rows), "data": rows})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "system": "Green City AI Python Flask Backend API",
        "database": "SQLite database.db Active"
    })

@app.route('/api/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json() or {}
    locality = data.get("locality", "Electronic City")
    overall_score = data.get("overallScore", 50)
    indicators = data.get("indicators", {})
    problem_areas = data.get("problemAreas", [])

    status_label = "Moderate Sustainability"
    if overall_score < 40: status_label = "Needs Major Improvement"
    elif overall_score < 60: status_label = "Needs Improvement"
    elif overall_score >= 80: status_label = "Good Sustainability"

    rec_result = None

    if GEMINI_API_KEY and "your_gemini_api_key_here" not in GEMINI_API_KEY and GEMINI_API_KEY.strip():
        try:
            prompt = f"""You are a sustainability planning assistant. Analyze the locality assessment:
Locality: {locality}
Overall Score: {overall_score}/100
Indicators: {indicators}
Problem Areas: {problem_areas}

Provide practical recommendations targeting low-scoring issues.
Return JSON format:
{{
  "recommendations": [
    {{"category": "Category", "icon": "emoji", "title": "Title", "description": "Action details."}}
  ],
  "expectedBenefits": ["Benefit 1", "Benefit 2"]
}}"""

            endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            res = requests.post(endpoint, json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.4, "responseMimeType": "application/json"}
            }, timeout=8)

            if res.status_code == 200:
                raw_text = res.json().get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                parsed = json.loads(raw_text)
                rec_result = {
                    "recommendations": parsed.get("recommendations", []),
                    "expectedBenefits": parsed.get("expectedBenefits", []),
                    "isFallback": False,
                    "message": "AI recommendations generated successfully by Gemini AI."
                }
        except Exception as e:
            print("Gemini API error:", e)

    if not rec_result:
        rec_result = generate_fallback_recommendations(locality, overall_score, indicators, problem_areas)

    save_assessment_to_db(locality, overall_score, status_label, indicators, rec_result.get("recommendations", []))

    return jsonify({
        "success": True,
        "locality": locality,
        "overallScore": overall_score,
        **rec_result
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"success": False, "error": "Message is required."}), 400

    reply = f"Green City AI Assistant recommends focusing on core urban indicators for {message}: upgrading waste segregation, installing rooftop rainwater harvesting, and deploying solar EV charging hubs."
    return jsonify({"success": True, "reply": reply})

if __name__ == '__main__':
    print("Green City AI Server running on http://localhost:5000 with SQLite Database active!")
    app.run(host='0.0.0.0', port=5000, debug=True)
