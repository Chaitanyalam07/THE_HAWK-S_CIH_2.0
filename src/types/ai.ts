// Enhanced AI Types for 3D and Room Detection

export interface RoomDetection {
  isRoom: boolean;
  confidence: number;
  roomType: string;
  reasons: string[];
  suggestedActions: string[];
}

export interface FurnitureSuggestion {
  id: string;
  name: string;
  category:
    | "sofa"
    | "chair"
    | "table"
    | "bed"
    | "storage"
    | "decor"
    | "lighting";
  brand: string;
  price: number;
  imageUrl: string;
  modelUrl?: string; // 3D model file
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  position3D: {
    x: number;
    y: number;
    z: number;
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  };
  material: string;
  color: string;
  style: string[];
  compatibility: number; // How well it fits the room (0-100)
  availability: "in_stock" | "out_of_stock" | "limited";
  tags: string[];
}

export interface ColorSuggestion {
  id: string;
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  type: "wall" | "accent" | "furniture" | "textile" | "floor";
  area: string; // which part of room to apply
  confidence: number;
  mood: string[];
  position3D?: {
    surfaces: string[]; // which 3D surfaces to apply to
  };
}

export interface Room3DModel {
  id: string;
  walls: Wall3D[];
  floor: Floor3D;
  ceiling: Ceiling3D;
  windows: Window3D[];
  doors: Door3D[];
  lighting: Lighting3D[];
}

export interface Wall3D {
  id: string;
  points: { x: number; y: number; z: number }[];
  material: string;
  color: string;
  texture?: string;
}

export interface Floor3D {
  id: string;
  material: string;
  color: string;
  texture?: string;
  area: number;
}

export interface Ceiling3D {
  id: string;
  height: number;
  material: string;
  color: string;
  texture?: string;
}

export interface Window3D {
  id: string;
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number };
  style: string;
}

export interface Door3D {
  id: string;
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number };
  style: string;
}

export interface Lighting3D {
  id: string;
  type: "ambient" | "point" | "directional" | "spot";
  position: { x: number; y: number; z: number };
  intensity: number;
  color: string;
}

export interface Enhanced3DAnalysis {
  id: string;
  roomDetection: RoomDetection;
  room3DModel: Room3DModel;
  furnitureSuggestions: FurnitureSuggestion[];
  colorSuggestions: ColorSuggestion[];
  spatialAnalysis: {
    roomDimensions: {
      width: number;
      height: number;
      depth: number;
    };
    availableSpace: number;
    trafficFlow: string[];
    naturalLight: string;
    functionality: string[];
  };
  styleAnalysis: {
    detectedStyle: string;
    styleConfidence: number;
    compatibleStyles: string[];
    designPrinciples: string[];
  };
  recommendations: {
    immediate: string[];
    longTerm: string[];
    budget: {
      low: FurnitureSuggestion[];
      medium: FurnitureSuggestion[];
      high: FurnitureSuggestion[];
    };
  };
  processedAt: Date;
}

export interface AIConfiguration {
  roomDetectionThreshold: number;
  suggestionCount: {
    furniture: number;
    colors: number;
  };
  enable3D: boolean;
  budgetRanges: {
    low: { min: number; max: number };
    medium: { min: number; max: number };
    high: { min: number; max: number };
  };
}
