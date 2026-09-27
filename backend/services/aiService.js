import dotenv from 'dotenv';
dotenv.config();

/**
 * Rule-based fallback generator for recommendations based on indicator scores.
 */
function generateFallbackRecommendations(locality, overallScore, indicators, problemAreas) {
  const recommendationsMap = {
    waste: {
      category: 'Waste Management',
      icon: '♻️',
      title: 'Integrated Waste Recycling & Circular Economy',
      description: 'Implement mandatory source segregation of wet and dry waste, set up neighborhood composting facilities, and initiate e-waste recycling drives across ' + locality + '.'
    },
    water: {
      category: 'Water Conservation',
      icon: '💧',
      title: 'Rainwater Harvesting & Smart Metering',
      description: 'Promote rooftop rainwater harvesting structures for residential complexes and install smart digital water meters to reduce distribution leakage in ' + locality + '.'
    },
    electricity: {
      category: 'Electricity Efficiency',
      icon: '⚡',
      title: 'Solar Energy Adoption & LED Grid Upgrade',
      description: 'Encourage rooftop solar PV installation incentives for commercial hubs and upgrade all street lighting to automated energy-efficient LEDs.'
    },
    traffic: {
      category: 'Traffic Management',
      icon: '🚗',
      title: 'Sustainable Mobility & Smart Signal Synchronization',
      description: 'Implement adaptive traffic signal control system, optimize heavy-vehicle access timings, and dedicate lanes for cycling and pedestrian safety.'
    },
    greenSpace: {
      category: 'Green Spaces',
      icon: '🌳',
      title: 'Urban Forestry & Pocket Park Expansion',
      description: 'Transform unused municipal patches into bio-dense Miyawaki urban forests, expand vertical gardening on civic structures, and improve green canopy coverage.'
    },
    publicTransport: {
      category: 'Public Transportation',
      icon: '🚌',
      title: 'Feeder Transit & Electric Bus Network Expansion',
      description: 'Introduce last-mile electric mini-bus routes connecting Metro/bus hubs to major residential and IT corridors in ' + locality + '.'
    },
    evInfrastructure: {
      category: 'EV Infrastructure',
      icon: '🔋',
      title: 'Public Solar EV Charging Hubs',
      description: 'Deploy fast-charging EV stations at commercial parking zones, public parks, and fuel stations with standardized multi-plug compatibility.'
    }
  };

  // Identify problem indicators or pick lowest scoring ones
  const keys = Object.keys(indicators || {});
  let selectedKeys = keys.filter(k => (indicators[k] ?? 100) < 60);

  if (selectedKeys.length === 0) {
    // If all scores >= 60, pick lowest 2 for general enhancements
    selectedKeys = keys.sort((a, b) => indicators[a] - indicators[b]).slice(0, 2);
  }

  const recommendations = selectedKeys.map(key => recommendationsMap[key] || {
    category: key,
    icon: '🌱',
    title: `Targeted Improvement for ${key}`,
    description: `Enhance local monitoring and infrastructure efficiency for ${key} in ${locality}.`
  });

  const expectedBenefits = [
    `Measurable reduction in peak resource consumption across ${locality}.`,
    'Improved public health outcomes and reduced local pollution metrics.',
    'Higher citizen satisfaction through reliable green infrastructure and smart services.'
  ];

  return {
    recommendations,
    expectedBenefits,
    isFallback: true,
    message: 'AI service is currently unavailable. Showing rule-based recommendations for demonstration.'
  };
}

/**
 * Service to generate AI recommendations using Gemini API with automatic fallback.
 */
export async function generateAIRecommendations({ locality, overallScore, indicators, problemAreas }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.includes('your_gemini_api_key_here') || apiKey.trim() === '') {
    return generateFallbackRecommendations(locality, overallScore, indicators, problemAreas);
  }

  try {
    const prompt = `You are a professional sustainability planning assistant for smart city initiatives.
Analyze the following locality sustainability assessment:

Locality Name: ${locality}
Overall Sustainability Score: ${overallScore}/100
Indicator Scores:
- Waste Management: ${indicators?.waste ?? 'N/A'}/100
- Water Conservation: ${indicators?.water ?? 'N/A'}/100
- Electricity Efficiency: ${indicators?.electricity ?? 'N/A'}/100
- Traffic Management: ${indicators?.traffic ?? 'N/A'}/100
- Green Spaces: ${indicators?.greenSpace ?? 'N/A'}/100
- Public Transportation: ${indicators?.publicTransport ?? 'N/A'}/100
- EV Infrastructure: ${indicators?.evInfrastructure ?? 'N/A'}/100

Identified Areas Requiring Attention: ${problemAreas?.join(', ') || 'None (All above threshold)'}

Provide practical, clear, and actionable sustainability recommendations targeted specifically at the low-scoring issues.
Do NOT invent fake statistics or claim government authority.
Return ONLY valid JSON matching this exact structure:
{
  "recommendations": [
    {
      "category": "Category Name",
      "icon": "relevant emoji icon (e.g. ♻️, 💧, ⚡, 🚗, 🌳, 🚌, 🔋)",
      "title": "Action Title",
      "description": "2-3 concise sentences detailing practical steps."
    }
  ],
  "expectedBenefits": [
    "Benefit statement 1",
    "Benefit statement 2",
    "Benefit statement 3"
  ]
}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API HTTP Error:', response.statusText);
      return generateFallbackRecommendations(locality, overallScore, indicators, problemAreas);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return generateFallbackRecommendations(locality, overallScore, indicators, problemAreas);
    }

    const parsed = JSON.parse(rawText);
    return {
      recommendations: parsed.recommendations || [],
      expectedBenefits: parsed.expectedBenefits || [],
      isFallback: false,
      message: 'AI recommendations generated successfully by Gemini.'
    };
  } catch (error) {
    console.error('AI generation error:', error.message);
    return generateFallbackRecommendations(locality, overallScore, indicators, problemAreas);
  }
}

/**
 * Service for AI Assistant Chat queries.
 */
export async function generateChatReply(userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback responses for common sustainability queries
  const fallbackAnswers = [
    {
      keywords: ['water', 'save', 'conserve', 'rain'],
      reply: 'To conserve water in urban localities: 1) Install rainwater harvesting systems on residential rooftops, 2) Use low-flow aerators on taps and showers, 3) Recycle greywater for garden irrigation, and 4) Fix municipal pipeline leaks promptly using acoustic leak detection.'
    },
    {
      keywords: ['waste', 'recycle', 'garbage', 'trash', 'compost'],
      reply: 'Effective urban waste management involves: 1) Strict 2-way or 3-way waste segregation at source (organic, dry, hazardous), 2) Decentralized community composting units, 3) E-waste collection drives, and 4) Converting non-recyclable waste into energy or RDF pellets.'
    },
    {
      keywords: ['traffic', 'transport', 'bus', 'congestion', 'carpooling'],
      reply: 'To reduce traffic congestion and vehicular pollution: 1) Expand clean electric bus fleets and dedicated bus rapid transit (BRT) lanes, 2) Build safe, shaded walking and cycling infrastructure, 3) Implement adaptive smart traffic lights, and 4) Encourage carpooling and transit-oriented urban development.'
    },
    {
      keywords: ['ev', 'electric', 'charger', 'battery'],
      reply: 'To accelerate EV adoption: 1) Deploy fast-charging EV hubs in commercial parking lots and public parks, 2) Offer rooftop solar net-metering for EV owners, 3) Standardize charging connectors, and 4) Provide green vehicle parking privileges in civic spaces.'
    },
    {
      keywords: ['electricity', 'energy', 'solar', 'power'],
      reply: 'For urban electricity efficiency: 1) Transition all streetlights and public illumination to automated LEDs, 2) Mandate green building codes with high solar reflective index (SRI) roofs, 3) Promote rooftop solar PV installations, and 4) Conduct thermal insulation audits for commercial hubs.'
    }
  ];

  if (apiKey && !apiKey.includes('your_gemini_api_key_here') && apiKey.trim() !== '') {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are Green City AI Assistant, an expert in urban planning, climate resilience, and smart city sustainability.
Keep your answer clear, encouraging, structured with bullet points or numbers, and concise (under 120 words).
User question: "${userMessage}"`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5 }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return replyText;
        }
      }
    } catch (e) {
      console.warn('Gemini chat error, using rule-based fallback:', e.message);
    }
  }

  // Find matching fallback or return standard response
  const lower = userMessage.toLowerCase();
  for (const item of fallbackAnswers) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.reply;
    }
  }

  return `Green City AI recommends focusing on core urban indicators: upgrading waste segregation, installing rooftop rainwater harvesting, transitioning streetlights to LEDs, expanding EV charging infrastructure, and increasing urban tree cover. How can I assist you with a specific sector?`;
}
