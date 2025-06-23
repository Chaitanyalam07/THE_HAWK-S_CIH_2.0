import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Award,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AISuggestionCard from "@/components/AISuggestionCard";
import FeatureShowcase from "@/components/FeatureShowcase";
import RoomGallery from "@/components/RoomGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <Badge
                variant="secondary"
                className="bg-primary-100 text-primary-800 hover:bg-primary-200"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Design Platform
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-tight">
                  Design Your
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Dream Space
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Transform any room with AI-powered suggestions, 3D
                  visualization, and collaborative tools. From concept to
                  reality in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 px-8 py-4 text-lg"
                >
                  Start Designing Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg group"
                >
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-2 border-white flex items-center justify-center"
                      >
                        <Star className="h-4 w-4 text-white fill-current" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      100K+ designers
                    </div>
                    <div className="text-xs text-gray-500">
                      trust our platform
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image/Demo */}
            <div className="relative animate-scale-in">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
                  alt="Modern living room design"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        AI Analysis Complete
                      </div>
                      <div className="text-sm text-gray-500">
                        92% style match
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary-500" />
                    <div className="font-semibold text-gray-900">
                      Verified Design
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Suggestion Demo Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary-100 text-primary-800"
            >
              <Zap className="h-3 w-3 mr-1" />
              Try Our AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              See AI Magic in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload any room photo or take a picture and get instant design
              insights, style suggestions, and improvement recommendations
              powered by advanced AI.
            </p>
          </div>

          <AISuggestionCard className="animate-fade-in" />
        </div>
      </section>

      {/* Features Section */}
      <FeatureShowcase />

      {/* Gallery Section */}
      <RoomGallery />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to transform your space?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of designers and homeowners who've already
              discovered the power of AI-assisted interior design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Start Your Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary-600"
              >
                Book a Demo
              </Button>
            </div>
            <p className="text-sm text-primary-200 mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
