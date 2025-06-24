import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Ruler,
  ArrowLeft,
  Home,
  Bed,
  Bath,
  Sofa,
  Calculator,
  Eye,
  Palette,
  Lightbulb,
  Download,
  Share,
  RotateCcw,
  Layers,
  Plus,
  Minus,
  Grid3X3,
} from "lucide-react";

interface RoomDimensions {
  length: number;
  width: number;
  height: number;
}

interface RoomSuggestion {
  category: string;
  items: string[];
  colors: string[];
}

const roomTypes = [
  {
    id: "living",
    name: "Living Room",
    icon: Home,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: Bed,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    icon: Bath,
    color: "from-green-500 to-emerald-500",
  },
  { id: "hall", name: "Hall", icon: Sofa, color: "from-orange-500 to-red-500" },
];

const RoomDesigner = () => {
  const [selectedRoomType, setSelectedRoomType] = useState<string>("living");
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    length: 12,
    width: 10,
    height: 9,
  });
  const [area, setArea] = useState<number>(120);
  const [suggestions, setSuggestions] = useState<RoomSuggestion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view3D, setView3D] = useState(false);

  const calculateArea = () => {
    const newArea = dimensions.length * dimensions.width;
    setArea(newArea);
  };

  const handleDimensionChange = (key: keyof RoomDimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    setDimensions((prev) => ({ ...prev, [key]: numValue }));

    if (key === "length" || key === "width") {
      const newArea =
        (key === "length" ? numValue : dimensions.length) *
        (key === "width" ? numValue : dimensions.width);
      setArea(newArea);
    }
  };

  const generateSuggestions = async () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const roomData = {
        living: {
          category: "Living Room",
          items: [
            "L-shaped sectional sofa (8-9 ft)",
            'Coffee table (48" x 24")',
            "TV console (60-65 inches)",
            "Floor lamp with reading light",
            "Area rug (8' x 10')",
            "Accent chairs (2)",
            "Side tables (2)",
          ],
          colors: [
            "Warm white walls (#F8F9FA)",
            "Navy blue accent wall (#1E3A8A)",
            "Gold metallic accents",
            "Natural wood tones",
            "Soft gray textiles",
          ],
        },
        bedroom: {
          category: "Bedroom",
          items: [
            "Queen size platform bed",
            "Nightstands (2)",
            "Dresser with mirror",
            "Armchair or reading chair",
            "Bedside lamps (2)",
            "Area rug (5' x 8')",
            "Curtains or blinds",
          ],
          colors: [
            "Soft beige walls (#F5F5DC)",
            "Deep green accent wall (#22543D)",
            "Rose gold hardware",
            "Cream and white linens",
            "Natural wood furniture",
          ],
        },
        bathroom: {
          category: "Bathroom",
          items: [
            'Double vanity (60")',
            "Freestanding bathtub",
            "Walk-in shower",
            "Storage cabinet",
            "Mirror with lighting",
            "Towel warmers",
            "Plants for humidity",
          ],
          colors: [
            "Crisp white walls (#FFFFFF)",
            "Gray subway tiles",
            "Matte black fixtures",
            "Natural stone accents",
            "Soft blue towels",
          ],
        },
        hall: {
          category: "Hall/Entryway",
          items: [
            "Console table",
            "Mirror or artwork",
            "Storage bench",
            "Coat rack or hooks",
            "Table lamp or pendant",
            "Runner rug",
            "Decorative bowl/tray",
          ],
          colors: [
            "Light gray walls (#E5E7EB)",
            "Dark wood furniture",
            "Brass or gold accents",
            "White trim and molding",
            "Pops of green from plants",
          ],
        },
      };

      setSuggestions(roomData[selectedRoomType] || roomData.living);
      setIsGenerating(false);
    }, 2000);
  };

  const selectedRoom = roomTypes.find((room) => room.id === selectedRoomType);

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <div className="flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-orange-400" />
                  <h1 className="text-2xl font-bold gradient-text">
                    Room Designer
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setView3D(!view3D)}
                  className="glass-card border-white/20"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  {view3D ? "2D View" : "3D View"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Room Type Selector */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Room Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {roomTypes.map((room) => (
                    <div
                      key={room.id}
                      className={`room-type-card p-3 rounded-lg cursor-pointer transition-all ${
                        selectedRoomType === room.id
                          ? "border-orange-500/50 bg-orange-500/10"
                          : "border-white/10"
                      }`}
                      onClick={() => setSelectedRoomType(room.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${room.color} rounded-lg flex items-center justify-center`}
                        >
                          <room.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{room.name}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Dimensions Input */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    Room Dimensions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="length" className="text-white text-sm">
                        Length (ft)
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        value={dimensions.length}
                        onChange={(e) =>
                          handleDimensionChange("length", e.target.value)
                        }
                        className="glass-card border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="width" className="text-white text-sm">
                        Width (ft)
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        value={dimensions.width}
                        onChange={(e) =>
                          handleDimensionChange("width", e.target.value)
                        }
                        className="glass-card border-white/20 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-white text-sm">
                        Height (ft)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={dimensions.height}
                        onChange={(e) =>
                          handleDimensionChange("height", e.target.value)
                        }
                        className="glass-card border-white/20 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-lg border border-orange-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-orange-400" />
                        <span className="font-medium">Total Area</span>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        {area} sq ft
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={generateSuggestions}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 pulse-glow"
                  >
                    {isGenerating ? (
                      <>
                        <Calculator className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        Generate AI Suggestions
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/ar">
                    <Button
                      variant="outline"
                      className="w-full glass-card border-white/20 text-left justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View in AR
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-left justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Design
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-left justify-start"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Design
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 3D Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      {view3D ? "3D Preview" : "2D Floor Plan"}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="room-viewer h-96 relative flex items-center justify-center">
                    {view3D ? (
                      <div className="text-center">
                        <Layers className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          3D Room Preview
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Interactive 3D visualization of your{" "}
                          {selectedRoom?.name.toLowerCase()}
                        </p>
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                          <div className="glass-card p-3 rounded-lg">
                            <p className="text-sm text-gray-400">Length</p>
                            <p className="font-semibold">
                              {dimensions.length} ft
                            </p>
                          </div>
                          <div className="glass-card p-3 rounded-lg">
                            <p className="text-sm text-gray-400">Width</p>
                            <p className="font-semibold">
                              {dimensions.width} ft
                            </p>
                          </div>
                          <div className="glass-card p-3 rounded-lg">
                            <p className="text-sm text-gray-400">Height</p>
                            <p className="font-semibold">
                              {dimensions.height} ft
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <div
                          className="border-2 border-orange-400 bg-orange-400/10"
                          style={{
                            width: `${Math.min(dimensions.length * 20, 300)}px`,
                            height: `${Math.min(dimensions.width * 20, 200)}px`,
                          }}
                        >
                          <div className="absolute -top-6 left-0 text-sm text-orange-400">
                            {dimensions.length} ft
                          </div>
                          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-orange-400">
                            {dimensions.width} ft
                          </div>
                          <div className="w-full h-full flex items-center justify-center">
                            <selectedRoom.icon className="w-8 h-8 text-orange-400/50" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              {suggestions && (
                <div className="space-y-6">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sofa className="w-5 h-5" />
                        Furniture Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {suggestions.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 glass-card rounded-lg border border-white/10"
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-sm">{item}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-auto border-white/20"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Color Palette
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {suggestions.colors.map((color, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 glass-card rounded-lg border border-white/10"
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                            <span className="text-sm">{color}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {isGenerating && (
                <Card className="glass-card border-white/10">
                  <CardContent className="p-8 text-center">
                    <div className="animate-pulse space-y-4">
                      <Calculator className="w-16 h-16 text-orange-400 mx-auto animate-spin" />
                      <h3 className="text-xl font-semibold">
                        AI is designing your {selectedRoom?.name.toLowerCase()}
                        ...
                      </h3>
                      <p className="text-gray-300">
                        Calculating optimal furniture placement and color
                        schemes
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;
