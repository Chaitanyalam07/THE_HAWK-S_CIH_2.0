import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Upload,
  Camera,
  CheckCircle,
  X,
  AlertTriangle,
  Sparkles,
  Eye,
  BarChart3,
  Play,
  ArrowRight,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share,
  Download,
  Star,
  Box,
  Video,
  Smartphone,
  Ruler,
  Home,
  Bed,
  Bath,
  Sofa,
  Menu,
  User,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center pulse-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                  <span className="text-2xl font-bold gradient-text">
                    DesignHub
                  </span>
              </Link>
                <nav className="hidden lg:flex items-center gap-8">
                  <Link
                    to="/analyzer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Room Analyzer
                  </Link>
                      <Link
                    to="/camera"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Live Camera
                      </Link>
                      <Link
                    to="/ar"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Box className="w-4 h-4" />
                    AR/VR View
                      </Link>
                      <Link
                    to="/designer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Ruler className="w-4 h-4" />
                    Room Designer
                      </Link>
                <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                    <Eye className="w-4 h-4" />
                    Gallery
                </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hidden md:flex"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Try Our AI
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hidden md:flex"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  AI Analyze
                </Button>
                <div className="flex items-center gap-2">
                  <Link to="/signin">
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-white hover:bg-blue-500/20 glass-card"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 pulse-glow">
                      Get Started
                </Button>
              </Link>
                </div>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 floating-element">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-blue-300 font-medium">
                    AI-Powered Design Platform
                  </span>
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                    Design Your{" "}
                    <span className="gradient-text">Dream Space</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                    Transform any room with AI-powered suggestions, 3D
                    visualization, AR/VR experiences, and real-time camera
                    analysis. From concept to reality in minutes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/analyzer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium text-lg pulse-glow"
                    >
                      Start Designing Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-500/30 text-white hover:bg-blue-500/20 px-8 py-4 rounded-xl font-medium text-lg glass-card"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="glass-card rounded-3xl p-8 relative overflow-hidden floating-element">
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                      alt="Modern living room design"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute top-12 right-12 glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium">
                        Verified Design
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3 text-white">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-semibold">
                          AI Analysis Complete
                        </div>
                        <div className="text-xs opacity-80">
                          92% style match
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold gradient-text">
                AI-Powered Design Tools
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to create stunning interiors with artificial
                intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Room Analyzer */}
              <Link to="/analyzer">
                <Card className="glass-card card-3d group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        Room Analyzer
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Upload room photos for AI analysis and design
                        suggestions
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Live Camera */}
              <Link to="/camera">
                <Card className="glass-card card-3d group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        Live Camera
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Real-time AI suggestions through your camera
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* AR/VR Viewer */}
              <Link to="/ar">
                <Card className="glass-card card-3d group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Box className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        AR/VR View
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Experience furniture in 3D augmented reality
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Room Designer */}
              <Link to="/designer">
                <Card className="glass-card card-3d group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                      <Ruler className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        Room Designer
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Design with custom dimensions and 3D preview
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Room Types Section */}
        <section className="py-16 section-dark">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Design Any Room Type
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Specialized AI tools for different room types with 3D preview
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Home,
                  name: "Living Room",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Bed,
                  name: "Bedroom",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Bath,
                  name: "Bathroom",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Sofa,
                  name: "Hall",
                  color: "from-orange-500 to-red-500",
                },
              ].map((room, index) => (
                <Card key={index} className="room-type-card cursor-pointer">
                  <CardContent className="p-8 text-center space-y-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${room.color} rounded-2xl flex items-center justify-center mx-auto`}
                    >
                      <room.icon className="w-8 h-8 text-white" />
                  </div>
                    <h3 className="text-lg font-semibold text-white">
                      {room.name}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card border-blue-500/30"
                    >
                      Design Now
                      </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to transform your space?
            </h2>
              <p className="text-xl text-white/90">
                Join thousands of designers and homeowners using AI-powered
                design tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg"
                >
                  Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
                <div className="glass-card rounded-xl px-6 py-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent text-white placeholder-white/70 border-none outline-none text-lg"
                  />
                </div>
            </div>
            <p className="text-sm text-white/70">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
          </div>
        </section>

        {/* Footer with 3D Bubbles */}
        <footer className="bubble-bg section-dark border-t border-white/10">
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">
                    DesignHub
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  The most advanced AI-powered interior design platform with
                  AR/VR capabilities.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>hello@designhub.com</div>
                  <div>+1 (555) 123-4567</div>
                  <div>San Francisco, CA</div>
                </div>
              </div>

              {/* Platform Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Platform</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>
                  <Link
                      to="/analyzer"
                      className="hover:text-white transition-colors"
                  >
                      Room Analyzer
                  </Link>
                  </li>
                  <li>
                  <Link
                      to="/camera"
                      className="hover:text-white transition-colors"
                  >
                      Live Camera
                  </Link>
                  </li>
                  <li>
                  <Link
                      to="/ar"
                      className="hover:text-white transition-colors"
                  >
                      AR/VR View
                  </Link>
                  </li>
                  <li>
                    <Link
                      to="/designer"
                      className="hover:text-white transition-colors"
                    >
                      Room Designer
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>
                    <Link
                      to="/gallery"
                      className="hover:text-white transition-colors"
                  >
                    Design Gallery
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Style Guides
                  </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                  </li>
                </ul>
            </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                  Licensing
                </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
              © 2024 DesignHub. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                {/* Social Icons with glow effect */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-colors cursor-pointer pulse-glow"
                  >
                    <div className="w-5 h-5 bg-blue-400 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
