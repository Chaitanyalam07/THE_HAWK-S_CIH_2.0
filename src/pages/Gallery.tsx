import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share,
  Download,
  Star,
  Eye,
  Plus,
  BookOpen,
  Palette,
  Home,
  Bed,
  Bath,
  Sofa,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  roomType: string;
  style: string;
  image: string;
  likes: number;
  views: number;
  featured: boolean;
  designer: string;
  tags: string[];
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Modern Minimalist Living",
    category: "Living Room",
    roomType: "Living Room",
    style: "Modern",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    likes: 142,
    views: 2350,
    featured: true,
    designer: "Sarah Chen",
    tags: ["minimalist", "neutral", "modern"],
  },
  {
    id: "2",
    title: "Cozy Bedroom Retreat",
    category: "Bedroom",
    roomType: "Bedroom",
    style: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    likes: 98,
    views: 1680,
    featured: false,
    designer: "Mark Johnson",
    tags: ["cozy", "scandinavian", "wood"],
  },
  {
    id: "3",
    title: "Industrial Kitchen Design",
    category: "Kitchen",
    roomType: "Kitchen",
    style: "Industrial",
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=600&q=80",
    likes: 203,
    views: 3420,
    featured: true,
    designer: "Alex Rivera",
    tags: ["industrial", "dark", "metal"],
  },
  {
    id: "4",
    title: "Luxury Bathroom Spa",
    category: "Bathroom",
    roomType: "Bathroom",
    style: "Luxury",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
    likes: 176,
    views: 2890,
    featured: false,
    designer: "Emma Wilson",
    tags: ["luxury", "spa", "marble"],
  },
  {
    id: "5",
    title: "Bohemian Reading Nook",
    category: "Living Room",
    roomType: "Reading Nook",
    style: "Bohemian",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    likes: 87,
    views: 1240,
    featured: false,
    designer: "Luna Martinez",
    tags: ["bohemian", "colorful", "plants"],
  },
  {
    id: "6",
    title: "Contemporary Office Space",
    category: "Office",
    roomType: "Office",
    style: "Contemporary",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
    likes: 134,
    views: 2100,
    featured: false,
    designer: "David Kim",
    tags: ["contemporary", "productive", "clean"],
  },
];

const categoryIcons = {
  "Living Room": Home,
  Bedroom: Bed,
  Bathroom: Bath,
  Kitchen: Sofa,
  Office: BookOpen,
  "Reading Nook": BookOpen,
};

const Gallery = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Office",
  ];
  const styles = [
    "All",
    "Modern",
    "Scandinavian",
    "Industrial",
    "Luxury",
    "Bohemian",
    "Contemporary",
  ];
  const sortOptions = ["Newest", "Most Liked", "Most Viewed", "Featured"];

  const filteredItems = mockGalleryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesStyle =
      selectedStyle === "All" || item.style === selectedStyle;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesStyle && matchesSearch;
  });

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <div className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-indigo-400" />
                  <h1 className="text-2xl font-bold gradient-text">
                    Design Gallery
                  </h1>
                </div>
              </div>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="glass-card border-white/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Design
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Design Inspiration Gallery
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover thousands of beautiful room designs created by our
              community of talented designers and AI-powered tools
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search designs, styles, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-card border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="glass-card border-white/20"
                >
                  {viewMode === "grid" ? (
                    <List className="w-4 h-4" />
                  ) : (
                    <Grid3X3 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="glass-card border-white/20"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Category:</span>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "glass-card border-white/20"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Style:</span>
                <div className="flex gap-2">
                  {styles.map((style) => (
                    <Button
                      key={style}
                      variant={selectedStyle === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(style)}
                      className={
                        selectedStyle === style
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "glass-card border-white/20"
                      }
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass-card border border-white/20 rounded-lg px-3 py-1 text-sm bg-transparent text-white focus:outline-none focus:border-indigo-500"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-slate-800"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-300">
              Showing {filteredItems.length} designs
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-400">Updated daily</span>
            </div>
          </div>

          {/* Gallery Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                const IconComponent = categoryIcons[item.category] || Home;
                return (
                  <Card
                    key={item.id}
                    className="glass-card border-white/10 group hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm text-gray-400">
                              {item.roomType}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs ml-auto"
                            >
                              {item.style}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            by {item.designer}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {item.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.views}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const IconComponent = categoryIcons[item.category] || Home;
                return (
                  <Card
                    key={item.id}
                    className="glass-card border-white/10 hover:border-indigo-500/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                              {item.title}
                            </h3>
                            {item.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <IconComponent className="w-4 h-4" />
                              {item.roomType}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {item.style}
                            </Badge>
                            <span>by {item.designer}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {item.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.views}
                            </div>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card border-white/20"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card border-white/20"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card border-white/20"
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="glass-card border-white/20 px-8 py-3"
            >
              Load More Designs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
