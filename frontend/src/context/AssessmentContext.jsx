import React, { createContext, useState, useContext, useEffect } from 'react';

const AssessmentContext = createContext();

export const initialDemoData = {
  locality: 'Electronic City',
  indicators: {
    waste: 60,
    water: 70,
    electricity: 55,
    traffic: 40,
    greenSpace: 65,
    publicTransport: 75,
    evInfrastructure: 45
  }
};

export const indicatorMeta = [
  {
    key: 'waste',
    name: 'Waste Management',
    icon: '♻️',
    description: 'Understand waste segregation, recycling, and municipal waste management performance.'
  },
  {
    key: 'water',
    name: 'Water Conservation',
    icon: '💧',
    description: 'Assess water harvesting practices, pipeline efficiency, and local water management.'
  },
  {
    key: 'electricity',
    name: 'Electricity Efficiency',
    icon: '⚡',
    description: 'Review electricity grid efficiency, LED street lighting, and solar energy adoption.'
  },
  {
    key: 'traffic',
    name: 'Traffic Management',
    icon: '🚗',
    description: 'Understand traffic congestion, vehicular emissions, and signal synchronization.'
  },
  {
    key: 'greenSpace',
    name: 'Green Spaces',
    icon: '🌳',
    description: 'Review availability of parks, urban foliage, tree cover, and open green areas.'
  },
  {
    key: 'publicTransport',
    name: 'Public Transportation',
    icon: '🚌',
    description: 'Assess availability, frequency, and coverage of electric & public transit options.'
  },
  {
    key: 'evInfrastructure',
    name: 'EV Infrastructure',
    icon: '🔋',
    description: 'Review electric vehicle charging stations, solar charging hubs, and EV readiness.'
  }
];

export const AssessmentProvider = ({ children }) => {
  const [locality, setLocality] = useState(initialDemoData.locality);
  const [indicators, setIndicators] = useState(initialDemoData.indicators);
  const [hasAssessed, setHasAssessed] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [expectedBenefits, setExpectedBenefits] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStep, setAiStep] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  const indicatorValues = Object.values(indicators);
  const overallScore = Math.round(
    indicatorValues.reduce((sum, val) => sum + val, 0) / indicatorValues.length
  );

  const getScoreStatus = (score) => {
    if (score < 40) return { label: 'Needs Major Improvement', color: '#D95C5C' };
    if (score < 60) return { label: 'Needs Improvement', color: '#2E7D52' };
    if (score < 80) return { label: 'Moderate Sustainability', color: '#2E7D52' };
    return { label: 'Good Sustainability', color: '#14532D' };
  };

  const scoreStatus = getScoreStatus(overallScore);

  const problemAreas = indicatorMeta.filter(item => indicators[item.key] < 60);
  const performingAreas = indicatorMeta.filter(item => indicators[item.key] >= 60);

  const handleIndicatorChange = (key, value) => {
    setIndicators(prev => ({
      ...prev,
      [key]: Number(value)
    }));
  };

  const loadDemoData = () => {
    setLocality(initialDemoData.locality);
    setIndicators(initialDemoData.indicators);
  };

  const fetchRecommendations = async () => {
    setIsGenerating(true);
    setAiStep('Analyzing sustainability data...');
    setAiMessage('');

    try {
      await new Promise(r => setTimeout(r, 600));
      setAiStep('Identifying key challenges...');
      await new Promise(r => setTimeout(r, 600));
      setAiStep('Generating practical recommendations...');

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locality,
          overallScore,
          indicators,
          problemAreas: problemAreas.map(p => p.name)
        })
      });

      const data = await response.json();

      if (data.success) {
        setAiRecommendations(data.recommendations || []);
        setExpectedBenefits(data.expectedBenefits || []);
        setIsFallback(!!data.isFallback);
        setAiMessage(data.message || '');
      } else {
        throw new Error(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Error in fetchRecommendations:', err);
      setIsFallback(true);
      setAiMessage('AI service is currently unavailable. Showing rule-based recommendations for demonstration.');
      setAiRecommendations([
        {
          category: 'Traffic Management',
          icon: '🚗',
          title: 'Sustainable Mobility & Signal Optimization',
          description: 'Improve public transportation connectivity, implement smart traffic signal synchronization, and promote cycling corridors to decrease vehicle congestion.'
        },
        {
          category: 'EV Infrastructure',
          icon: '🔋',
          title: 'Solar EV Charging Hub Deployment',
          description: 'Deploy public solar-powered fast chargers at commercial centers, transit depots, and residential complexes across ' + locality + '.'
        },
        {
          category: 'Electricity Efficiency',
          icon: '⚡',
          title: 'Smart LED Grid & Rooftop Solar Incentives',
          description: 'Transition municipal streetlights to automated LEDs and incentivize net-metered solar PV panels for large commercial buildings.'
        }
      ]);
      setExpectedBenefits([
        `Measurable reduction in peak resource consumption across ${locality}.`,
        'Improved public health outcomes and reduced local pollution metrics.',
        'Higher citizen satisfaction through reliable green infrastructure and smart services.'
      ]);
    } finally {
      setIsGenerating(false);
      setAiStep('');
    }
  };

  useEffect(() => {
    if (hasAssessed && aiRecommendations.length === 0) {
      fetchRecommendations();
    }
  }, [hasAssessed]);

  return (
    <AssessmentContext.Provider
      value={{
        locality,
        setLocality,
        indicators,
        handleIndicatorChange,
        overallScore,
        scoreStatus,
        problemAreas,
        performingAreas,
        hasAssessed,
        setHasAssessed,
        loadDemoData,
        aiRecommendations,
        expectedBenefits,
        isGenerating,
        aiStep,
        aiMessage,
        isFallback,
        fetchRecommendations
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);
