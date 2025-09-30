import axios from 'axios';
import useSettingsStore from '../store/settingsStore';

// mock data crearted bhy jeet for teasting phase 

const MOCK_DISEASES = [
  {
    diseaseName: 'Early Blight (Alternaria solani)',
    description: 'Concentric brown lesions on older leaves; yellowing and defoliation. Common in tomatoes and potatoes.',
    treatments: [
      'Prune lower leaves to improve airflow',
      'Mulch soil to limit splash-back',
      'Apply chlorothalonil or copper fungicide as labeled',
      'Rotate crops for 2–3 years'
    ]
  },
  {
    diseaseName: 'Late Blight (Phytophthora infestans)',
    description: 'Water-soaked lesions on leaves and stems; white sporulation under humid conditions; rapid plant collapse.',
    treatments: [
      'Remove and destroy infected plants',
      'Avoid overhead irrigation',
      'Use resistant cultivars when possible',
      'Apply phosphonate or copper products preventively'
    ]
  },
  {
    diseaseName: 'Powdery Mildew',
    description: 'White, powdery fungal growth on leaves, stems, and buds; distortion and reduced vigor.',
    treatments: [
      'Increase spacing and airflow',
      'Apply sulfur or potassium bicarbonate sprays',
      'Reduce excess nitrogen fertilization',
      'Remove heavily infected leaves'
    ]
  },
  {
    diseaseName: 'Downy Mildew',
    description: 'Yellow angular leaf spots; purple-gray downy growth on undersides in humid conditions.',
    treatments: [
      'Water in mornings to reduce leaf wetness duration',
      'Use copper or phosphite sprays preventively',
      'Improve garden airflow',
      'Rotate host crops'
    ]
  },
  {
    diseaseName: 'Black Spot of Rose (Diplocarpon rosae)',
    description: 'Black, fringed lesions on rose leaves; yellowing and premature leaf drop.',
    treatments: [
      'Sanitize dead leaves and debris',
      'Water early; keep foliage dry',
      'Apply neem oil or sulfur routinely',
      'Plant resistant varieties'
    ]
  },
  {
    diseaseName: 'Bacterial Leaf Spot',
    description: 'Small water-soaked spots that become necrotic with yellow halos; may coalesce into large blighted areas.',
    treatments: [
      'Avoid working with wet plants',
      'Disinfect tools between cuts',
      'Copper-based bactericides can help',
      'Use disease-free seed/starts'
    ]
  },
  {
    diseaseName: 'Anthracnose',
    description: 'Dark, sunken lesions on fruit, stems, or leaves; can cause fruit rot and dieback.',
    treatments: [
      'Remove infected fruit quickly',
      'Prune for airflow and light penetration',
      'Apply appropriate fungicides preventively',
      'Rotate and avoid overhead watering'
    ]
  },
  {
    diseaseName: 'Fusarium Wilt',
    description: 'Yellowing starting on one side of the plant; vascular browning; wilting that worsens during the day.',
    treatments: [
      'Plant resistant cultivars (Fusarium-resistant)',
      'Solarize soil where feasible',
      'Improve drainage',
      'Rotate with non-hosts'
    ]
  },
  {
    diseaseName: 'Verticillium Wilt',
    description: 'V-shaped chlorosis and necrosis; wilting and slow decline; vascular discoloration.',
    treatments: [
      'Use resistant varieties',
      'Remove and destroy infected plants',
      'Increase soil organic matter',
      'Practice long rotations'
    ]
  },
  {
    diseaseName: 'Leaf Curl (Taphrina deformans)',
    description: 'Distorted, thickened, reddened leaves on peaches and nectarines; premature leaf drop.',
    treatments: [
      'Apply dormant copper/lime sulfur sprays',
      'Remove and dispose of infected leaves',
      'Promote tree vigor with proper nutrition',
      'Choose resistant cultivars'
    ]
  },
  {
    diseaseName: 'Citrus Canker',
    description: 'Raised corky lesions with yellow halos on citrus leaves, fruit, and twigs; defoliation and fruit drop.',
    treatments: [
      'Prune and destroy infected tissues',
      'Copper sprays during wet seasons',
      'Disinfect tools; control leaf miners',
      'Plant certified disease-free stock'
    ]
  },
  {
    diseaseName: 'Tomato Mosaic Virus (ToMV)',
    description: 'Mottling, mosaic, and leaf distortion; stunted plants and reduced yields.',
    treatments: [
      'Remove infected plants immediately',
      'Disinfect hands and tools regularly',
      'Control sap-feeding pests',
      'Use resistant varieties and clean seed'
    ]
  },
  {
    diseaseName: 'Bacterial Wilt (Ralstonia)',
    description: 'Sudden wilting without yellowing; brown ooze from cut stems; rapid collapse in warm conditions.',
    treatments: [
      'Improve drainage and avoid waterlogged soils',
      'Sanitize tools and containers',
      'Rotate with non-hosts for multiple seasons',
      'Use resistant rootstocks if available'
    ]
  },
  {
    diseaseName: 'Clubroot (Brassicas)',
    description: 'Swollen, distorted roots; yellowing and wilting in crucifers like cabbage and broccoli.',
    treatments: [
      'Raise soil pH toward neutral with lime',
      'Practice long rotations (4–7 years)',
      'Improve drainage and avoid contaminated transplants',
      'Clean soil from tools and boots'
    ]
  },
  {
    diseaseName: 'Gray Mold (Botrytis)',
    description: 'Gray fuzzy mold on flowers, fruit, and wounded tissue; thrives in cool, humid conditions.',
    treatments: [
      'Remove infected tissue promptly',
      'Increase ventilation and reduce humidity',
      'Avoid overhead irrigation',
      'Use protective fungicides as needed'
    ]
  },
  {
    diseaseName: 'Sooty Mold (Honeydew-associated)',
    description: 'Black, sooty fungal growth on leaves caused by insect honeydew; mainly aesthetic but reduces photosynthesis.',
    treatments: [
      'Control aphids/whiteflies/scale (source of honeydew)',
      'Wash foliage with water and mild soap',
      'Encourage beneficial insects',
      'Prune for airflow'
    ]
  },
  {
    diseaseName: 'Rust (Puccinia spp.)',
    description: 'Orange/brown pustules on undersides of leaves; yellowing and premature leaf drop.',
    treatments: [
      'Remove infected leaves and debris',
      'Avoid overhead watering',
      'Apply sulfur or copper sprays',
      'Choose resistant cultivars'
    ]
  },
  {
    diseaseName: 'Leaf Spot (Cercospora, Septoria)',
    description: 'Small circular or irregular spots with dark borders; coalescence leads to blight.',
    treatments: [
      'Sanitize plant litter',
      'Improve airflow and reduce leaf wetness',
      'Apply labeled fungicides as needed',
      'Rotate and avoid overcrowding'
    ]
  },
  {
    diseaseName: 'Root Rot (Pythium/Phytophthora)',
    description: 'Root browning and mushiness; stunted, yellowing plants; wilting under heat stress.',
    treatments: [
      'Improve drainage and avoid overwatering',
      'Use clean, well-draining potting media',
      'Sterilize containers before reuse',
      'Consider phosphite drenches preventively'
    ]
  },
  {
    diseaseName: 'Bacterial Speck (Tomato)',
    description: 'Small dark lesions with yellow halos on tomato leaves and fruit; cool weather favored.',
    treatments: [
      'Use pathogen-free seed',
      'Copper-based sprays can reduce spread',
      'Avoid handling when foliage is wet',
      'Rotate with non-hosts'
    ]
  },
  {
    diseaseName: 'Scab (Apple/Pear)',
    description: 'Velvety olive lesions on leaves and fruit; scabby fruit cracking; severe defoliation in wet springs.',
    treatments: [
      'Apply preventives at green tip through petal fall',
      'Remove fallen leaves and fruit mummies',
      'Improve canopy airflow',
      'Plant resistant cultivars'
    ]
  },
  {
    diseaseName: 'Crown Gall (Agrobacterium)',
    description: 'Tumor-like galls at crown or on roots and stems; reduced vigor and water uptake.',
    treatments: [
      'Avoid wounding during planting',
      'Remove and destroy severely affected plants',
      'Disinfect tools and avoid contaminated soils',
      'Plant resistant rootstocks if available'
    ]
  },
  {
    diseaseName: 'Leaf Scorch (Abiotic/Physiological)',
    description: 'Brown, crispy leaf margins due to drought, wind, salt, or nutrient imbalance; not infectious.',
    treatments: [
      'Adjust watering practices and mulch soil',
      'Reduce salt exposure and wind stress',
      'Balance nutrients and avoid overfertilization',
      'Prune only minimally until recovery'
    ]
  },
  {
    diseaseName: 'Nutrient Deficiency (General Chlorosis)',
    description: 'Uniform yellowing or interveinal chlorosis; slower growth; various macro/micronutrient causes.',
    treatments: [
      'Perform soil and tissue tests',
      'Apply balanced fertilizer as indicated',
      'Adjust pH to optimize nutrient availability',
      'Improve organic matter'
    ]
  },
  {
    diseaseName: 'Sunscald/Sunburn',
    description: 'Bleached, necrotic patches on sun-exposed fruit and leaves; often after sudden pruning or heat spikes.',
    treatments: [
      'Provide shade cloth during heat waves',
      'Avoid heavy pruning in hot periods',
      'Maintain even soil moisture',
      'Use reflective mulches if appropriate'
    ]
  }
];

function randomConfidence() {
  return 0.75 + Math.random() * 0.25;
}

function pickRandomDiagnosis() {
  const choice = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
  return { ...choice, confidence: randomConfidence() };
}

export async function diagnoseByName(plantName) {
  try {
    // For development: always return a random mock diagnosis regardless of input.
    return pickRandomDiagnosis();
  } catch (e) {
    // Ensure we never throw; always provide a reasonable fallback.
    return pickRandomDiagnosis();
  }
}

export function getMockDiagnosis() {
  return pickRandomDiagnosis();
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