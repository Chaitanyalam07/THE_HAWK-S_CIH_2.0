// API Types and Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: "free" | "pro" | "enterprise";
  createdAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  theme: "light" | "dark";
  language: string;
  autoSave: boolean;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  style: string;
  roomType: string;
  tags: string[];
  likes: number;
  views: number;
  isPublic: boolean;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
  aiAnalysis?: AIAnalysis;
  assets: DesignAsset[];
}

export interface DesignAsset {
  id: string;
  type: "furniture" | "decor" | "color" | "material";
  name: string;
  brand?: string;
  price?: number;
  url?: string;
  imageUrl: string;
  position?: { x: number; y: number; z?: number };
}

export interface AIAnalysis {
  id: string;
  imageUrl: string;
  confidence: number;
  detectedStyle: string;
  suggestions: AISuggestion[];
  colorPalette: string[];
  roomType: string;
  lighting: string;
  mood: string;
  processedAt: Date;
}

export interface AISuggestion {
  id: string;
  type: "style" | "color" | "furniture" | "lighting" | "layout" | "decor";
  title: string;
  description: string;
  confidence: number;
  priority: "high" | "medium" | "low";
  assets?: DesignAsset[];
  beforeImage?: string;
  afterImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  designs: Design[];
  collaborators: ProjectCollaborator[];
  status: "draft" | "in_progress" | "completed" | "archived";
  budget?: number;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCollaborator {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: "owner" | "editor" | "viewer";
  invitedAt: Date;
  acceptedAt?: Date;
}

export interface SearchFilters {
  roomType?: string;
  style?: string;
  priceRange?: { min: number; max: number };
  tags?: string[];
  sortBy?: "newest" | "popular" | "trending" | "likes";
  userId?: string;
  page?: number;
  limit?: number;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FileUploadResponse {
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface NotificationData {
  id: string;
  type: "like" | "comment" | "follow" | "collaboration" | "ai_analysis";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}
