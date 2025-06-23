import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Upload,
  Sparkles,
  Eye,
  Search,
  Star,
  Play,
  CheckCircle,
  X,
  Lightbulb,
  User,
  Home,
  Filter,
  Grid3X3,
  List,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Box,
  Palette,
  Ruler,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Rooms");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>
                🎉 New: AR Room Visualization now available! Experience the
                future of interior design.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">
                🚀 Try it free for 14 days
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 border-white/30 text-white text-xs"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Navigation */}
        <nav className="border-b border-border glass-dark backdrop-blur-md sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DesignHub
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    AI-Powered Interior Design
                  </div>
                </div>
              </Link>
              <div className="hidden lg:flex items-center space-x-8">
                <div className="relative group">
                  <button className="text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1 py-2">
                    <Palette className="w-4 h-4" />
                    <span>Solutions</span>
                    <svg
                      className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-background border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                    <div className="p-4 space-y-3">
                      <Link
                        to="/room-designer"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Palette className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Room Designer
                          </div>
                          <div className="text-xs text-gray-400">
                            3D room planning tool
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/room-analyzer"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Box className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">AI Analyzer</div>
                          <div className="text-xs text-gray-400">
                            Photo analysis & suggestions
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/room-analyzer"
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Eye className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            AR/VR Preview
                          </div>
                          <div className="text-xs text-gray-400">
                            Immersive visualization
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  to="/room-analyzer"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  AI Features
                </Link>
                <button className="text-sm font-medium hover:text-primary transition-colors">
                  Pricing
                </button>
                <button className="text-sm font-medium hover:text-primary transition-colors">
                  Gallery
                </button>
                <button className="text-sm font-medium hover:text-primary transition-colors">
                  Enterprise
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-muted/20 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search designs, inspiration..."
                  className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48"
                />
              </div>
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm px-6"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit glass">
                    ⚡ AI-Powered Design Platform
                  </Badge>
                  <h1 className="text-5xl font-bold leading-tight">
                    Design Your{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                      Dream Space
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Transform any room with AI-powered suggestions, 3D
                    visualization, and collaborative tools. From concept to
                    reality in minutes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/room-designer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8"
                    >
                      Start Designing Free
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-6 glass"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground"></div>
              </div>
              <div className="relative">
                <div className="relative glass-dark rounded-2xl p-8 backdrop-blur card-3d">
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-400 border-green-500/30"
                    >
                      ✓ Verified Design
                    </Badge>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                      alt="Modern living room design"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute bottom-4 left-4 glass rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          AI Analysis Complete
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        92% style match
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <Link to="/room-analyzer">
                <Card className="glass-dark border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 card-3d cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Camera className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">AI Photo Analysis</h3>
                    <p className="text-sm text-gray-400">
                      Upload & analyze room photos
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/room-designer">
                <Card className="glass-dark border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 card-3d cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Box className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">3D Room Designer</h3>
                    <p className="text-sm text-gray-400">
                      Design rooms in 3D space
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/room-analyzer">
                <Card className="glass-dark border-green-500/20 hover:border-green-400/50 transition-all duration-300 card-3d cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Ruler className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Room Calculator</h3>
                    <p className="text-sm text-gray-400">
                      Calculate dimensions & area
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/room-analyzer">
                <Card className="glass-dark border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 card-3d cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">AR/VR Preview</h3>
                    <p className="text-sm text-gray-400">
                      View in augmented reality
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="secondary" className="w-fit mx-auto glass">
                ⚡ Platform Features
              </Badge>
              <h2 className="text-4xl font-bold">
                Everything you need to design
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From AI-powered suggestions to collaborative tools, we've built
                the most comprehensive interior design platform for creators of
                all levels.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass-dark border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 card-3d p-8">
                <CardHeader>
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    Transform your space with intelligent design suggestions and
                    automated room planning.
                  </CardDescription>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Smart furniture placement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Color palette generation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Style recommendations</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/room-analyzer">
                      <Button variant="outline" className="w-full glass">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 card-3d p-8">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl">3D Visualization</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    Coming Soon
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    See your designs come to life with photorealistic 3D
                    rendering and virtual walkthroughs.
                  </CardDescription>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Real-time 3D preview</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>360° room tours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>VR compatibility</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/room-designer">
                      <Button variant="outline" className="w-full glass">
                        Notify Me
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-green-500/20 hover:border-green-400/50 transition-all duration-300 card-3d p-8">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl">Photo Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    Upload any room photo and get instant design insights and
                    improvement suggestions.
                  </CardDescription>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Instant room analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Style detection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Improvement suggestions</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/room-analyzer">
                      <Button variant="outline" className="w-full glass">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to transform your space?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of designers and homeowners who've already
              discovered the power of AI-assisted interior design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-lg px-8"
                >
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/70">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-4 glass-dark">
          <div className="container mx-auto text-center space-y-8">
            <h3 className="text-2xl font-bold">
              Stay inspired with design trends
            </h3>
            <p className="text-muted-foreground">
              Get weekly design inspiration, AI tips, and exclusive features
              delivered to your inbox
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input placeholder="Enter your email" className="flex-1 glass" />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No spam, unsubscribe at any time. Read our Privacy Policy
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative glass-dark border-t border-border py-16 px-4 overflow-hidden">
          {/* 3D Bubbles Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bubble"></div>
            ))}
          </div>

          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">DesignHub</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The most advanced AI-powered interior design platform.
                  Transform your space with intelligent suggestions, 3D
                  visualization, and collaborative tools.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Youtube className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Platform</h4>
                <div className="space-y-2 text-sm">
                  <Link
                    to="/room-designer"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Design Studio
                  </Link>
                  <Link
                    to="/room-designer"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    3D Room Planner
                  </Link>
                  <Link
                    to="/room-analyzer"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Photo Analysis
                  </Link>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Style Matcher
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Collaboration Tools
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Resources</h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Design Gallery
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Style Guides
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tutorials
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Company</h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Press
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Partners
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>hello@designhub.com</span>
                <span>+1 (555) 123-4567</span>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  GDPR
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Licensing
                </a>
              </div>
            </div>

            <div className="text-center mt-8 text-sm text-muted-foreground">
              © 2024 DesignHub. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
