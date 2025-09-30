import axios from 'axios';
import useSettingsStore from '../store/settingsStore';

const KB = {
  'tomato': {
    diseaseName: 'Early Blight (Alternaria)',
    description: 'Fungal disease causing concentric ring lesions on older leaves; progresses upward leading to defoliation.',
    treatments: [
      'Remove infected leaves; avoid overhead watering',
      'Apply copper or chlorothalonil fungicide per label',
      'Rotate crops; do not plant tomatoes in same spot yearly',
      'Mulch to prevent soil splash'
    ]
  },
  'rose': {
    diseaseName: 'Black Spot',
    description: 'Black circular spots with fringed margins; leaves yellow and drop.',
    treatments: [
      'Prune for airflow; remove infected leaves',
      'Weekly spray with sulfur or neem oil during season',
      'Water at base; avoid wetting foliage',
      'Clean fallen debris'
    ]
  },
  'mango': {
    diseaseName: 'Powdery Mildew',
    description: 'White powdery growth on young leaves and inflorescences; causes flower drop and poor fruit set.',
    treatments: [
      'Spray wettable sulfur at recommended dose',
      'Improve canopy airflow via pruning',
      'Avoid excess nitrogen during flushes'
    ]
  }
};

function randomConfidence() {
  return 0.78 + Math.random() * 0.2;
}

export async function diagnoseByName(plantName) {
  const key = (plantName || '').toLowerCase().trim();
  const hit = KB[key];
  if (hit) {
    return { ...hit, confidence: randomConfidence() };
  }
  return {
    diseaseName: 'General Health Check',
    description: 'No specific disease matched the plant name. Provide clear photos of affected leaves/stems, and check watering, light, and nutrient conditions.',
    treatments: [
      'Inspect for pests (aphids, mites); treat with neem/soap if present',
      'Adjust watering—avoid over/under watering',
      'Ensure adequate light; rotate plant',
      'Consider balanced fertilizer if growth is slow'
    ],
    confidence: 0.82
  };
}

// Optional Plant.id integration (stub)
export async function diagnoseWithPlantId(images=[]) {
  const apiKey = useSettingsStore.getState().plantIdApiKey;
  if (!apiKey) return null;
  try {
    const resp = await axios.post('https://plant.id/api/v3/health_assessment', {}, {
      headers: { 'Api-Key': apiKey, 'Content-Type': 'application/json' }
    });
    const top = resp.data?.result?.diseases?.[0];
    if (!top) return null;
    return {
      diseaseName: top.name || 'Unknown',
      description: top?.description || '—',
      treatments: top?.treatment?.preventions || top?.treatment?.biological || top?.treatment?.chemical || [],
      confidence: top?.probability || 0.8
    };
  } catch (e) {
    console.warn('Plant.id error', e.message);
    return null;
  }
}