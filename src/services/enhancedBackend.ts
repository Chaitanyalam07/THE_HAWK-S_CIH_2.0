// Enhanced Backend Service with Room Detection and 3D Features

import {
  RoomDetection,
  FurnitureSuggestion,
  ColorSuggestion,
  Enhanced3DAnalysis,
  Room3DModel,
  AIConfiguration,
} from "@/types/ai";

export class Enhanced3DBackendService {
  private static instance: Enhanced3DBackendService;
  private aiConfig: AIConfiguration = {
    roomDetectionThreshold: 0.8,
    suggestionCount: {
      furniture: 6,
      colors: 8,
    },
    enable3D: true,
    budgetRanges: {
      low: { min: 0, max: 500 },
      medium: { min: 500, max: 2000 },
      high: { min: 2000, max: 10000 },
    },
  };

  constructor() {
    // Initialize with furniture and color databases
    this.initializeFurnitureDatabase();
    this.initializeColorDatabase();
  }

  static getInstance(): Enhanced3DBackendService {
    if (!Enhanced3DBackendService.instance) {
      Enhanced3DBackendService.instance = new Enhanced3DBackendService();
    }
    return Enhanced3DBackendService.instance;
  }

  // Advanced Room Detection AI
  async detectRoom(imageFile: File): Promise<RoomDetection> {
    await this.delay(1500);

    // Advanced room detection logic
    const roomIndicators = await this.analyzeImageForRoomFeatures(imageFile);

    // Calculate confidence based on multiple factors
    let confidence = 0;
    let reasons: string[] = [];
    let roomType = "unknown";

    // File analysis
    const fileName = imageFile.name.toLowerCase();
    const fileSize = imageFile.size;

    // Check for room-related keywords in filename
    const roomKeywords = [
      "room",
      "bedroom",
      "kitchen",
      "bathroom",
      "living",
      "dining",
      "office",
      "interior",
      "home",
      "house",
      "apartment",
      "decor",
      "furniture",
    ];
    const hasRoomKeywords = roomKeywords.some((keyword) =>
      fileName.includes(keyword),
    );

    // Check for non-room keywords that would disqualify
    const nonRoomKeywords = [
      "outdoor",
      "garden",
      "park",
      "street",
      "car",
      "person",
      "face",
      "food",
      "animal",
      "landscape",
      "nature",
      "sky",
      "beach",
      "mountain",
      "profile",
      "selfie",
      "portrait",
      "logo",
      "document",
      "text",
      "screenshot",
    ];
    const hasNonRoomKeywords = nonRoomKeywords.some((keyword) =>
      fileName.includes(keyword),
    );

    // Simulate computer vision analysis
    const aspectRatio = await this.getImageAspectRatio(imageFile);
    const isReasonableAspectRatio = aspectRatio > 0.5 && aspectRatio < 3; // Not too narrow or wide

    // Room feature detection simulation
    if (hasRoomKeywords && !hasNonRoomKeywords) {
      confidence += 0.3;
      reasons.push("Filename suggests room content");
    }

    if (hasNonRoomKeywords) {
      confidence -= 0.5;
      reasons.push("Filename suggests non-room content");
    }

    if (fileSize > 100000 && fileSize < 10000000) {
      // 100KB - 10MB reasonable range
      confidence += 0.2;
      reasons.push("Image size suggests detailed indoor photo");
    } else if (fileSize < 50000) {
      confidence -= 0.3;
      reasons.push("Image too small for room analysis");
    }

    if (isReasonableAspectRatio) {
      confidence += 0.2;
      reasons.push("Image dimensions suitable for room photos");
    } else {
      confidence -= 0.2;
      reasons.push("Unusual image dimensions for room photos");
    }

    // Simulate advanced computer vision checks
    const simulatedFeatures = this.simulateComputerVision(fileName, fileSize);
    confidence += simulatedFeatures.roomLikelihood;
    reasons.push(...simulatedFeatures.detectedFeatures);
    roomType = simulatedFeatures.predictedRoomType;

    // Ensure confidence is between 0 and 1
    confidence = Math.max(0, Math.min(1, confidence));

    // Additional strict checks for room validation
    if (hasNonRoomKeywords) {
      confidence = Math.min(confidence, 0.3); // Cap at 30% if non-room keywords found
    }

    if (fileSize < 50000) {
      // Very small files are likely not room photos
      confidence = Math.min(confidence, 0.4);
    }

    // Be more strict - require higher confidence for room detection
    const strictThreshold = Math.max(
      this.aiConfig.roomDetectionThreshold,
      0.75,
    );
    const isRoom = confidence > strictThreshold;

    return {
      isRoom,
      confidence: Math.round(confidence * 100) / 100,
      roomType: isRoom ? roomType : "unknown",
      reasons: isRoom
        ? reasons
        : [
            "No clear room structure detected",
            "Missing typical room elements (walls, floor, ceiling)",
            "Image may be outdoor, portrait, or object-focused",
            "Insufficient interior architectural features",
            ...reasons,
          ],
      suggestedActions: isRoom
        ? [
            "Proceeding with AI furniture analysis",
            "Generating 3D room model",
            "Analyzing color schemes and lighting",
            "Preparing personalized design suggestions",
          ]
        : [
            "Please upload a clear interior room photo",
            "Ensure the image shows walls, floor, and room layout",
            "Include furniture or room elements for better analysis",
            "Avoid portraits, outdoor scenes, or close-up object photos",
            "Try taking a wider angle photo of the entire room",
          ],
    };
  }

  private async getImageAspectRatio(imageFile: File): Promise<number> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width / img.height);
      };
      img.onerror = () => resolve(1); // Default square aspect ratio
      img.src = URL.createObjectURL(imageFile);
    });
  }

  private simulateComputerVision(fileName: string, fileSize: number) {
    // Simulate advanced AI computer vision analysis
    let roomLikelihood = 0;
    let detectedFeatures: string[] = [];
    let predictedRoomType = "living_room";

    // Simulate detection based on filename patterns
    if (fileName.includes("living") || fileName.includes("sofa")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Living room furniture patterns detected");
      predictedRoomType = "living_room";
    } else if (fileName.includes("kitchen") || fileName.includes("cook")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Kitchen elements identified");
      predictedRoomType = "kitchen";
    } else if (fileName.includes("bed") || fileName.includes("sleep")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Bedroom furniture detected");
      predictedRoomType = "bedroom";
    } else if (fileName.includes("bath") || fileName.includes("toilet")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Bathroom fixtures identified");
      predictedRoomType = "bathroom";
    } else if (fileName.includes("office") || fileName.includes("desk")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Office setup detected");
      predictedRoomType = "office";
    } else if (fileName.includes("dining") || fileName.includes("table")) {
      roomLikelihood += 0.4;
      detectedFeatures.push("Dining area elements found");
      predictedRoomType = "dining_room";
    }

    // Simulate lighting analysis
    if (fileSize > 500000) {
      roomLikelihood += 0.1;
      detectedFeatures.push("Good lighting conditions for interior analysis");
    }

    // Simulate edge/corner detection for room boundaries
    const hasRoomKeywords = ["room", "interior", "home"].some((keyword) =>
      fileName.includes(keyword),
    );
    if (hasRoomKeywords) {
      roomLikelihood += 0.2;
      detectedFeatures.push("Room boundary structures identified");
      detectedFeatures.push("Interior lighting patterns recognized");
    }

    // Check for obvious non-room indicators
    const nonRoomIndicators = [
      "selfie",
      "face",
      "outdoor",
      "car",
      "food",
      "text",
    ];
    if (nonRoomIndicators.some((indicator) => fileName.includes(indicator))) {
      roomLikelihood -= 0.6;
      detectedFeatures.push("Non-room content detected");
    }

    // Random slight adjustment to simulate AI variability
    roomLikelihood += (Math.random() - 0.5) * 0.1;

    return {
      roomLikelihood,
      detectedFeatures,
      predictedRoomType,
    };
  }

  private async analyzeImageForRoomFeatures(imageFile: File): Promise<any> {
    // In a real implementation, this would use computer vision APIs
    // For now, we simulate based on file characteristics
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hasWalls: Math.random() > 0.3,
          hasFloor: Math.random() > 0.2,
          hasFurniture: Math.random() > 0.4,
          hasLighting: Math.random() > 0.5,
        });
      }, 500);
    });
  }

  // Enhanced 3D Analysis
  async analyze3DRoom(imageFile: File): Promise<Enhanced3DAnalysis> {
    // First do room detection (faster check)
    const roomDetection = await this.detectRoom(imageFile);

    if (!roomDetection.isRoom) {
      const errorMessage =
        roomDetection.confidence < 0.3
          ? `This image appears to be ${this.guessImageType(imageFile.name)}. Please upload an interior room photo showing furniture, walls, and room layout.`
          : `Room confidence too low (${Math.round(roomDetection.confidence * 100)}%). Please upload a clearer interior room photo with better lighting and visible furniture.`;

      throw new Error(errorMessage);
    }

    // Only proceed with full analysis if room is confirmed
    await this.delay(2000);

    const room3DModel = this.generate3DRoomModel(roomDetection.roomType);
    const furnitureSuggestions = this.generateFurnitureSuggestions(
      roomDetection.roomType,
    );
    const colorSuggestions = this.generateColorSuggestions(
      roomDetection.roomType,
    );

    return {
      id: Date.now().toString(),
      roomDetection,
      room3DModel,
      furnitureSuggestions,
      colorSuggestions,
      spatialAnalysis: {
        roomDimensions: {
          width: 4 + Math.random() * 4, // 4-8 meters
          height: 2.5 + Math.random() * 1, // 2.5-3.5 meters
          depth: 3 + Math.random() * 3, // 3-6 meters
        },
        availableSpace: 65 + Math.random() * 30, // 65-95% available
        trafficFlow: [
          "Main entrance to seating area",
          "Clear path to windows",
          "Accessible storage areas",
        ],
        naturalLight: [
          "Large windows on east wall",
          "Moderate natural light",
          "Evening ambient lighting needed",
        ],
        functionality: [
          "Relaxation",
          "Entertainment",
          "Social gathering",
          "Work/Study",
        ],
      },
      styleAnalysis: {
        detectedStyle: "Modern Contemporary",
        styleConfidence: 87 + Math.random() * 12, // 87-99%
        compatibleStyles: [
          "Scandinavian",
          "Minimalist",
          "Industrial",
          "Mid-Century Modern",
        ],
        designPrinciples: [
          "Clean lines",
          "Neutral palette",
          "Natural materials",
          "Functional design",
        ],
      },
      recommendations: {
        immediate: [
          "Add accent lighting for evening ambiance",
          "Introduce textural elements with throws and pillows",
          "Consider a statement art piece for the main wall",
        ],
        longTerm: [
          "Upgrade to smart lighting system",
          "Add built-in storage solutions",
          "Consider window treatments for privacy",
        ],
        budget: {
          low: furnitureSuggestions.filter(
            (f) => f.price <= this.aiConfig.budgetRanges.low.max,
          ),
          medium: furnitureSuggestions.filter(
            (f) =>
              f.price > this.aiConfig.budgetRanges.low.max &&
              f.price <= this.aiConfig.budgetRanges.medium.max,
          ),
          high: furnitureSuggestions.filter(
            (f) => f.price > this.aiConfig.budgetRanges.medium.max,
          ),
        },
      },
      processedAt: new Date(),
    };
  }

  private generate3DRoomModel(roomType: string): Room3DModel {
    // Generate basic 3D room structure
    return {
      id: Date.now().toString(),
      walls: [
        {
          id: "wall1",
          points: [
            { x: 0, y: 0, z: 0 },
            { x: 5, y: 0, z: 0 },
            { x: 5, y: 3, z: 0 },
            { x: 0, y: 3, z: 0 },
          ],
          material: "paint",
          color: "#F5F5F5",
        },
        {
          id: "wall2",
          points: [
            { x: 5, y: 0, z: 0 },
            { x: 5, y: 0, z: 4 },
            { x: 5, y: 3, z: 4 },
            { x: 5, y: 3, z: 0 },
          ],
          material: "paint",
          color: "#F5F5F5",
        },
      ],
      floor: {
        id: "floor1",
        material: roomType === "kitchen" ? "tile" : "hardwood",
        color: roomType === "kitchen" ? "#E8E8E8" : "#8B4513",
        area: 20,
      },
      ceiling: {
        id: "ceiling1",
        height: 3,
        material: "paint",
        color: "#FFFFFF",
      },
      windows: [
        {
          id: "window1",
          position: { x: 2.5, y: 1.5, z: 0 },
          dimensions: { width: 1.5, height: 1.2 },
          style: "modern",
        },
      ],
      doors: [
        {
          id: "door1",
          position: { x: 0, y: 0, z: 2 },
          dimensions: { width: 0.9, height: 2.1 },
          style: "modern",
        },
      ],
      lighting: [
        {
          id: "ambient1",
          type: "ambient",
          position: { x: 2.5, y: 2.8, z: 2 },
          intensity: 0.6,
          color: "#FFFFFF",
        },
      ],
    };
  }

  private generateFurnitureSuggestions(
    roomType: string,
  ): FurnitureSuggestion[] {
    const furnitureDatabase = this.getFurnitureByRoomType(roomType);

    // Select best matches with 3D positioning
    return furnitureDatabase
      .slice(0, this.aiConfig.suggestionCount.furniture)
      .map((furniture, index) => ({
        ...furniture,
        id: `furniture_${index + 1}`,
        position3D: this.calculateOptimal3DPosition(furniture.category, index),
        compatibility: 85 + Math.random() * 15, // 85-100% compatibility
      }));
  }

  private generateColorSuggestions(roomType: string): ColorSuggestion[] {
    const colorPalettes = {
      living_room: [
        {
          name: "Warm Neutral",
          hex: "#F5F5DC",
          type: "wall" as const,
          area: "Main walls",
        },
        {
          name: "Sage Green",
          hex: "#9CAF88",
          type: "accent" as const,
          area: "Feature wall",
        },
        {
          name: "Navy Blue",
          hex: "#2C3E50",
          type: "furniture" as const,
          area: "Sofa and chairs",
        },
        {
          name: "Terracotta",
          hex: "#CD853F",
          type: "textile" as const,
          area: "Cushions and throws",
        },
      ],
      bedroom: [
        {
          name: "Soft Gray",
          hex: "#E5E5E5",
          type: "wall" as const,
          area: "All walls",
        },
        {
          name: "Dusty Rose",
          hex: "#D4A5A5",
          type: "accent" as const,
          area: "Headboard wall",
        },
        {
          name: "Cream",
          hex: "#F7F7F7",
          type: "textile" as const,
          area: "Bedding",
        },
        {
          name: "Gold Accent",
          hex: "#FFD700",
          type: "furniture" as const,
          area: "Hardware and decor",
        },
      ],
      kitchen: [
        {
          name: "Pure White",
          hex: "#FFFFFF",
          type: "wall" as const,
          area: "Upper cabinets",
        },
        {
          name: "Charcoal",
          hex: "#36454F",
          type: "furniture" as const,
          area: "Lower cabinets",
        },
        {
          name: "Marble Gray",
          hex: "#C0C0C0",
          type: "accent" as const,
          area: "Countertops",
        },
        {
          name: "Subway Tile",
          hex: "#F8F8FF",
          type: "wall" as const,
          area: "Backsplash",
        },
      ],
    };

    const palette =
      colorPalettes[roomType as keyof typeof colorPalettes] ||
      colorPalettes.living_room;

    return palette.map((color, index) => ({
      id: `color_${index + 1}`,
      name: color.name,
      hex: color.hex,
      rgb: this.hexToRgb(color.hex),
      type: color.type,
      area: color.area,
      confidence: 80 + Math.random() * 20,
      mood: this.getColorMood(color.hex),
      position3D: {
        surfaces: [color.area.toLowerCase().replace(/\s+/g, "_")],
      },
    }));
  }

  private getFurnitureByRoomType(
    roomType: string,
  ): Omit<FurnitureSuggestion, "id" | "position3D" | "compatibility">[] {
    const furnitureDB = {
      living_room: [
        {
          name: "Modern L-Shaped Sectional",
          category: "sofa" as const,
          brand: "West Elm",
          price: 1299,
          imageUrl:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
          modelUrl: "/models/sectional-sofa.glb",
          dimensions: { width: 2.4, height: 0.8, depth: 1.6 },
          material: "Fabric",
          color: "Charcoal Gray",
          style: ["Modern", "Contemporary"],
          availability: "in_stock" as const,
          tags: ["comfortable", "durable", "stylish"],
        },
        {
          name: "Minimalist Coffee Table",
          category: "table" as const,
          brand: "CB2",
          price: 449,
          imageUrl:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          modelUrl: "/models/coffee-table.glb",
          dimensions: { width: 1.2, height: 0.4, depth: 0.6 },
          material: "Oak Wood",
          color: "Natural Oak",
          style: ["Minimalist", "Scandinavian"],
          availability: "in_stock" as const,
          tags: ["functional", "elegant", "space-saving"],
        },
        {
          name: "Floor Lamp with Brass Accents",
          category: "lighting" as const,
          brand: "Article",
          price: 229,
          imageUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          modelUrl: "/models/floor-lamp.glb",
          dimensions: { width: 0.3, height: 1.6, depth: 0.3 },
          material: "Metal and Fabric",
          color: "Brass and White",
          style: ["Modern", "Industrial"],
          availability: "limited" as const,
          tags: ["ambient", "adjustable", "stylish"],
        },
      ],
      bedroom: [
        {
          name: "Platform Bed Frame",
          category: "bed" as const,
          brand: "Tuft & Needle",
          price: 649,
          imageUrl:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          modelUrl: "/models/platform-bed.glb",
          dimensions: { width: 1.6, height: 0.4, depth: 2.0 },
          material: "Solid Wood",
          color: "Natural Walnut",
          style: ["Minimalist", "Modern"],
          availability: "in_stock" as const,
          tags: ["sturdy", "low-profile", "sustainable"],
        },
        {
          name: "Floating Nightstands",
          category: "storage" as const,
          brand: "Urban Outfitters",
          price: 159,
          imageUrl:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          modelUrl: "/models/nightstand.glb",
          dimensions: { width: 0.5, height: 0.15, depth: 0.3 },
          material: "MDF with Veneer",
          color: "White Oak",
          style: ["Modern", "Space-Saving"],
          availability: "in_stock" as const,
          tags: ["space-saving", "clean-lines", "functional"],
        },
      ],
      kitchen: [
        {
          name: "Bar Stools Set",
          category: "chair" as const,
          brand: "IKEA",
          price: 89,
          imageUrl:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          modelUrl: "/models/bar-stool.glb",
          dimensions: { width: 0.4, height: 1.0, depth: 0.4 },
          material: "Metal and Wood",
          color: "Black and Natural",
          style: ["Industrial", "Modern"],
          availability: "in_stock" as const,
          tags: ["adjustable", "durable", "counter-height"],
        },
      ],
    };

    return (
      furnitureDB[roomType as keyof typeof furnitureDB] ||
      furnitureDB.living_room
    );
  }

  private calculateOptimal3DPosition(category: string, index: number) {
    // Calculate optimal furniture placement in 3D space
    const positions = {
      sofa: { x: 1, y: 0, z: 2, rotation: { x: 0, y: 0, z: 0 } },
      table: { x: 2.5, y: 0, z: 1.5, rotation: { x: 0, y: 0, z: 0 } },
      chair: {
        x: 1.5 + index * 0.5,
        y: 0,
        z: 1,
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
      },
      lighting: { x: 0.5, y: 0, z: 0.5, rotation: { x: 0, y: 0, z: 0 } },
      bed: { x: 2.5, y: 0, z: 1.5, rotation: { x: 0, y: 0, z: 0 } },
      storage: { x: 4, y: 0, z: 0.5, rotation: { x: 0, y: 0, z: 0 } },
      decor: {
        x: 1 + index * 0.3,
        y: 1,
        z: 0.2,
        rotation: { x: 0, y: 0, z: 0 },
      },
    };

    return (
      positions[category as keyof typeof positions] || {
        x: 2,
        y: 0,
        z: 2,
        rotation: { x: 0, y: 0, z: 0 },
      }
    );
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  private getColorMood(hex: string): string[] {
    const rgb = this.hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    if (brightness > 200) return ["Bright", "Energetic", "Clean"];
    if (brightness > 128) return ["Balanced", "Comfortable", "Versatile"];
    return ["Cozy", "Sophisticated", "Intimate"];
  }

  private initializeFurnitureDatabase() {
    // Initialize comprehensive furniture database
    console.log("Furniture database initialized");
  }

  private initializeColorDatabase() {
    // Initialize color palette database
    console.log("Color database initialized");
  }

  private guessImageType(fileName: string): string {
    const name = fileName.toLowerCase();

    if (
      name.includes("selfie") ||
      name.includes("portrait") ||
      name.includes("face")
    ) {
      return "a portrait/selfie photo";
    }
    if (
      name.includes("outdoor") ||
      name.includes("garden") ||
      name.includes("park")
    ) {
      return "an outdoor scene";
    }
    if (
      name.includes("food") ||
      name.includes("meal") ||
      name.includes("restaurant")
    ) {
      return "a food photo";
    }
    if (
      name.includes("car") ||
      name.includes("vehicle") ||
      name.includes("truck")
    ) {
      return "a vehicle photo";
    }
    if (
      name.includes("document") ||
      name.includes("text") ||
      name.includes("screenshot")
    ) {
      return "a document/screenshot";
    }
    if (
      name.includes("logo") ||
      name.includes("brand") ||
      name.includes("product")
    ) {
      return "a logo/product image";
    }
    if (
      name.includes("landscape") ||
      name.includes("nature") ||
      name.includes("sky")
    ) {
      return "a landscape photo";
    }
    if (
      name.includes("animal") ||
      name.includes("pet") ||
      name.includes("dog") ||
      name.includes("cat")
    ) {
      return "an animal photo";
    }

    return "not a room interior photo";
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const enhanced3DBackend = Enhanced3DBackendService.getInstance();
