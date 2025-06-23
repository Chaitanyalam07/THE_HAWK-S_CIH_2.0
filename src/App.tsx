import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AIStudio from "./pages/AIStudio";
import PhotoAnalysis from "./pages/PhotoAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-studio" element={<AIStudio />} />
            <Route path="/photo-analysis" element={<PhotoAnalysis />} />
            {/* Placeholder routes - will be implemented later */}
            <Route
              path="/3d-planner"
              element={<PlaceholderPage title="3D Room Planner" />}
            />
            <Route
              path="/style-matcher"
              element={<PlaceholderPage title="Style Matcher" />}
            />
            <Route
              path="/gallery"
              element={<PlaceholderPage title="Design Gallery" />}
            />
            <Route
              path="/colors"
              element={<PlaceholderPage title="Color Palette Generator" />}
            />
            <Route
              path="/placement"
              element={<PlaceholderPage title="Furniture Placement" />}
            />
            <Route
              path="/recommendations"
              element={<PlaceholderPage title="Smart Recommendations" />}
            />
            <Route
              path="/trends"
              element={<PlaceholderPage title="Trend Insights" />}
            />
            <Route
              path="/styles"
              element={<PlaceholderPage title="Style Guides" />}
            />
            <Route
              path="/showcases"
              element={<PlaceholderPage title="Designer Showcases" />}
            />
            <Route
              path="/transformations"
              element={<PlaceholderPage title="Before & After" />}
            />
            <Route
              path="/search"
              element={<PlaceholderPage title="Search Results" />}
            />
            <Route
              path="/profile"
              element={<PlaceholderPage title="User Profile" />}
            />
            <Route
              path="/projects"
              element={<PlaceholderPage title="My Projects" />}
            />
            <Route
              path="/settings"
              element={<PlaceholderPage title="Settings" />}
            />
            <Route
              path="/billing"
              element={<PlaceholderPage title="Billing" />}
            />
            <Route
              path="/favorites"
              element={<PlaceholderPage title="Favorites" />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

// Placeholder component for routes not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
        <p className="text-slate-600 mb-8">This page is coming soon!</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default App;
