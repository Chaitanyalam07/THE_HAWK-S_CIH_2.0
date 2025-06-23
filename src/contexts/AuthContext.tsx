import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/api";
import apiService from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const response = await apiService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          localStorage.removeItem("auth_token");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiService.login(email, password);

      if (response.success && response.data) {
        setUser(response.data.user);
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: response.error || "Invalid credentials",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiService.register(userData);

      if (response.success && response.data) {
        setUser(response.data.user);
        toast({
          title: "Account created!",
          description: "Welcome to DesignHub. Start creating amazing designs!",
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: response.error || "Failed to create account",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "An unexpected error occurred",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    setUser({ ...user, ...userData });
    // In a real app, you'd also send this to the server
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
