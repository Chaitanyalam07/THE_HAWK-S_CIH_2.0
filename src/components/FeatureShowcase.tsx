import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Box,
  Camera,
  Lightbulb,
  Users,
  Zap,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  Play,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { toast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  badge?: string;
  href: string;
  requiresAuth?: boolean;
  comingSoon?: boolean;
}

const features: Feature[] = [
  {
    id: "ai-design",
    title: "AI-Powered Design",
    description:
      "Transform your space with intelligent design suggestions and automated room planning.",
    icon: Lightbulb,
    color: "from-yellow-400 to-orange-500",
    features: [
      "Smart furniture placement",
      "Color palette generation",
      "Style recommendations",
      "Instant mood boards",
    ],
    badge: "Popular",
    href: "/ai-studio",
    requiresAuth: true,
  },
  {
    id: "3d-visualization",
    title: "3D Visualization",
    description:
      "See your designs come to life with photorealistic 3D rendering and virtual walkthroughs.",
    icon: Box,
    color: "from-blue-400 to-purple-500",
    features: [
      "Real-time 3D preview",
      "360° room tours",
      "VR compatibility",
      "High-res exports",
    ],
    badge: "Pro",
    href: "/3d-planner",
    comingSoon: true,
  },
  {
    id: "photo-analysis",
    title: "Photo Analysis",
    description:
      "Upload any room photo and get instant design insights and improvement suggestions.",
    icon: Camera,
    color: "from-green-400 to-blue-500",
    features: [
      "Instant room analysis",
      "Style detection",
      "Improvement suggestions",
      "Before/after comparisons",
    ],
    href: "/photo-analysis",
  },
  {
    id: "style-matching",
    title: "Style Matching",
    description:
      "Find furniture and decor that perfectly matches your aesthetic preferences.",
    icon: Palette,
    color: "from-pink-400 to-red-500",
    features: [
      "Style preference learning",
      "Product recommendations",
      "Price comparisons",
      "Availability tracking",
    ],
    href: "/style-matcher",
    requiresAuth: true,
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description:
      "Work together with family, friends, or designers on your dream space.",
    icon: Users,
    color: "from-indigo-400 to-purple-500",
    features: [
      "Real-time collaboration",
      "Comment system",
      "Version history",
      "Client presentations",
    ],
    href: "/projects",
    requiresAuth: true,
  },
  {
    id: "quick-design",
    title: "Quick Design",
    description:
      "Create stunning room designs in minutes with our streamlined workflow.",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    features: [
      "Template library",
      "Drag & drop interface",
      "One-click styling",
      "Export to multiple formats",
    ],
    href: "/ai-studio",
    requiresAuth: true,
  },
];

const FeatureShowcase: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [stats, setStats] = useState({
    avgDesignTime: 7,
    activeUsers: 100000,
    satisfactionRate: 95,
  });

  const handleFeatureClick = (feature: Feature) => {
    if (feature.comingSoon) {
      toast({
        title: "Coming Soon!",
        description: `${feature.title} will be available in the next update.`,
      });
      return;
    }

    if (feature.requiresAuth && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    navigate(feature.href);
  };

  const launchDemo = (featureId: string) => {
    switch (featureId) {
      case "ai-design":
        navigate("/ai-studio");
        break;
      case "photo-analysis":
        navigate("/?demo=photo-analysis");
        break;
      case "3d-visualization":
        toast({
          title: "3D Demo",
          description: "3D visualization demo will open soon!",
        });
        break;
      default:
        toast({
          title: "Demo Available",
          description: "Interactive demo coming soon!",
        });
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary-100 text-primary-800"
            >
              <Star className="h-3 w-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Everything you need to design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered suggestions to collaborative tools, we've built
              the most comprehensive interior design platform for creators of
              all levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className={cn(
                  "group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden",
                  "animate-fade-in cursor-pointer",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleFeatureClick(feature)}
              >
                <CardHeader className="relative">
                  {feature.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "absolute -top-2 -right-2 z-10",
                        feature.badge === "Pro"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-primary-500 text-white hover:bg-primary-600",
                      )}
                    >
                      {feature.badge}
                    </Badge>
                  )}

                  {feature.comingSoon && (
                    <Badge
                      variant="outline"
                      className="absolute -top-2 -right-2 z-10 bg-gray-100 text-gray-600"
                    >
                      Coming Soon
                    </Badge>
                  )}

                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                      feature.color,
                    )}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      className="flex-1 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick(feature);
                      }}
                    >
                      {feature.comingSoon ? "Notify Me" : "Learn More"}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    {!feature.comingSoon && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          launchDemo(feature.id);
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.avgDesignTime} Minutes
              </div>
              <div className="text-gray-600">Average design time</div>
              <div className="mt-2 text-sm text-green-600 font-medium">
                ↓ 60% faster than traditional methods
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {(stats.activeUsers / 1000).toFixed(0)}K+
              </div>
              <div className="text-gray-600">Active designers</div>
              <div className="mt-2 text-sm text-green-600 font-medium">
                ↑ Growing community
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.satisfactionRate}%
              </div>
              <div className="text-gray-600">Satisfaction rate</div>
              <div className="mt-2 text-sm text-green-600 font-medium">
                ⭐ 4.9/5 average rating
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to revolutionize your design process?
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Join thousands of designers who've already discovered the power
                of AI-assisted interior design. Start creating today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/ai-studio")}
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                  onClick={() => navigate("/gallery")}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Browse Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default FeatureShowcase;
