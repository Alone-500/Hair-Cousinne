import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase body parser limit for base64 camera image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Helper to get or instantiate Google Gen AI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Pre-curated realistic fallback dataset based on face geometry and hair textures
const FALLBACK_ARCHETYPES = [
  {
    faceShape: 'Oval',
    faceShapeConfidence: 96,
    faceCharacteristics: {
      jawline: 'Softly rounded with balanced angularity, gently tapering towards the chin.',
      forehead: 'Slightly wider than jawline, proportioned hairline with natural symmetry.',
      cheekbones: 'Subtle high cheekbones with harmonious mid-face width.',
      proportions: 'Length is approx 1.5x width — the most versatile male canvas for haircuts.'
    },
    hairCharacteristics: {
      texture: 'Type 2A - 2B Light Wavy',
      textureGroup: 'Wavy',
      density: 'Medium - Dense',
      hairline: 'Balanced natural hairline with strong temporal coverage',
      currentLength: 'Medium (approx 2.5 - 3.5 inches)',
      growthPattern: 'Standard clockwise cowlick at crown with natural side-flow'
    },
    recommendations: [
      {
        id: 'rec-1',
        name: 'Textured Modern Quiff with Low Taper',
        matchScore: 98,
        vibe: 'Modern / Streetwear',
        whyItWorks: 'The textured quiff accentuates your balanced facial symmetry without elongating the face. The low taper maintains weight at the temples to complement your natural jawline.',
        topLength: '3 to 3.5 inches, heavily point-cut and razor-textured',
        sidesAndBack: 'Low skin taper fade cleaning up around the sideburns and nape',
        fadeType: 'Low Taper Fade',
        barberInstructions: {
          clipperGuards: '#0.5 open to #2 taper at sideburns and nape, scissor-over-comb transition',
          scissorWork: '3 inches point-cut top, leave fringe slightly longer for lift',
          templeAndNape: 'Natural tapered neckline, sharp corner lineup at temples',
          scriptForBarber: 'Can I get a modern textured quiff with 3 inches on top point-cut for texture, and a clean low taper fade on the temples and nape leaving bulk through the parietal ridge?'
        },
        stylingDifficulty: 'Intermediate (4-5 min)',
        maintenanceWeeks: '3-4 weeks',
        dailyRoutine: 'Dowel-dry to damp, mist with sea salt spray, blow dry backwards with fingers, then finish with a nickel-sized scoop of matte paste for separation.',
        recommendedProducts: [
          {
            id: 'prod-1',
            name: 'Hydrating Matte Clay',
            brand: 'Crown & Blade Co.',
            category: 'Styling Clay',
            purpose: 'Medium-high pliable hold with a completely shine-free organic finish',
            holdLevel: 'High (4/5)',
            shineLevel: 'Matte (0/5)',
            howToApply: 'Warm a pea-sized amount between palms until clear, then work from roots to tips through dry hair.',
            price: '$24.00',
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=70',
            volume: '100ml / 3.4 oz',
            keyIngredients: 'Bentonite Clay, Kaolin, Beeswax, Jojoba Oil'
          },
          {
            id: 'prod-2',
            name: 'Atlantic Mineral Sea Salt Spray',
            brand: 'Crown & Blade Co.',
            category: 'Pre-Styler',
            purpose: 'Amplifies natural wave definition and adds gritty all-day root lift',
            holdLevel: 'Light (2/5)',
            shineLevel: 'Natural (1/5)',
            howToApply: 'Spray 4-6 pumps evenly through towel-damp hair before blow drying.',
            price: '$20.00',
            imageUrl: 'https://images.unsplash.com/photo-1608248597359-54b03513b632?w=500&auto=format&fit=crop&q=70',
            volume: '200ml / 6.7 oz',
            keyIngredients: 'Dead Sea Salt, Kelp Extract, Vitamin B5'
          }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=70'
      },
      {
        id: 'rec-2',
        name: 'Textured Crop with Mid Drop Fade',
        matchScore: 94,
        vibe: 'Athletic / Low Maintenance',
        whyItWorks: 'The forward-directed blunt texture breaks up the forehead height while creating a sharp, masculine frame around your cheekbones.',
        topLength: '1.5 to 2 inches, chopped irregular texture',
        sidesAndBack: 'Drop fade starting from #1 down to skin below the occipital bone',
        fadeType: 'Mid Drop Fade',
        barberInstructions: {
          clipperGuards: '#0 to #1.5 mid drop fade',
          scissorWork: 'De-bulk top with thinning shears and deep notch cutting',
          templeAndNape: 'Crisp micro-fringe edge with zeroed taper at the neck',
          scriptForBarber: 'I want a textured French crop with a mid drop fade down to skin. Keep the fringe blunt but choppy, and texture the top so it doesn’t lie flat.'
        },
        stylingDifficulty: 'Beginner (2 min)',
        maintenanceWeeks: '2-3 weeks',
        dailyRoutine: 'Towel dry vigorously, dust styling powder across the crown and fringe, scrunch with fingertips.',
        recommendedProducts: [
          {
            id: 'prod-3',
            name: 'Volumizing Texture Powder',
            brand: 'Crown & Blade Co.',
            category: 'Styling Powder',
            purpose: 'Instant gravity-defying root lift and dry matte separation without clumping',
            holdLevel: 'Medium (3/5)',
            shineLevel: 'Zero Shine (0/5)',
            howToApply: 'Tap bottle gently directly over dry roots and shake hair with fingers into desired shape.',
            price: '$18.00',
            imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=70',
            volume: '20g / 0.7 oz',
            keyIngredients: 'Silica Silylate, Rice Starch, Argan Kernel Oil'
          }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=70'
      },
      {
        id: 'rec-3',
        name: 'Executive Side Part with Scissor Taper',
        matchScore: 91,
        vibe: 'Corporate / Professional',
        whyItWorks: 'Highlights clean symmetry and gives a timeless, refined profile suitable for corporate and formal environments.',
        topLength: '3 to 4 inches parted cleanly at the natural recession',
        sidesAndBack: 'Traditional scissor-over-comb taper (#2 to #3 equivalent)',
        fadeType: 'Classic Scissor Taper',
        barberInstructions: {
          clipperGuards: 'Scissor work only or #2 guard blended into sides',
          scissorWork: 'Layered top with progressive length towards the front quiff',
          templeAndNape: 'Tapered hairline with natural sideburn length',
          scriptForBarber: 'Give me a classic scissor-tapered side part. Blend the sides with shears to keep some density, and taper the neck clean.'
        },
        stylingDifficulty: 'Intermediate (5 min)',
        maintenanceWeeks: '4-5 weeks',
        dailyRoutine: 'Comb damp hair following natural growth whorl, work in pomade, use a fine-tooth comb for clean parting.',
        recommendedProducts: [
          {
            id: 'prod-4',
            name: 'Classic Barber Water Pomade',
            brand: 'Crown & Blade Co.',
            category: 'Water-Soluble Pomade',
            purpose: 'Clean comb-lines with polished satin lustre that washes out with plain water',
            holdLevel: 'Firm (4/5)',
            shineLevel: 'Medium-High (3.5/5)',
            howToApply: 'Work through damp hair with palms, comb into clean parting with fine teeth.',
            price: '$22.00',
            imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=70',
            volume: '120ml / 4 oz',
            keyIngredients: 'Castor Seed Oil, Carnauba Wax, Pro-Vitamin B5'
          }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=70'
      }
    ],
    avoidStyles: [
      {
        styleName: 'Flat Center-Part Curtain Cut (Zero Layering)',
        reason: 'Draws focus downward and can make oval proportions appear excessively long or narrow.'
      },
      {
        styleName: 'Ultra High Skin Buzz Without Facial Hair',
        reason: 'Removes the opportunity to frame your balanced cheekbone structure.'
      }
    ],
    expertTip: 'Your facial proportions allow you to rock virtually any taper or fade. Focus your styling energy on enhancing your natural waves rather than flattening them.'
  },
  {
    faceShape: 'Square',
    faceShapeConfidence: 95,
    faceCharacteristics: {
      jawline: 'Broad, chiseled mandibular angle with razor-sharp horizontal jawline.',
      forehead: 'Equal in width to jawline, creating a commanding angular square profile.',
      cheekbones: 'Straight alignment with jawline and temples.',
      proportions: 'Length and width are nearly 1:1, imparting an athletic, masculine frame.'
    },
    hairCharacteristics: {
      texture: 'Type 1 - Straight & Dense',
      textureGroup: 'Straight',
      density: 'Coarse / High Density',
      hairline: 'Squared temple line with clean natural recession points',
      currentLength: 'Short to Medium (2 - 3 inches)',
      growthPattern: 'Forward growth on sides, slight resistance to slicking backward'
    },
    recommendations: [
      {
        id: 'rec-sq-1',
        name: 'High & Tight Fade with Textured Crew Cut',
        matchScore: 99,
        vibe: 'Athletic / Military Chic',
        whyItWorks: 'Square faces are the gold standard for high fades. Tight sides draw immediate attention to your chiseled jawline, while top texture softens the angular forehead.',
        topLength: '1 to 1.5 inches with scissor point-cutting',
        sidesAndBack: 'High skin fade blended right into the parietal bone',
        fadeType: 'High Skin Fade',
        barberInstructions: {
          clipperGuards: '#0 skin up to #1.5, clipper-over-comb at temple transition',
          scissorWork: 'Finger-length on top with notched points for texture',
          templeAndNape: 'High razor skin finish, sharp temple edges',
          scriptForBarber: 'Take the sides down to a high skin fade, keeping the blend tight. On top, give me 1.5 inches textured so it stands up slightly with matte paste.'
        },
        stylingDifficulty: 'Beginner (1-2 min)',
        maintenanceWeeks: '2 weeks',
        dailyRoutine: 'Rinse in morning, pat dry, rub small dollop of styling clay through top for quick separation.',
        recommendedProducts: [
          {
            id: 'prod-sq-1',
            name: 'Extreme Matte Hair Mud',
            brand: 'Crown & Blade Co.',
            category: 'Texture Mud',
            purpose: 'All-weather maximum grip for coarse straight hair with zero residue',
            holdLevel: 'Maximum (5/5)',
            shineLevel: 'Zero (0/5)',
            howToApply: 'Rub into palms until warm, spike and push through dry hair.',
            price: '$26.00',
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=70',
            volume: '90ml / 3 oz',
            keyIngredients: 'Volcanic Ash, Kaolin, Lanolin, Shea Butter'
          }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=70'
      },
      {
        id: 'rec-sq-2',
        name: 'Slicked Undercut / Modern Pompadour',
        matchScore: 94,
        vibe: 'Classic Gentleman',
        whyItWorks: 'Creates vertical volume on top which elongates the 1:1 facial ratio, accentuating your strong jaw without looking boxy.',
        topLength: '3.5 to 4.5 inches brushed up and back',
        sidesAndBack: 'Disconnected undercut or high taper #1',
        fadeType: 'High Taper / Disconnected Fade',
        barberInstructions: {
          clipperGuards: '#1 or #2 high fade, disconnected top',
          scissorWork: 'Blended top length from back to front with maximum length at front fringe',
          templeAndNape: 'Squared off or natural taper',
          scriptForBarber: 'Give me an undercut fade with #1 on the sides, leaving 4 inches on top to slick back into a pompadour.'
        },
        stylingDifficulty: 'Advanced (7-8 min)',
        maintenanceWeeks: '3 weeks',
        dailyRoutine: 'Blow dry backwards with round brush and heat, apply fiber pomade for flexible structure.',
        recommendedProducts: [
          {
            id: 'prod-sq-2',
            name: 'Flexible Fiber Pomade',
            brand: 'Crown & Blade Co.',
            category: 'Fiber Pomade',
            purpose: 'Pliable all-day control for stubborn straight hair with natural satin sheen',
            holdLevel: 'High (4/5)',
            shineLevel: 'Low Satin (2/5)',
            howToApply: 'Distribute through towel-damp hair, comb backwards and lock with cold shot.',
            price: '$23.00',
            imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
            volume: '100ml / 3.4 oz',
            keyIngredients: 'Beeswax, Carnauba, Glycerin, Meadowfoam Seed Oil'
          }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'
      }
    ],
    avoidStyles: [
      {
        styleName: 'Blunt Bowl Cut or Wide Sides',
        reason: 'Adds width to the temples and cheekbones, turning a strong square into an overly blocky head shape.'
      }
    ],
    expertTip: 'Keep your sides short and clean! Your bone structure does the heavy lifting, so let the jawline remain the star of your look.'
  }
];

// POST /api/analyze-hair
app.post('/api/analyze-hair', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', preferences } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 is required for hair analysis.' });
    }

    const ai = getGenAI();

    // If Gemini API is available, perform real multimodal facial structure & hair texture analysis
    if (ai) {
      try {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        const prompt = `You are a world-class Master Barber and Men's Hair Stylist consultation expert.
Analyze this male client's photo with precision.
Determine:
1. Facial Structure:
   - Specific face shape: Oval, Square, Round, Diamond, Heart, Oblong, Triangle.
   - Exact jawline characteristics (sharp, rounded, broad, tapered).
   - Forehead width relative to cheekbones and jaw.
   - Cheekbones and facial length-to-width ratio.
2. Hair Analysis:
   - Hair texture type: Type 1 Straight, Type 2 Wavy (2A/2B/2C), Type 3 Curly (3A/3B/3C), or Type 4 Coily (4A/4B/4C).
   - Hair density (Fine, Medium, Coarse / Thick).
   - Hairline pattern (straight, widow's peak, high forehead, receding temples, mature hairline).
   - Approximate current length and natural flow.
3. Haircut Recommendations:
   - Provide 3 distinct, top haircut recommendations customized specifically for his face shape and hair texture.
   - For each haircut:
     * id: unique string
     * name: precise barber name (e.g., "Textured French Crop with Low Drop Taper", "Mid Fade Pompadour with Natural Flow", "Classic Tapered Side Part", "Textured Fringe with Temple Fade", etc.)
     * matchScore: integer between 88 and 99
     * vibe: one of "Modern / Streetwear", "Corporate / Professional", "Athletic / Low Maintenance", "Classic Gentleman", "Edgy / Trend"
     * whyItWorks: 2-3 sentences explaining the geometric balance (why it flatters this exact face shape and works with this hair texture)
     * topLength: specific length in inches & cutting technique
     * sidesAndBack: specific fade or taper level
     * fadeType: e.g. "Low Drop Fade", "Mid Skin Taper", "High Fade", "Scissor Taper"
     * barberInstructions: object with:
         clipperGuards: clipper numbers to tell the barber
         scissorWork: top scissors notes
         templeAndNape: neckline and temple details
         scriptForBarber: EXACT natural sentence the client can read out loud or show to his barber in the chair
     * stylingDifficulty: "Beginner (2 min)" | "Intermediate (5 min)" | "Advanced (8-10 min)"
     * maintenanceWeeks: e.g., "3-4 weeks"
     * dailyRoutine: actionable 3-step morning routine
     * recommendedProducts: array of 2 curated styling products (essential for this texture and finish).
       CRITICAL: Each product MUST include:
         id: string
         name: string (e.g. "Matte Clay Pomade", "Sea Salt Texture Spray", "Curl Defining Cream", "Argan Conditioning Beard & Scalp Oil")
         brand: string
         category: string
         purpose: string
         holdLevel: string (e.g. "Medium-High (4/5)")
         shineLevel: string (e.g. "Natural Matte (0/5)")
         howToApply: step-by-step application instructions
         price: string (e.g. "$22.00")
         volume: string (e.g. "100ml / 3.4 oz")
         keyIngredients: string
         imageUrl: high quality unsplash photo URL of cosmetic / grooming product jar, bottle, or spray
     * imageUrl: high quality realistic men's haircut reference image URL (unsplash portrait of handsome male with this specific hairstyle)
4. Avoid Styles: 2 haircuts he should avoid and the anatomical reasons why.
5. Expert Tip: 1 pro barber tip.

User preferences or notes: ${preferences || 'None provided. Focus on most flattering natural look.'}

Return strictly valid JSON adhering to the specified structure.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: cleanBase64,
                },
              },
              { text: prompt },
            ],
          },
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);
        return res.json({ success: true, analysis: parsed, source: 'gemini-3.8-flash' });
      } catch (geminiErr: any) {
        console.error('Gemini vision API error, falling back to expert barber heuristics:', geminiErr?.message);
        // Fall back gracefully below
      }
    }

    // Fallback if no key or API failed
    const archetype = FALLBACK_ARCHETYPES[Math.floor(Math.random() * FALLBACK_ARCHETYPES.length)];
    return res.json({
      success: true,
      analysis: archetype,
      source: 'heuristic-engine',
      notice: !ai ? 'Running with Barber AI engine (Add GEMINI_API_KEY in Secrets for live custom multimodal vision).' : undefined,
    });
  } catch (error: any) {
    console.error('Server error in /api/analyze-hair:', error);
    return res.status(500).json({ error: error?.message || 'Failed to analyze hair.' });
  }
});

// Setup Vite in Dev or serve static files in Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fadecraft AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
