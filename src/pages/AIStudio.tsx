import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Upload,
  Camera,
  Palette,
  Lightbulb,
  ArrowRight,
  Play,
} from "lucide-react";

const AIStudio = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary-100 text-primary-800"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AI Design Studio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              AI-Powered Design Studio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create stunning interior designs with the power of artificial
              intelligence. Upload photos, describe your vision, and watch AI
              transform your space.
            </p>
            <Button size="lg" className="px-8 py-4 text-lg">
              Launch Studio
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Photo Upload</CardTitle>
                <CardDescription>
                  Upload room photos and get instant AI analysis and suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Live Camera</CardTitle>
                <CardDescription>
                  Use your camera for real-time design suggestions and AR
                  preview
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Style Generation</CardTitle>
                <CardDescription>
                  AI generates color palettes, furniture suggestions, and
                  layouts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
              <Lightbulb className="h-4 w-4" />
              <span>
                Full AI Studio launching soon! Stay tuned for updates.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIStudio;
