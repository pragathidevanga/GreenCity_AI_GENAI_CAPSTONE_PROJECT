import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

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
    """Root Welcome Page - Fixes 'Cannot GET /' Error"""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Green City AI — Python Flask Backend API</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #F7FAF7; color: #17321F; padding: 40px; text-align: center; }
        .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 8px 30px rgba(20, 83, 45, 0.08); max-width: 600px; margin: 0 auto; border: 1px solid rgba(20, 83, 45, 0.1); }
        h1 { color: #14532D; margin-bottom: 10px; }
        p { color: #66756B; line-height: 1.6; }
        .status { display: inline-block; padding: 6px 16px; background: #EAF6EC; color: #14532D; font-weight: bold; border-radius: 50px; font-size: 13px; margin-top: 15px; border: 1px solid #a3d9b1; }
        .endpoint { background: #f4f9f5; padding: 8px 12px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #14532D; margin: 5px 0; text-align: left; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌱 Green City AI Python Backend</h1>
        <p>Generative AI-Based Sustainable City Planning System API (Flask Service)</p>
        <div class="status">✓ Python Flask Server Running Healthy</div>
        <div style="margin-top: 25px;">
          <p style="font-weight: bold; color: #17321F; margin-bottom: 8px; text-align: left;">Available Endpoints:</p>
          <div class="endpoint">GET /api/health</div>
          <div class="endpoint">POST /api/recommendations</div>
          <div class="endpoint">POST /api/chat</div>
        </div>
      </div>
    </body>
    </html>
    """

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "system": "Green City AI Python Flask Backend API",
        "language": "Python 3.14 + Flask"
    })

@app.route('/api/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json() or {}
    locality = data.get("locality", "Electronic City")
    overall_score = data.get("overallScore", 50)
    indicators = data.get("indicators", {})
    problem_areas = data.get("problemAreas", [])

    if not GEMINI_API_KEY or "your_gemini_api_key_here" in GEMINI_API_KEY or not GEMINI_API_KEY.strip():
        fallback_res = generate_fallback_recommendations(locality, overall_score, indicators, problem_areas)
        return jsonify({
            "success": True,
            "locality": locality,
            "overallScore": overall_score,
            **fallback_res
        })

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
            return jsonify({
                "success": True,
                "locality": locality,
                "overallScore": overall_score,
                "recommendations": parsed.get("recommendations", []),
                "expectedBenefits": parsed.get("expectedBenefits", []),
                "isFallback": False,
                "message": "AI recommendations generated successfully by Gemini AI."
            })
    except Exception as e:
        print("Gemini API error:", e)

    fallback_res = generate_fallback_recommendations(locality, overall_score, indicators, problem_areas)
    return jsonify({
        "success": True,
        "locality": locality,
        "overallScore": overall_score,
        **fallback_res
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get("message", "").strip()

    if not message:
        return jsonify({"success": False, "error": "Message is required."}), 400

    reply = f"Green City AI Assistant recommends focusing on core urban indicators in {message}: upgrading waste segregation, installing rainwater harvesting, and expanding EV charging networks."
    return jsonify({"success": True, "reply": reply})

if __name__ == '__main__':
    print("🌱 Green City AI Python Flask Backend running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
