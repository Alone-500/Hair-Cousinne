import { SampleModel, StylingProduct } from '../types';

export const SAMPLE_PRODUCTS: StylingProduct[] = [
  {
    id: 'prod-matte-clay',
    name: 'Bentonite Matte Styling Clay',
    brand: 'Crown & Blade Craft',
    category: 'Styling Clay',
    purpose: 'Provides malleable high hold with a zero-shine dry textured finish that lasts 16+ hours.',
    holdLevel: 'High (4.5/5)',
    shineLevel: 'Zero Shine (0/5)',
    howToApply: 'Warm a dime-sized amount between palms until translucent. Work vigorously from hair roots to ends on towel-dry hair.',
    price: '$24.00',
    volume: '100ml / 3.4 oz',
    keyIngredients: 'Bentonite Clay, Kaolin, Organic Beeswax, Moroccan Argan Oil',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=70'
  },
  {
    id: 'prod-sea-salt',
    name: 'Pacific Mineral Sea Salt Mist',
    brand: 'Crown & Blade Craft',
    category: 'Pre-Styling Spray',
    purpose: 'Activates natural curls and waves, building effortless beach volume and matte root texture.',
    holdLevel: 'Flexible (2/5)',
    shineLevel: 'Natural Matte (1/5)',
    howToApply: 'Spray 5 to 7 pumps evenly through damp hair before blow drying with hands or a diffuser.',
    price: '$21.00',
    volume: '200ml / 6.7 fl oz',
    keyIngredients: 'Pacific Sea Salts, Kelp Extract, Provitamin B5, Aloe Vera Leaf Juice',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-54b03513b632?w=500&auto=format&fit=crop&q=70'
  },
  {
    id: 'prod-texture-powder',
    name: 'Micro-Silica Volumizing Powder',
    brand: 'Crown & Blade Craft',
    category: 'Texture Powder',
    purpose: 'Defies gravity with instant root lift, dry separation, and weightless volume without clumping.',
    holdLevel: 'Medium-High (3.5/5)',
    shineLevel: 'Ultra Matte (0/5)',
    howToApply: 'Sprinkle 2-3 taps directly onto dry crown and fringe roots, then ruffle through with fingers.',
    price: '$19.00',
    volume: '25g / 0.88 oz',
    keyIngredients: 'Silica Silylate, Arrowroot Powder, Tea Tree Leaf Oil',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=70'
  },
  {
    id: 'prod-curl-cream',
    name: 'Hydrating Botanical Curl Enhancer',
    brand: 'Crown & Blade Craft',
    category: 'Curl Defining Cream',
    purpose: 'Locks moisture into coils and curls, eliminates frizz, and enhances ringlet definition.',
    holdLevel: 'Medium Pliable (3/5)',
    shineLevel: 'Healthy Luster (3/5)',
    howToApply: 'Rake thoroughly through soaking-wet or damp curls, then scrunch upward and air-dry or diffuse.',
    price: '$26.00',
    volume: '150ml / 5.1 fl oz',
    keyIngredients: 'Raw Shea Butter, Jamaican Black Castor Oil, Hibiscus Flower, Flaxseed',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=70'
  },
  {
    id: 'prod-water-pomade',
    name: 'Heritage High-Shine Water Pomade',
    brand: 'Crown & Blade Craft',
    category: 'Water-Soluble Pomade',
    purpose: 'Precision comb lines, vintage side parts, and slick backs that wash out completely with water.',
    holdLevel: 'Firm Hold (4/5)',
    shineLevel: 'High Polish (4.5/5)',
    howToApply: 'Apply to damp hair for slick glass shine or dry hair for maximum holding power. Comb into place.',
    price: '$23.00',
    volume: '120ml / 4.0 oz',
    keyIngredients: 'Vegetable Glycerin, Carnauba Wax, Bergamot Oil, Cedarwood Extract',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=70'
  },
  {
    id: 'prod-beard-oil',
    name: 'Cedar & Sandalwood Conditioning Oil',
    brand: 'Crown & Blade Craft',
    category: 'Beard & Scalp Elixir',
    purpose: 'Soothes clipper-burned skin, softens coarse facial hair, and prevents fade line flaking.',
    holdLevel: 'Conditioning (0/5)',
    shineLevel: 'Natural Sheen (2/5)',
    howToApply: 'Massage 3-4 drops into neckline, jawline stubble, and scalp skin right after showering.',
    price: '$22.00',
    volume: '50ml / 1.7 oz',
    keyIngredients: 'Golden Jojoba Seed, Virgin Sweet Almond Oil, Atlas Cedarwood, Vitamin E',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=70'
  }
];

export const SAMPLE_MODELS: SampleModel[] = [
  {
    id: 'sample-marcus',
    name: 'Marcus Vance',
    age: 28,
    faceShape: 'Oval',
    hairTexture: 'Type 2B Wavy',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=70',
    description: 'Balanced symmetrical oval proportions with medium-density natural waves.',
    analysis: {
      faceShape: 'Oval',
      faceShapeConfidence: 96,
      faceCharacteristics: {
        jawline: 'Slightly rounded jaw curving smoothly into a defined chin, without harsh corners.',
        forehead: 'Balanced forehead width that subtly matches the cheekbone span.',
        cheekbones: 'Softly pronounced cheekbones forming the widest horizontal line of the face.',
        proportions: 'Length is roughly 1.5 times width — considered the universal ideal baseline.'
      },
      hairCharacteristics: {
        texture: 'Type 2B Natural Wavy with noticeable S-shape bends when grown over 2 inches',
        textureGroup: 'Wavy',
        density: 'Medium - Dense',
        hairline: 'Intact symmetrical hairline with slight mature rounding at temples',
        currentLength: 'Medium (3.0 inches on top, overgrown sideburns)',
        growthPattern: 'Clockwise crown whorl with forward direction towards front left fringe'
      },
      recommendations: [
        {
          id: 'rec-marcus-1',
          name: 'Modern Textured Quiff with Low Drop Taper',
          matchScore: 98,
          vibe: 'Modern / Streetwear',
          whyItWorks: 'The quiff enhances your natural oval symmetry by adding subtle vertical lift at the front without narrowing the temples. The low drop taper maintains clean edges around your ears while highlighting cheekbone structure.',
          topLength: '3.0 to 3.5 inches, heavily point-cut and razor textured',
          sidesAndBack: 'Low drop skin taper around sideburns and nape, transitioning to scissor blend',
          fadeType: 'Low Drop Taper Fade',
          barberInstructions: {
            clipperGuards: '#0.5 open to #2 taper at sideburns and nape, scissor-over-comb through parietal ridge',
            scissorWork: '3.5 inches point-cut on top, leaving extra length in the front fringe for elevation',
            templeAndNape: 'Natural tapered neckline, sharp corner lineup at temples',
            scriptForBarber: 'Can I get a modern textured quiff with 3.5 inches on top point-cut for movement, with a clean low skin drop taper on the temples and nape leaving bulk through the parietal ridge?'
          },
          stylingDifficulty: 'Intermediate (4-5 min)',
          maintenanceWeeks: '3-4 weeks',
          dailyRoutine: '1. Towel dry to damp and apply 5 sprays of sea salt mist. 2. Blow dry backwards and upward using fingers for volume. 3. Warm a nickel of matte clay and rake through to set separation.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[0], // Matte clay
            SAMPLE_PRODUCTS[1]  // Sea salt spray
          ],
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-marcus-2',
          name: 'Choppy French Crop with Mid Skin Fade',
          matchScore: 94,
          vibe: 'Athletic / Low Maintenance',
          whyItWorks: 'The forward chopped fringe softens forehead length while the mid skin fade creates high contrast that elevates jawline prominence.',
          topLength: '1.5 to 2.0 inches, deep chip cutting for rough matte texture',
          sidesAndBack: 'Mid skin fade starting at the temple and dropping behind the ear',
          fadeType: 'Mid Skin Fade',
          barberInstructions: {
            clipperGuards: '#0 skin up to #1.5, blended smoothly into scissor length',
            scissorWork: 'Deep chip cuts across the top, straight micro-fringe with jagged ends',
            templeAndNape: 'Skin fade all the way around with razor finish on neck',
            scriptForBarber: 'I want a textured French crop with a mid skin fade down to zero. Leave about 2 inches on top chopped up with shears so it creates irregular piecey texture, with a blunt micro fringe.'
          },
          stylingDifficulty: 'Beginner (2 min)',
          maintenanceWeeks: '2-3 weeks',
          dailyRoutine: '1. Towel dry vigorously. 2. Tap 2 shakes of texture powder across top. 3. Scrunch with fingertips and go.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[2], // Texture powder
            SAMPLE_PRODUCTS[0]  // Matte clay
          ],
          imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-marcus-3',
          name: 'Classic Scissor Taper Side Part',
          matchScore: 91,
          vibe: 'Corporate / Professional',
          whyItWorks: 'A classic scissor-cut silhouette brings timeless sophistication that respects the oval geometry, creating clean lines for executive and formal settings.',
          topLength: '3.0 to 4.0 inches layered back and to the right',
          sidesAndBack: 'Scissor-over-comb graduated taper (#2.5 - #3 equivalent)',
          fadeType: 'All-Scissor Classic Taper',
          barberInstructions: {
            clipperGuards: 'Prefer shears only or #3 guard minimum on lower perimeter',
            scissorWork: 'Uniform layers connected with a crisp diagonal parting on the left',
            templeAndNape: 'Tapered hairline with natural soft neck finish',
            scriptForBarber: 'Give me a classic scissor-tapered side part. Keep decent weight on the sides so my scalp doesn’t show, blend the top into a clean side sweep, and taper the neck clean.'
          },
          stylingDifficulty: 'Intermediate (5 min)',
          maintenanceWeeks: '4-5 weeks',
          dailyRoutine: '1. Apply water pomade to damp hair. 2. Comb diagonally back along your natural part line. 3. Smooth with hands.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[4], // Water pomade
            SAMPLE_PRODUCTS[5]  // Conditioning oil
          ],
          imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=70'
        }
      ],
      avoidStyles: [
        {
          styleName: 'Flat Center-Part Curtains',
          reason: 'Draws the eyes downwards and can make naturally balanced oval facial length seem elongated or droopy.'
        },
        {
          styleName: 'Puffball Sides with No Blend',
          reason: 'Adds horizontal bulk directly over the ears, disrupting your natural cheekbone silhouette.'
        }
      ],
      expertTip: 'With an oval face, you have free license to experiment. Because your hair has natural waves, never blast it dry on high heat without pre-styling spray; embrace the natural movement!'
    }
  },
  {
    id: 'sample-julian',
    name: 'Julian Cole',
    age: 31,
    faceShape: 'Square',
    hairTexture: 'Type 1 Straight & Coarse',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=70',
    description: 'Chiseled mandibular jaw with straight coarse hair that resists lying flat.',
    analysis: {
      faceShape: 'Square',
      faceShapeConfidence: 97,
      faceCharacteristics: {
        jawline: 'Broad, chiseled horizontal jaw with sharp 90-degree mandibular angle.',
        forehead: 'Wide and squared, matching the exact width of the jawline.',
        cheekbones: 'Flush with temples and jaw, minimal tapering.',
        proportions: 'Length-to-width ratio is approx 1:1 — extremely commanding and masculine.'
      },
      hairCharacteristics: {
        texture: 'Type 1 Straight, thick hair shaft that tends to stick straight out when cut between 0.5 - 1.5 inches',
        textureGroup: 'Straight',
        density: 'Coarse / High Density',
        hairline: 'Squared temple line with crisp natural edges',
        currentLength: 'Short (2 inches on top, bulk on sides)',
        growthPattern: 'Strong vertical growth resistance; requires deliberate thinning and direction'
      },
      recommendations: [
        {
          id: 'rec-julian-1',
          name: 'High Skin Fade with Textured Crew Cut',
          matchScore: 99,
          vibe: 'Athletic / Military Chic',
          whyItWorks: 'Square faces are the gold standard for high skin fades. Removing side bulk highlights your chiseled jawline, while a textured top breaks up the angular forehead.',
          topLength: '1.25 to 1.75 inches, thinning shears to soften density',
          sidesAndBack: 'High skin fade blended right to the temporal transition line',
          fadeType: 'High Skin Fade',
          barberInstructions: {
            clipperGuards: '#0 skin up to #1.5 open, clipper-over-comb blend',
            scissorWork: 'Texturize dense straight hair heavily with 28-tooth thinning shears',
            templeAndNape: 'High skin razor finish, sharp C-cup line at temple',
            scriptForBarber: 'Take the sides down to a high skin fade, keeping the blend clean and tight. On top, leave 1.5 inches but debulk it thoroughly so it moves and doesn’t puff out, styled with a slight matte push-up.'
          },
          stylingDifficulty: 'Beginner (2 min)',
          maintenanceWeeks: '2-3 weeks',
          dailyRoutine: '1. Quick towel dry. 2. Work a pea-sized amount of high-hold matte clay from crown to front. 3. Push front upward slightly.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[0], // Matte clay
            SAMPLE_PRODUCTS[2]  // Texture powder
          ],
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-julian-2',
          name: 'Modern Textured Buzz Cut with Beard Fade',
          matchScore: 96,
          vibe: 'Athletic / Low Maintenance',
          whyItWorks: 'A defined buzz cut accentuates the chiseled jawline and cheekbones without needing daily styling effort.',
          topLength: '#3 or #4 guard on top with forward gradient',
          sidesAndBack: '#0 skin fade seamlessly transitioning into the beard line',
          fadeType: 'High Bald Fade & Beard Blend',
          barberInstructions: {
            clipperGuards: '#4 on top, #0 bald fade on sides, #1 fade down into beard',
            scissorWork: 'None required',
            templeAndNape: 'Sharp edge-up lineup along hairline and beard transition',
            scriptForBarber: 'I want a #4 buzz on top with a high bald fade on the sides, blended cleanly down into my beard with sharp front temple lineups.'
          },
          stylingDifficulty: 'Beginner (1 min)',
          maintenanceWeeks: '1.5-2 weeks',
          dailyRoutine: '1. Apply 3 drops of cedar conditioning oil to scalp and beard. 2. Done.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[5], // Beard & scalp oil
            SAMPLE_PRODUCTS[0]  // Matte clay (optional for light matte texture)
          ],
          imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-julian-3',
          name: 'Angular Slicked Undercut',
          matchScore: 92,
          vibe: 'Modern / Streetwear',
          whyItWorks: 'Vertical elevation on top visually lengthens a 1:1 square face ratio, creating balanced proportions.',
          topLength: '3.5 to 4.5 inches slicked back with volume',
          sidesAndBack: 'Disconnected high fade down to #0.5',
          fadeType: 'Disconnected Undercut Fade',
          barberInstructions: {
            clipperGuards: '#0.5 to #1.5 disconnected fade up to the parting ridge',
            scissorWork: 'Slide-cutting on top for back flow and weight reduction',
            templeAndNape: 'Clean razor edge-up',
            scriptForBarber: 'Give me a disconnected undercut with #1 on the sides, leaving 4 inches on top to slick back with textured flow.'
          },
          stylingDifficulty: 'Advanced (7-8 min)',
          maintenanceWeeks: '3 weeks',
          dailyRoutine: '1. Blow dry backward with heat and round brush. 2. Lock in place with water pomade or fiber.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[4], // Water pomade
            SAMPLE_PRODUCTS[1]  // Sea salt spray
          ],
          imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=70'
        }
      ],
      avoidStyles: [
        {
          styleName: 'Rounded Bowl Cut or Wide Fluffy Sides',
          reason: 'Adds horizontal bulk directly over temples, making your face look excessively boxy and heavy.'
        },
        {
          styleName: 'Flat Downward Bangs',
          reason: 'Shortens the visual length of your face and obscures your angular forehead line.'
        }
      ],
      expertTip: 'Coarse straight hair needs texturizing shears at every barber visit to prevent the bristles from poking out like needles as it grows.'
    }
  },
  {
    id: 'sample-david',
    name: 'David Osei',
    age: 26,
    faceShape: 'Round',
    hairTexture: 'Type 4A Coily / Afro Texture',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=70',
    description: 'Round face with soft curves and tight 4A coils capable of sculpted geometric silhouettes.',
    analysis: {
      faceShape: 'Round',
      faceShapeConfidence: 95,
      faceCharacteristics: {
        jawline: 'Soft curved jawline with full rounded cheeks and smooth chin contour.',
        forehead: 'Gently curved hairline with proportional temple width.',
        cheekbones: 'Widest part of face, full cheek pads.',
        proportions: 'Length and width are nearly equal with curved contours throughout.'
      },
      hairCharacteristics: {
        texture: 'Type 4A Coily / Kinky with dense S-spring coils and high shrinkage rate',
        textureGroup: 'Coily',
        density: 'High Density / Thick',
        hairline: 'Full rounded hairline with high adaptability to razor lineups',
        currentLength: 'Medium Coils (2.5 inches stretched)',
        growthPattern: 'Tight upward and outward spiral growth from scalp'
      },
      recommendations: [
        {
          id: 'rec-david-1',
          name: 'Mid Taper Fade with Sculpted Sponge Twists',
          matchScore: 98,
          vibe: 'Modern / Streetwear',
          whyItWorks: 'Adds structured vertical height on top while carving slim, sharp lines on the sides, visually transforming a round face into an elongated, chiseled shape.',
          topLength: '2 to 2.5 inches defined coils/twists',
          sidesAndBack: 'Mid temple taper fade and low neck taper with razor lineup',
          fadeType: 'Mid Temple & Nape Taper Fade',
          barberInstructions: {
            clipperGuards: '#0 to #1.5 mid taper at sideburns and nape',
            scissorWork: 'Shape top into a balanced contoured oval with freehand shear work',
            templeAndNape: 'Crisp razor edge lineup around the temples and neckline',
            scriptForBarber: 'I want a mid taper fade on the temples and neck with a sharp razor lineup all around. Keep the top at about 2.5 inches shaped for curl sponge twists.'
          },
          stylingDifficulty: 'Intermediate (4 min)',
          maintenanceWeeks: '2-3 weeks',
          dailyRoutine: '1. Mist hair with water and leave-in moisture. 2. Rub a quarter-sized scoop of curl cream between hands. 3. Use curl sponge in circular motions for 2 minutes.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[3], // Curl cream
            SAMPLE_PRODUCTS[5]  // Beard & scalp oil
          ],
          imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-david-2',
          name: 'High Drop Fade with Short Textured Crop Curls',
          matchScore: 95,
          vibe: 'Athletic / Clean Cut',
          whyItWorks: 'High skin fade removes all softness from the cheek area, instantly framing your eyes and creating chiseled masculine lines.',
          topLength: '1 to 1.5 inches shaped coils',
          sidesAndBack: 'High drop skin fade curving down behind the occipital',
          fadeType: 'High Drop Bald Fade',
          barberInstructions: {
            clipperGuards: '#0 bald fade into #1 blend, freehand shear top shape',
            scissorWork: 'Freehand clipper/shear shaping',
            templeAndNape: 'Laser-sharp geometric edge up',
            scriptForBarber: 'Give me a high drop bald fade with a crisp box lineup, keeping 1.5 inches of natural curl texture on top.'
          },
          stylingDifficulty: 'Beginner (2 min)',
          maintenanceWeeks: '2 weeks',
          dailyRoutine: '1. Light mist with hydration spray. 2. Work in a dime of curl cream. 3. Shake with fingers.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[3], // Curl cream
            SAMPLE_PRODUCTS[5]  // Beard oil
          ],
          imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=70'
        }
      ],
      avoidStyles: [
        {
          styleName: 'Spherical Afro Without Taper (Full Sides)',
          reason: 'A completely round hair silhouette reinforces round face dimensions, exaggerating cheek fullness.'
        }
      ],
      expertTip: 'Always request a mid or high taper. The contrast between tight skin at the temples and defined vertical coils on top creates an instant slimming effect.'
    }
  },
  {
    id: 'sample-leo',
    name: 'Leo Sterling',
    age: 34,
    faceShape: 'Diamond',
    hairTexture: 'Type 2A Fine Wavy / Mature Hairline',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=70',
    description: 'Prominent cheekbones with narrow forehead and pointed jawline.',
    analysis: {
      faceShape: 'Diamond',
      faceShapeConfidence: 94,
      faceCharacteristics: {
        jawline: 'Narrow and tapered down to a pointed chin line.',
        forehead: 'Narrower than cheekbones with subtle temple recession.',
        cheekbones: 'Wide and high — the most dominant facial feature.',
        proportions: 'Diamond geometric profile with dramatic cheekbone width.'
      },
      hairCharacteristics: {
        texture: 'Type 2A Fine Texture, soft wave with light natural body',
        textureGroup: 'Wavy',
        density: 'Fine - Medium',
        hairline: 'Mature recession at temples (Norwood 2 baseline)',
        currentLength: 'Medium (3.0 inches)',
        growthPattern: 'Natural backward flow on right, flatter at crown'
      },
      recommendations: [
        {
          id: 'rec-leo-1',
          name: 'Textured Flow / Scissor Cut with Soft Temple Weight',
          matchScore: 97,
          vibe: 'Classic Gentleman',
          whyItWorks: 'Leaving slightly more hair and weight around the temples fills in the narrow forehead, balancing the wide cheekbones and softening the pointed chin.',
          topLength: '3.5 to 4.5 inches with soft point-cutting',
          sidesAndBack: 'Low scissor taper keeping 1-1.5 inches of length over the ears',
          fadeType: 'Soft Scissor Taper',
          barberInstructions: {
            clipperGuards: 'Shears only, do not go to skin on sides',
            scissorWork: 'Layered texture with weight left in parietal ridge to widen upper profile',
            templeAndNape: 'Soft natural neckline, no harsh razor box lineups',
            scriptForBarber: 'I want a scissor cut with soft textured flow. Please don’t take the sides too short with clippers—keep enough weight around the temples to balance my cheekbones.'
          },
          stylingDifficulty: 'Intermediate (3-4 min)',
          maintenanceWeeks: '4-6 weeks',
          dailyRoutine: '1. Apply 4 sprays of sea salt mist to damp hair. 2. Push hair back and to the side with fingers while air drying or light blow drying.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[1], // Sea salt spray
            SAMPLE_PRODUCTS[2]  // Texture powder
          ],
          imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=70'
        },
        {
          id: 'rec-leo-2',
          name: 'Textured French Crop with Forward Fringe',
          matchScore: 93,
          vibe: 'Modern / Streetwear',
          whyItWorks: 'The forward-swept fringe adds volume right where the forehead narrows, concealing mature recession naturally.',
          topLength: '2.0 to 2.5 inches forward-swept',
          sidesAndBack: 'Low taper fade from #1 to #2',
          fadeType: 'Low Taper Fade',
          barberInstructions: {
            clipperGuards: '#1 to #2 low taper fade only at the perimeter',
            scissorWork: 'Chipped forward fringe with soft choppy texture',
            templeAndNape: 'Tapered nape with soft edges',
            scriptForBarber: 'Give me a textured French crop with a low taper fade. Keep some weight around the upper sides, and texture the top so it sweeps forward casually.'
          },
          stylingDifficulty: 'Beginner (2 min)',
          maintenanceWeeks: '3-4 weeks',
          dailyRoutine: '1. Light towel dry. 2. Tap texture powder over roots. 3. Finger-style forward.',
          recommendedProducts: [
            SAMPLE_PRODUCTS[2], // Texture powder
            SAMPLE_PRODUCTS[0]  // Matte clay
          ],
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=70'
        }
      ],
      avoidStyles: [
        {
          styleName: 'High Skin Bald Fade with Buzz Top',
          reason: 'Skin on the sides exaggerates the width of the cheekbones and makes the narrow temples and jaw look pinched.'
        }
      ],
      expertTip: 'Diamond faces benefit immensely from scissor work and low tapers. Avoid skin fades high up on the temples to preserve structural width.'
    }
  }
];
