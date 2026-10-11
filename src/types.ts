export type FaceShape = 'Oval' | 'Square' | 'Round' | 'Diamond' | 'Heart' | 'Oblong' | 'Triangle';
export type HairTextureGroup = 'Straight' | 'Wavy' | 'Curly' | 'Coily';
export type HairDensity = 'Fine' | 'Medium' | 'Thick / Coarse';

export interface FacialCharacteristics {
  jawline: string;
  forehead: string;
  cheekbones: string;
  proportions: string;
}

export interface HairCharacteristics {
  texture: string;
  textureGroup: HairTextureGroup;
  density: string;
  hairline: string;
  currentLength: string;
  growthPattern: string;
}

export interface StylingProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  purpose: string;
  holdLevel: string;
  shineLevel: string;
  howToApply: string;
  price: string;
  imageUrl: string;
  volume?: string;
  keyIngredients?: string;
}

export interface BarberInstructions {
  clipperGuards: string;
  scissorWork: string;
  templeAndNape: string;
  scriptForBarber: string;
}

export interface HaircutRecommendation {
  id: string;
  name: string;
  matchScore: number;
  vibe: string;
  whyItWorks: string;
  topLength: string;
  sidesAndBack: string;
  fadeType: string;
  barberInstructions: BarberInstructions;
  stylingDifficulty: string;
  maintenanceWeeks: string;
  dailyRoutine: string;
  recommendedProducts: StylingProduct[];
  imageUrl: string;
}

export interface AvoidStyle {
  styleName: string;
  reason: string;
}

export interface HairAnalysisResult {
  faceShape: FaceShape;
  faceShapeConfidence: number;
  faceCharacteristics: FacialCharacteristics;
  hairCharacteristics: HairCharacteristics;
  recommendations: HaircutRecommendation[];
  avoidStyles: AvoidStyle[];
  expertTip: string;
}

export interface SampleModel {
  id: string;
  name: string;
  age: number;
  faceShape: FaceShape;
  hairTexture: string;
  avatarUrl: string;
  description: string;
  analysis: HairAnalysisResult;
}
