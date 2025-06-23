// Backend Service Implementation
// This file contains implementations for all backend features used in the app

import {
  Design,
  User,
  Project,
  AIAnalysis,
  NotificationData,
} from "@/types/api";

export class BackendService {
  private static instance: BackendService;
  private users: Map<string, User> = new Map();
  private designs: Map<string, Design> = new Map();
  private projects: Map<string, Project> = new Map();
  private currentUser: User | null = null;

  constructor() {
    this.initializeMockData();
  }

  static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  private initializeMockData() {
    // Mock users
    const users: User[] = [
      {
        id: "1",
        email: "sarah@example.com",
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b9a8daa3?w=100&h=100&fit=crop&crop=face",
        subscription: "pro",
        createdAt: new Date(),
        settings: {
          notifications: true,
          theme: "light",
          language: "en",
          autoSave: true,
        },
      },
      {
        id: "2",
        email: "mike@example.com",
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        subscription: "free",
        createdAt: new Date(),
        settings: {
          notifications: true,
          theme: "light",
          language: "en",
          autoSave: true,
        },
      },
    ];

    users.forEach((user) => this.users.set(user.id, user));

    // Mock designs
    const designs: Design[] = [
      {
        id: "1",
        title: "Modern Living Room",
        description:
          "A beautiful modern living space with clean lines and neutral colors",
        imageUrl:
          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
        userId: "1",
        userName: "Sarah Johnson",
        userAvatar: users[0].avatar,
        style: "Contemporary",
        roomType: "living_room",
        tags: ["Modern", "Minimalist", "Neutral", "Living Room"],
        likes: 432,
        views: 2847,
        isPublic: true,
        isLiked: false,
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        updatedAt: new Date(),
        assets: [
          {
            id: "1",
            type: "furniture",
            name: "Modern Sectional Sofa",
            brand: "West Elm",
            price: 1299,
            imageUrl:
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200",
            position: { x: 100, y: 200 },
          },
          {
            id: "2",
            type: "decor",
            name: "Abstract Wall Art",
            price: 89,
            imageUrl:
              "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200",
            position: { x: 300, y: 50 },
          },
        ],
      },
      {
        id: "2",
        title: "Elegant Kitchen Design",
        description:
          "A stunning kitchen with premium finishes and modern appliances",
        imageUrl:
          "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
        userId: "2",
        userName: "Mike Chen",
        userAvatar: users[1].avatar,
        style: "Modern",
        roomType: "kitchen",
        tags: ["Kitchen", "White", "Elegant", "Modern"],
        likes: 387,
        views: 1923,
        isPublic: true,
        isLiked: false,
        createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
        updatedAt: new Date(),
        assets: [],
      },
      {
        id: "3",
        title: "Cozy Bedroom Retreat",
        description: "A peaceful bedroom sanctuary with natural elements",
        imageUrl:
          "https://images.pexels.com/photos/30217028/pexels-photo-30217028.jpeg",
        userId: "1",
        userName: "Sarah Johnson",
        userAvatar: users[0].avatar,
        style: "Scandinavian",
        roomType: "bedroom",
        tags: ["Bedroom", "Cozy", "Natural", "Scandinavian"],
        likes: 521,
        views: 3156,
        isPublic: true,
        isLiked: false,
        createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
        updatedAt: new Date(),
        assets: [],
      },
    ];

    designs.forEach((design) => this.designs.set(design.id, design));
  }

  // Authentication
  async login(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    await this.delay(1000); // Simulate network delay

    const user = Array.from(this.users.values()).find((u) => u.email === email);
    if (!user || password !== "password123") {
      throw new Error("Invalid credentials");
    }

    this.currentUser = user;
    const token = this.generateToken(user.id);

    return { user, token };
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: User; token: string }> {
    await this.delay(1000);

    // Check if email already exists
    const existingUser = Array.from(this.users.values()).find(
      (u) => u.email === userData.email,
    );
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      subscription: "free",
      createdAt: new Date(),
      settings: {
        notifications: true,
        theme: "light",
        language: "en",
        autoSave: true,
      },
    };

    this.users.set(newUser.id, newUser);
    this.currentUser = newUser;
    const token = this.generateToken(newUser.id);

    return { user: newUser, token };
  }

  async getCurrentUser(): Promise<User> {
    await this.delay(500);
    if (!this.currentUser) {
      throw new Error("Not authenticated");
    }
    return this.currentUser;
  }

  // Designs
  async getDesigns(filters?: any): Promise<Design[]> {
    await this.delay(800);

    let designs = Array.from(this.designs.values()).filter((d) => d.isPublic);

    // Apply filters
    if (filters?.roomType) {
      designs = designs.filter((d) => d.roomType === filters.roomType);
    }
    if (filters?.style) {
      designs = designs.filter((d) =>
        d.style.toLowerCase().includes(filters.style.toLowerCase()),
      );
    }
    if (filters?.userId) {
      designs = designs.filter((d) => d.userId === filters.userId);
    }

    // Apply sorting
    switch (filters?.sortBy) {
      case "popular":
        designs.sort((a, b) => b.views - a.views);
        break;
      case "likes":
        designs.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
      default:
        designs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return designs;
  }

  async searchDesigns(query: string, filters?: any): Promise<Design[]> {
    await this.delay(600);

    const designs = await this.getDesigns(filters);
    const lowerQuery = query.toLowerCase();

    return designs.filter(
      (design) =>
        design.title.toLowerCase().includes(lowerQuery) ||
        design.description.toLowerCase().includes(lowerQuery) ||
        design.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        design.style.toLowerCase().includes(lowerQuery),
    );
  }

  async likeDesign(
    designId: string,
  ): Promise<{ liked: boolean; likesCount: number }> {
    await this.delay(400);

    const design = this.designs.get(designId);
    if (!design) {
      throw new Error("Design not found");
    }

    // Toggle like status
    design.isLiked = !design.isLiked;
    design.likes += design.isLiked ? 1 : -1;

    this.designs.set(designId, design);

    return {
      liked: design.isLiked,
      likesCount: design.likes,
    };
  }

  async shareDesign(
    designId: string,
    platform: string,
  ): Promise<{ shareUrl: string }> {
    await this.delay(300);

    const design = this.designs.get(designId);
    if (!design) {
      throw new Error("Design not found");
    }

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/designs/${designId}`;

    // Increment views
    design.views += 1;
    this.designs.set(designId, design);

    return { shareUrl };
  }

  // AI Services
  async analyzeImage(imageFile: File): Promise<AIAnalysis> {
    await this.delay(2000); // Simulate AI processing time

    // Simulate AI analysis results
    const styles = [
      "Modern",
      "Contemporary",
      "Scandinavian",
      "Industrial",
      "Bohemian",
    ];
    const roomTypes = [
      "Living Room",
      "Kitchen",
      "Bedroom",
      "Bathroom",
      "Office",
    ];
    const moods = [
      "Calm and Serene",
      "Energetic",
      "Cozy",
      "Elegant",
      "Minimalist",
    ];

    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomRoomType =
      roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const analysis: AIAnalysis = {
      id: Date.now().toString(),
      imageUrl: URL.createObjectURL(imageFile),
      confidence: 85 + Math.floor(Math.random() * 15), // 85-99% confidence
      detectedStyle: randomStyle,
      roomType: randomRoomType,
      lighting: "Natural",
      mood: randomMood,
      colorPalette: this.generateColorPalette(),
      processedAt: new Date(),
      suggestions: this.generateSuggestions(),
    };

    return analysis;
  }

  private generateColorPalette(): string[] {
    const palettes = [
      ["#F5F5F5", "#2C3E50", "#3498DB", "#E74C3C", "#F39C12"],
      ["#FFFFFF", "#1A1A1A", "#FF6B6B", "#4ECDC4", "#45B7D1"],
      ["#FFF8E7", "#8B4513", "#CD853F", "#DEB887", "#F4A460"],
      ["#F0F8FF", "#191970", "#4169E1", "#87CEEB", "#B0C4DE"],
    ];

    return palettes[Math.floor(Math.random() * palettes.length)];
  }

  private generateSuggestions(): any[] {
    const suggestionTypes = [
      {
        type: "style" as const,
        title: "Enhance Modern Aesthetic",
        description:
          "Add clean lines and geometric shapes to strengthen the modern style",
        confidence: 92,
        priority: "high" as const,
      },
      {
        type: "lighting" as const,
        title: "Improve Lighting Setup",
        description: "Consider adding ambient lighting for better mood setting",
        confidence: 88,
        priority: "medium" as const,
      },
      {
        type: "color" as const,
        title: "Color Balance Adjustment",
        description: "Introduce accent colors to create visual interest",
        confidence: 85,
        priority: "medium" as const,
      },
      {
        type: "furniture" as const,
        title: "Furniture Arrangement",
        description: "Optimize furniture placement for better flow",
        confidence: 90,
        priority: "high" as const,
      },
      {
        type: "decor" as const,
        title: "Add Natural Elements",
        description: "Plants or natural textures would add warmth",
        confidence: 82,
        priority: "low" as const,
      },
    ];

    // Return 3-4 random suggestions
    const shuffled = suggestionTypes.sort(() => 0.5 - Math.random());
    return shuffled
      .slice(0, 3 + Math.floor(Math.random() * 2))
      .map((suggestion, index) => ({
        ...suggestion,
        id: (index + 1).toString(),
      }));
  }

  // File Upload
  async uploadFile(
    file: File,
    type: string = "design",
  ): Promise<{
    url: string;
    thumbnailUrl?: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }> {
    await this.delay(1500); // Simulate upload time

    // In a real app, this would upload to a cloud service
    const url = URL.createObjectURL(file);

    return {
      url,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    };
  }

  // Notifications
  async getNotifications(): Promise<NotificationData[]> {
    await this.delay(500);

    const notifications: NotificationData[] = [
      {
        id: "1",
        type: "like",
        title: "Design Liked",
        message: "Someone liked your 'Modern Living Room' design",
        isRead: false,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        id: "2",
        type: "ai_analysis",
        title: "AI Analysis Complete",
        message: "Your room analysis is ready with 5 new suggestions",
        isRead: false,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      },
      {
        id: "3",
        type: "collaboration",
        title: "Project Invitation",
        message: "You've been invited to collaborate on 'Dream Kitchen'",
        isRead: true,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
    ];

    return notifications;
  }

  // Utility methods
  private generateToken(userId: string): string {
    return `token_${userId}_${Date.now()}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Real-time features (would use WebSockets in production)
  async subscribeToRealTimeUpdates(
    callback: (update: any) => void,
  ): Promise<void> {
    // Simulate real-time updates
    setInterval(() => {
      if (Math.random() > 0.9) {
        // 10% chance every interval
        callback({
          type: "new_design",
          data: {
            message: "New design uploaded by Sarah Johnson",
            timestamp: new Date(),
          },
        });
      }
    }, 10000); // Check every 10 seconds
  }

  // Analytics
  async getDesignStats(designId: string): Promise<any> {
    await this.delay(400);

    return {
      views: Math.floor(Math.random() * 1000) + 100,
      likes: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 20) + 1,
      comments: Math.floor(Math.random() * 15) + 1,
      viewsThisWeek: Math.floor(Math.random() * 100) + 20,
      engagement: (Math.random() * 15 + 5).toFixed(1) + "%",
    };
  }

  async getTrends(): Promise<any> {
    await this.delay(600);

    return {
      popularStyles: [
        { name: "Modern", growth: "+15%" },
        { name: "Scandinavian", growth: "+12%" },
        { name: "Industrial", growth: "+8%" },
      ],
      trendingColors: ["#2C3E50", "#E74C3C", "#3498DB"],
      hotKeywords: ["minimalist", "cozy", "sustainable", "smart home"],
      growingCategories: [
        { name: "Home Office", growth: "+45%" },
        { name: "Outdoor Spaces", growth: "+32%" },
        { name: "Small Spaces", growth: "+28%" },
      ],
    };
  }
}

// Export singleton instance
export const backendService = BackendService.getInstance();
