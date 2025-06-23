import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Bed,
  Bath,
  Utensils,
  Sparkles,
  Palette,
  Sofa,
  Lightbulb,
  Eye,
  Download,
  Share,
  RotateCcw,
  Maximize,
  Settings,
  Box,
} from "lucide-react";

const RoomDesigner = () => {
  const [selectedRoom, setSelectedRoom] = useState("living-room");
  const [selectedStyle, setSelectedStyle] = useState("modern");

  const roomTypes = [
    {
      id: "living-room",
      name: "Living Room",
      icon: Home,
      description: "Design your perfect living space",
      features: ["Seating arrangements", "Entertainment center", "Lighting"],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      icon: Bed,
      description: "Create a restful sanctuary",
      features: ["Bed placement", "Storage solutions", "Ambient lighting"],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      icon: Bath,
      description: "Design a functional and beautiful bathroom",
      features: ["Fixture placement", "Storage", "Ventilation"],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: Utensils,
      description: "Design your ideal cooking space",
      features: ["Work triangle", "Storage", "Appliance placement"],
    },
  ];

  const designStyles = [
    { id: "modern", name: "Modern", color: "bg-blue-500" },
    { id: "minimalist", name: "Minimalist", color: "bg-gray-500" },
    { id: "traditional", name: "Traditional", color: "bg-amber-600" },
    { id: "industrial", name: "Industrial", color: "bg-slate-600" },
    { id: "scandinavian", name: "Scandinavian", color: "bg-green-500" },
    { id: "bohemian", name: "Bohemian", color: "bg-purple-500" },
  ];

  const colorPalettes = {
    "living-room": [
      { name: "Warm Neutrals", colors: ["#F5F5DC", "#D2B48C", "#8B4513"] },
      { name: "Cool Blues", colors: ["#E6F3FF", "#4A90E2", "#2C5282"] },
      { name: "Earth Tones", colors: ["#DEB887", "#CD853F", "#A0522D"] },
    ],
    bedroom: [
      { name: "Soft Pastels", colors: ["#FFE4E1", "#FFC0CB", "#DDA0DD"] },
      { name: "Calming Greens", colors: ["#F0FFF0", "#98FB98", "#228B22"] },
      { name: "Cozy Grays", colors: ["#F8F8FF", "#D3D3D3", "#696969"] },
    ],
    bathroom: [
      { name: "Spa Blues", colors: ["#F0F8FF", "#87CEEB", "#4682B4"] },
      { name: "Clean Whites", colors: ["#FFFFFF", "#F5F5F5", "#DCDCDC"] },
      { name: "Natural Stone", colors: ["#F5F5DC", "#D2B48C", "#A0522D"] },
    ],
    kitchen: [
      { name: "Classic White", colors: ["#FFFFFF", "#F8F8F8", "#E5E5E5"] },
      { name: "Warm Wood", colors: ["#DEB887", "#CD853F", "#8B4513"] },
      { name: "Bold Accent", colors: ["#F0F0F0", "#FF6347", "#DC143C"] },
    ],
  };

  const mockFurniture = {
    "living-room": [
      { name: "L-Shaped Sofa", price: "$1,299", image: "sofa" },
      { name: "Coffee Table", price: "$349", image: "table" },
      { name: "Floor Lamp", price: "$159", image: "lamp" },
      { name: "TV Stand", price: "$429", image: "tv-stand" },
    ],
    bedroom: [
      { name: "Queen Bed", price: "$899", image: "bed" },
      { name: "Nightstand", price: "$199", image: "nightstand" },
      { name: "Dresser", price: "$549", image: "dresser" },
      { name: "Reading Chair", price: "$379", image: "chair" },
    ],
    bathroom: [
      { name: "Vanity", price: "$649", image: "vanity" },
      { name: "Mirror", price: "$129", image: "mirror" },
      { name: "Storage Cabinet", price: "$299", image: "cabinet" },
      { name: "Towel Rack", price: "$79", image: "rack" },
    ],
    kitchen: [
      { name: "Kitchen Island", price: "$1,299", image: "island" },
      { name: "Bar Stools", price: "$199", image: "stools" },
      { name: "Pendant Lights", price: "$249", image: "lights" },
      { name: "Storage Pantry", price: "$599", image: "pantry" },
    ],
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold">Room Designer</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Design and visualize different room types with AI-powered
              suggestions and 3D previews
            </p>
          </div>

          {/* Room Type Selection */}
          <div className="grid md:grid-cols-4 gap-4">
            {roomTypes.map((room) => (
              <Card
                key={room.id}
                className={`cursor-pointer transition-all duration-300 card-3d ${
                  selectedRoom === room.id
                    ? "glass border-blue-500 ring-2 ring-blue-500/50"
                    : "glass-dark border-blue-500/20 hover:border-blue-400/50"
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <CardContent className="p-6 text-center">
                  <room.icon
                    className={`w-12 h-12 mx-auto mb-4 ${
                      selectedRoom === room.id
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  />
                  <h3 className="font-semibold mb-2">{room.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {room.description}
                  </p>
                  <div className="space-y-1">
                    {room.features.map((feature, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs mr-1 mb-1"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Design Interface */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Preview */}
            <div className="lg:col-span-2">
              <Card className="glass-dark border-blue-500/20 h-[600px]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>3D Room Preview</span>
                    </CardTitle>
                    <CardDescription>
                      {roomTypes.find((r) => r.id === selectedRoom)?.name}{" "}
                      Design
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="glass">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glass">
                      <Maximize className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glass">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 h-full">
                  <div className="h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg flex items-center justify-center border border-blue-500/20 relative overflow-hidden">
                    {/* Mock 3D Room */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="w-full h-full bg-gradient-to-b from-transparent to-blue-500/10"></div>
                    </div>

                    <div className="text-center space-y-4 z-10">
                      <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        {(() => {
                          const roomType = roomTypes.find(
                            (r) => r.id === selectedRoom,
                          );
                          if (roomType) {
                            const IconComponent = roomType.icon;
                            return (
                              <IconComponent className="w-12 h-12 text-blue-400" />
                            );
                          }
                          return null;
                        })()}
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          3D{" "}
                          {roomTypes.find((r) => r.id === selectedRoom)?.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Interactive 3D visualization
                        </p>
                      </div>
                      <Badge variant="secondary" className="animate-pulse">
                        AI Generated
                      </Badge>
                    </div>

                    {/* Mock furniture items in 3D space */}
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500/30 rounded border-2 border-purple-400 flex items-center justify-center">
                      <Sofa className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-green-500/30 rounded border-2 border-green-400 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-green-400" />
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-4">
                    <Button size="sm" variant="outline" className="glass">
                      <Eye className="w-4 h-4 mr-2" />
                      VR View
                    </Button>
                    <Button size="sm" variant="outline" className="glass">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="glass">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Design Controls */}
            <div className="space-y-6">
              {/* Style Selection */}
              <Card className="glass-dark border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Design Style</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {designStyles.map((style) => (
                      <Button
                        key={style.id}
                        variant={
                          selectedStyle === style.id ? "default" : "outline"
                        }
                        size="sm"
                        className={`justify-start ${
                          selectedStyle === style.id ? "" : "glass"
                        }`}
                        onClick={() => setSelectedStyle(style.id)}
                      >
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${style.color}`}
                        ></div>
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Palettes */}
              <Card className="glass-dark border-blue-500/20">
                <CardHeader>
                  <CardTitle>Color Palettes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {colorPalettes[
                    selectedRoom as keyof typeof colorPalettes
                  ]?.map((palette, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-gray-600 hover:border-blue-400 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {palette.name}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {palette.colors.map((color, j) => (
                          <div
                            key={j}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Furniture Suggestions */}
              <Card className="glass-dark border-blue-500/20">
                <CardHeader>
                  <CardTitle>AI Furniture Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockFurniture[
                    selectedRoom as keyof typeof mockFurniture
                  ]?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-2 rounded border border-gray-600 hover:border-blue-400 cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
                        <Sofa className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-green-400">{item.price}</p>
                      </div>
                      <Button size="sm" variant="outline" className="glass">
                        Add
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Room Analysis */}
          <Card className="glass-dark border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Room Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-400">Layout Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Traffic Flow</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        Excellent
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Space Utilization</span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-400"
                      >
                        Good
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Lighting</span>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500/20 text-yellow-400"
                      >
                        Needs Work
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">
                    Style Coherence
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Color Harmony</span>
                      <span className="text-green-400">95%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Furniture Match</span>
                      <span className="text-blue-400">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Overall Score</span>
                      <span className="text-purple-400">91%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-green-400">
                    Recommendations
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>• Add accent lighting for ambiance</p>
                    <p>• Consider a statement wall color</p>
                    <p>• Include plants for natural elements</p>
                    <p>• Optimize furniture arrangement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;
