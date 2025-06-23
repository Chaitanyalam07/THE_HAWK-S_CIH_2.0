import {
  User,
  Design,
  AIAnalysis,
  Project,
  SearchFilters,
  APIResponse,
  FileUploadResponse,
  NotificationData,
} from "@/types/api";
import { backendService } from "./backend";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const AI_SERVICE_URL =
  import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:3002";

// For development, we'll use the mock backend service
const USE_MOCK_BACKEND = !import.meta.env.PROD || !import.meta.env.VITE_API_URL;

class APIService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<APIResponse<T>> {
    // Use mock backend for development or when real API is not available
    if (USE_MOCK_BACKEND) {
      return this.mockRequest<T>(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      // Fallback to mock backend if real API fails
      return this.mockRequest<T>(endpoint, options);
    }
  }

  private async mockRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<APIResponse<T>> {
    try {
      // Route to appropriate mock backend method based on endpoint
      const method = options.method?.toUpperCase() || "GET";
      const path = endpoint.replace(/^\//, "");

      if (path === "designs" && method === "GET") {
        const data = await backendService.getDesigns();
        return { data: data as T, success: true };
      }

      if (
        path.startsWith("designs/") &&
        path.endsWith("/like") &&
        method === "POST"
      ) {
        const designId = path.split("/")[1];
        const data = await backendService.likeDesign(designId);
        return { data: data as T, success: true };
      }

      if (path.startsWith("search/designs") && method === "GET") {
        const url = new URL(`http://localhost${endpoint}`);
        const query = url.searchParams.get("q") || "";
        const data = await backendService.searchDesigns(query);
        return { data: data as T, success: true };
      }

      if (path === "auth/login" && method === "POST") {
        const body = JSON.parse(options.body as string);
        const data = await backendService.login(body.email, body.password);
        return { data: data as T, success: true };
      }

      if (path === "auth/register" && method === "POST") {
        const body = JSON.parse(options.body as string);
        const data = await backendService.register(body);
        return { data: data as T, success: true };
      }

      if (path === "auth/me" && method === "GET") {
        const data = await backendService.getCurrentUser();
        return { data: data as T, success: true };
      }

      if (path === "notifications" && method === "GET") {
        const data = await backendService.getNotifications();
        return { data: data as T, success: true };
      }

      // Default fallback
      return {
        data: null as T,
        success: false,
        error: `Mock endpoint not implemented: ${method} ${path}`,
      };
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : "Mock API error",
      };
    }
  }

  // Authentication
  async login(
    email: string,
    password: string,
  ): Promise<APIResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );

    if (response.success && response.data) {
      this.token = response.data.token;
      localStorage.setItem("auth_token", this.token);
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<APIResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
    );

    if (response.success && response.data) {
      this.token = response.data.token;
      localStorage.setItem("auth_token", this.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem("auth_token");
    await this.request("/auth/logout", { method: "POST" });
  }

  async getCurrentUser(): Promise<APIResponse<User>> {
    return this.request<User>("/auth/me");
  }

  // Designs
  async getDesigns(filters?: SearchFilters): Promise<APIResponse<Design[]>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(
            key,
            Array.isArray(value) ? value.join(",") : String(value),
          );
        }
      });
    }

    return this.request<Design[]>(`/designs?${queryParams.toString()}`);
  }

  async getDesign(id: string): Promise<APIResponse<Design>> {
    return this.request<Design>(`/designs/${id}`);
  }

  async createDesign(
    designData: Partial<Design>,
  ): Promise<APIResponse<Design>> {
    return this.request<Design>("/designs", {
      method: "POST",
      body: JSON.stringify(designData),
    });
  }

  async updateDesign(
    id: string,
    designData: Partial<Design>,
  ): Promise<APIResponse<Design>> {
    return this.request<Design>(`/designs/${id}`, {
      method: "PUT",
      body: JSON.stringify(designData),
    });
  }

  async deleteDesign(id: string): Promise<APIResponse<void>> {
    return this.request<void>(`/designs/${id}`, {
      method: "DELETE",
    });
  }

  async likeDesign(
    id: string,
  ): Promise<APIResponse<{ liked: boolean; likesCount: number }>> {
    return this.request<{ liked: boolean; likesCount: number }>(
      `/designs/${id}/like`,
      {
        method: "POST",
      },
    );
  }

  async shareDesign(
    id: string,
    platform: string,
  ): Promise<APIResponse<{ shareUrl: string }>> {
    return this.request<{ shareUrl: string }>(`/designs/${id}/share`, {
      method: "POST",
      body: JSON.stringify({ platform }),
    });
  }

  // AI Services
  async analyzeImage(imageFile: File): Promise<APIResponse<AIAnalysis>> {
    if (USE_MOCK_BACKEND) {
      try {
        const data = await backendService.analyzeImage(imageFile);
        return { data, success: true };
      } catch (error) {
        return {
          data: null as AIAnalysis,
          success: false,
          error: error instanceof Error ? error.message : "Analysis failed",
        };
      }
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${AI_SERVICE_URL}/analyze`, {
        method: "POST",
        headers: {
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
        },
        body: formData,
      });

      return await response.json();
    } catch (error) {
      // Fallback to mock backend
      const data = await backendService.analyzeImage(imageFile);
      return { data, success: true };
    }
  }

  async generateDesignSuggestions(
    prompt: string,
    imageUrl?: string,
  ): Promise<APIResponse<AIAnalysis>> {
    return this.request<AIAnalysis>("/ai/generate-suggestions", {
      method: "POST",
      body: JSON.stringify({ prompt, imageUrl }),
    });
  }

  async generateColorPalette(imageUrl: string): Promise<APIResponse<string[]>> {
    return this.request<string[]>("/ai/color-palette", {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
    });
  }

  async enhanceImage(
    imageUrl: string,
    style: string,
  ): Promise<APIResponse<{ enhancedUrl: string }>> {
    return this.request<{ enhancedUrl: string }>("/ai/enhance-image", {
      method: "POST",
      body: JSON.stringify({ imageUrl, style }),
    });
  }

  // File Upload
  async uploadFile(
    file: File,
    type: "design" | "avatar" | "asset" = "design",
  ): Promise<APIResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return fetch(`${this.baseURL}/upload`, {
      method: "POST",
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    }).then((res) => res.json());
  }

  // Projects
  async getProjects(): Promise<APIResponse<Project[]>> {
    return this.request<Project[]>("/projects");
  }

  async createProject(
    projectData: Partial<Project>,
  ): Promise<APIResponse<Project>> {
    return this.request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  }

  async inviteCollaborator(
    projectId: string,
    email: string,
    role: string,
  ): Promise<APIResponse<void>> {
    return this.request<void>(`/projects/${projectId}/invite`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  }

  // Search
  async searchDesigns(
    query: string,
    filters?: SearchFilters,
  ): Promise<APIResponse<Design[]>> {
    const params = new URLSearchParams({
      q: query,
      ...(filters &&
        Object.fromEntries(
          Object.entries(filters).map(([k, v]) => [k, String(v)]),
        )),
    });

    return this.request<Design[]>(`/search/designs?${params.toString()}`);
  }

  // Notifications
  async getNotifications(): Promise<APIResponse<NotificationData[]>> {
    return this.request<NotificationData[]>("/notifications");
  }

  async markNotificationRead(id: string): Promise<APIResponse<void>> {
    return this.request<void>(`/notifications/${id}/read`, {
      method: "PUT",
    });
  }

  // Trends and Analytics
  async getTrends(): Promise<APIResponse<any>> {
    return this.request("/analytics/trends");
  }

  async getDesignStats(designId: string): Promise<APIResponse<any>> {
    return this.request(`/analytics/designs/${designId}`);
  }
}

export const apiService = new APIService();
export default apiService;
