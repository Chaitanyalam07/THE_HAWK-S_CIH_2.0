import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Box,
  Eye,
  ArrowLeft,
  Settings,
  RotateCcw,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Palette,
  Sofa,
  Bed,
  Lamp,
  BookOpen,
  Square,
  Volume2,
  VolumeX,
  Camera,
  Download,
  Share,
} from "lucide-react";

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  roomType: string;
  price: string;
  model: string;
  icon: React.ComponentType<any>;
  amazonLink: string;
  ikeaLink: string;
  description: string;
  dimensions: string;
  arRecommended: boolean;
}

interface ARRecommendation {
  furniture: FurnitureItem;
  position: { x: number; y: number; z: number };
  rotation: number;
  confidence: number;
  reason: string;
}

const furnitureDatabase: FurnitureItem[] = [
  {
    id: "1",
    name: "KIVIK 3-Seat Sofa",
    category: "Seating",
    roomType: "Living Room",
    price: "$899",
    model: "sofa-modern.glb",
    icon: Sofa,
    amazonLink: "https://amazon.com/search?k=3+seat+sofa+modern",
    ikeaLink:
      "https://www.ikea.com/us/en/p/kivik-3-seat-sofa-hillared-dark-blue-s19421873/",
    description: "Spacious 3-seat sofa perfect for family gatherings",
    dimensions: '90" W x 38" D x 32" H',
    arRecommended: true,
  },
  {
    id: "2",
    name: "MALM Queen Bed",
    category: "Sleeping",
    roomType: "Bedroom",
    price: "$299",
    model: "bed-platform.glb",
    icon: Bed,
    amazonLink: "https://amazon.com/search?k=queen+platform+bed",
    ikeaLink:
      "https://www.ikea.com/us/en/p/malm-bed-frame-high-white-00160210/",
    description: "Modern platform bed with clean lines",
    dimensions: '83" W x 65" D x 15" H',
    arRecommended: true,
  },
  {
    id: "3",
    name: "FOTO Floor Lamp",
    category: "Lighting",
    roomType: "Any",
    price: "$89",
    model: "lamp-floor.glb",
    icon: Lamp,
    amazonLink: "https://amazon.com/search?k=modern+floor+lamp",
    ikeaLink:
      "https://www.ikea.com/us/en/p/foto-pendant-lamp-aluminum-00218780/",
    description: "Adjustable aluminum floor lamp",
    dimensions: '12" W x 12" D x 65" H',
    arRecommended: true,
  },
  {
    id: "4",
    name: "HEMNES Bookshelf",
    category: "Storage",
    roomType: "Any",
    price: "$179",
    model: "bookshelf-wood.glb",
    icon: BookOpen,
    amazonLink: "https://amazon.com/search?k=5+shelf+bookcase+white",
    ikeaLink:
      "https://www.ikea.com/us/en/p/hemnes-bookcase-white-stain-40263848/",
    description: "5-shelf bookcase in white stain",
    dimensions: '35" W x 14" D x 77" H',
    arRecommended: true,
  },
  {
    id: "5",
    name: "LACK Coffee Table",
    category: "Tables",
    roomType: "Living Room",
    price: "$50",
    model: "table-coffee.glb",
    icon: Sofa,
    amazonLink: "https://amazon.com/search?k=white+coffee+table",
    ikeaLink: "https://www.ikea.com/us/en/p/lack-coffee-table-white-20011408/",
    description: "Simple white coffee table",
    dimensions: '46" W x 22" D x 17" H',
    arRecommended: true,
  },
  {
    id: "6",
    name: "STRANDMON Wing Chair",
    category: "Seating",
    roomType: "Living Room",
    price: "$279",
    model: "chair-accent.glb",
    icon: Sofa,
    amazonLink: "https://amazon.com/search?k=accent+chair+wing+back",
    ikeaLink:
      "https://www.ikea.com/us/en/p/strandmon-wing-chair-skiftebo-yellow-40341945/",
    description: "Classic wing chair with high back",
    dimensions: '32" W x 36" D x 42" H',
    arRecommended: true,
  },
];

const ARViewer = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedFurniture, setSelectedFurniture] =
    useState<FurnitureItem | null>(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placedItems, setPlacedItems] = useState<string[]>([]);
  const [arRecommendations, setArRecommendations] = useState<
    ARRecommendation[]
  >([]);
  const [roomAnalysis, setRoomAnalysis] = useState<{
    roomType: string;
    size: string;
    lighting: string;
  } | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [arStream, setArStream] = useState<MediaStream | null>(null);
  const arViewRef = useRef<HTMLDivElement>(null);
  const arVideoRef = useRef<HTMLVideoElement>(null);

  const analyzeRoomForAR = () => {
    // Simulate room analysis for AR recommendations
    const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Office"];
    const sizes = ["Small", "Medium", "Large"];
    const lightingConditions = ["Bright", "Moderate", "Dim"];

    const detectedRoom =
      roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const detectedSize = sizes[Math.floor(Math.random() * sizes.length)];
    const detectedLighting =
      lightingConditions[Math.floor(Math.random() * lightingConditions.length)];

    setRoomAnalysis({
      roomType: detectedRoom,
      size: detectedSize,
      lighting: detectedLighting,
    });

    generateARRecommendations(detectedRoom, detectedSize, detectedLighting);
  };

  const generateARRecommendations = (
    roomType: string,
    size: string,
    lighting: string,
  ) => {
    let recommendations: ARRecommendation[] = [];

    // Filter furniture by room type
    let relevantFurniture = furnitureDatabase.filter(
      (item) => item.roomType === roomType || item.roomType === "Any",
    );

    // Generate recommendations based on room analysis
    if (roomType === "Living Room") {
      // Essential living room items
      const sofa = relevantFurniture.find(
        (item) => item.category === "Seating" && item.name.includes("Sofa"),
      );
      const table = relevantFurniture.find(
        (item) => item.category === "Tables",
      );
      const chair = relevantFurniture.find(
        (item) => item.category === "Seating" && item.name.includes("Chair"),
      );

      if (sofa) {
        recommendations.push({
          furniture: sofa,
          position: { x: 0, y: 0, z: -2 },
          rotation: 0,
          confidence: 95,
          reason: `Perfect fit for ${size.toLowerCase()} ${roomType.toLowerCase()}`,
        });
      }

      if (table) {
        recommendations.push({
          furniture: table,
          position: { x: 0, y: 0, z: -0.5 },
          rotation: 0,
          confidence: 88,
          reason: `Complements the seating area perfectly`,
        });
      }

      if (chair && size !== "Small") {
        recommendations.push({
          furniture: chair,
          position: { x: 1.5, y: 0, z: -1.5 },
          rotation: 45,
          confidence: 75,
          reason: `Additional seating for ${size.toLowerCase()} room`,
        });
      }
    } else if (roomType === "Bedroom") {
      const bed = relevantFurniture.find(
        (item) => item.category === "Sleeping",
      );
      if (bed) {
        recommendations.push({
          furniture: bed,
          position: { x: 0, y: 0, z: -2 },
          rotation: 0,
          confidence: 98,
          reason: `Essential for ${roomType.toLowerCase()}`,
        });
      }
    }

    // Add lighting recommendations for dim rooms
    if (lighting === "Dim") {
      const lamp = relevantFurniture.find(
        (item) => item.category === "Lighting",
      );
      if (lamp) {
        recommendations.push({
          furniture: lamp,
          position: { x: -1, y: 0, z: -1 },
          rotation: 0,
          confidence: 85,
          reason: `Improves lighting in ${lighting.toLowerCase()} room`,
        });
      }
    }

    setArRecommendations(recommendations);
    setShowRecommendations(true);
  };

  const startAR = async () => {
    try {
      // Request camera permission for AR
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setArStream(stream);
      setCameraPermission(true);
      setIsARActive(true);

      if (arVideoRef.current) {
        arVideoRef.current.srcObject = stream;
        arVideoRef.current.play();
      }

      // Start room analysis after AR is active
      setTimeout(() => {
        analyzeRoomForAR();
      }, 2000);
    } catch (error) {
      console.error("AR initialization failed:", error);
      let errorMessage = "AR requires camera access. ";

      if (error.name === "NotAllowedError") {
        errorMessage += "Please allow camera permissions and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found on this device.";
      } else {
        errorMessage += "Please check your camera settings.";
      }

      alert(errorMessage);
    }
  };

  const stopAR = () => {
    if (arStream) {
      arStream.getTracks().forEach((track) => track.stop());
      setArStream(null);
    }

    if (arVideoRef.current) {
      arVideoRef.current.srcObject = null;
    }

    setIsARActive(false);
    setSelectedFurniture(null);
    setIsPlacing(false);
    setShowRecommendations(false);
    setArRecommendations([]);
    setRoomAnalysis(null);
  };

  const placeFurniture = (item: FurnitureItem) => {
    setSelectedFurniture(item);
    setIsPlacing(true);
  };

  const confirmPlacement = () => {
    if (selectedFurniture) {
      setPlacedItems((prev) => [...prev, selectedFurniture.id]);
      setIsPlacing(false);
      setSelectedFurniture(null);
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <div className="flex items-center gap-2">
                  <Box className="w-6 h-6 text-purple-400" />
                  <h1 className="text-2xl font-bold gradient-text">
                    AR/VR Viewer
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isARActive && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 animate-pulse">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    AR Active
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="glass-card border-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {!isARActive ? (
            /* AR Setup Interface */
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Experience Furniture in Augmented Reality
                </h2>
                <p className="text-gray-300 text-lg">
                  Place 3D furniture models in your real environment using AR
                  technology
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Box className="w-6 h-6 text-purple-400" />
                      AR Mode
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Box className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-300">
                          Real-world furniture placement
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={startAR}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Start AR Experience
                    </Button>
                    <p className="text-xs text-gray-400 text-center">
                      Requires camera access and WebXR support
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-6 h-6 text-blue-400" />
                      VR Mode
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-300">
                          Immersive 3D room experience
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full glass-card border-blue-500/30 opacity-50"
                      disabled
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      VR Coming Soon
                    </Button>
                    <p className="text-xs text-gray-400 text-center">
                      Full VR support in development
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Furniture Catalog */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle>3D Furniture Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    {furnitureItems.map((item) => (
                      <Card
                        key={item.id}
                        className="glass-card border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer"
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <item.icon className="w-8 h-8 text-purple-400" />
                          </div>
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-400 mb-2">
                            {item.category}
                          </p>
                          <p className="text-sm font-medium text-purple-400">
                            {item.price}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* AR Interface */
            <div className="grid lg:grid-cols-4 gap-6">
              {/* AR View */}
              <div className="lg:col-span-3">
                <Card className="glass-card border-white/10 relative overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      ref={arViewRef}
                      className="ar-preview h-96 relative bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    >
                      {/* Live AR camera feed */}
                      <video
                        ref={arVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />

                      {/* AR Overlay Elements */}
                      <div className="absolute inset-0">
                        {/* Room Analysis Display */}
                        {roomAnalysis && (
                          <div className="absolute top-4 left-4 glass-card p-3 rounded-lg">
                            <div className="text-xs text-green-400 mb-1">
                              Room Detected
                            </div>
                            <div className="text-sm text-white font-medium">
                              {roomAnalysis.roomType}
                            </div>
                            <div className="text-xs text-gray-300">
                              {roomAnalysis.size} • {roomAnalysis.lighting}{" "}
                              lighting
                            </div>
                          </div>
                        )}

                        {/* AR Recommendations Overlay */}
                        {showRecommendations &&
                          arRecommendations.map((rec, index) => (
                            <div
                              key={index}
                              className="absolute bg-blue-500/80 backdrop-blur-sm rounded-lg p-2 cursor-pointer hover:bg-blue-600/80 transition-colors"
                              style={{
                                left: `${50 + rec.position.x * 100}px`,
                                top: `${200 + rec.position.z * 50}px`,
                                transform: `rotate(${rec.rotation}deg)`,
                              }}
                              onClick={() => placeFurniture(rec.furniture)}
                            >
                              <div className="flex items-center gap-2">
                                <rec.furniture.icon className="w-4 h-4 text-white" />
                                <div>
                                  <div className="text-xs text-white font-medium">
                                    {rec.furniture.name}
                                  </div>
                                  <div className="text-xs text-blue-200">
                                    {rec.confidence}% match
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-white/80 mt-1">
                                {rec.reason}
                              </div>
                            </div>
                          ))}

                        {/* Placement indicator */}
                        {isPlacing && selectedFurniture && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 border-4 border-green-400 rounded-full animate-pulse flex items-center justify-center bg-green-400/20">
                              <selectedFurniture.icon className="w-8 h-8 text-green-400" />
                            </div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                              <div className="text-xs text-green-400 font-medium">
                                {selectedFurniture.name}
                              </div>
                              <div className="text-xs text-white">
                                {selectedFurniture.price}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Placed items */}
                        {placedItems.map((itemId, index) => (
                          <div
                            key={itemId}
                            className="absolute w-8 h-8 bg-green-500/80 rounded-full flex items-center justify-center animate-pulse border-2 border-white"
                            style={{
                              left: `${30 + index * 15}%`,
                              top: `${60 + index * 8}%`,
                            }}
                          >
                            <Box className="w-4 h-4 text-white" />
                          </div>
                        ))}

                        {/* AR UI Elements */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card border-white/20 w-12 h-12 p-0"
                            onClick={() =>
                              setShowRecommendations(!showRecommendations)
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="glass-card border-white/20 w-12 h-12 p-0"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* AR Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {isPlacing ? (
                          <>
                            <Button
                              onClick={confirmPlacement}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Place Here
                            </Button>
                            <Button
                              onClick={() => setIsPlacing(false)}
                              variant="outline"
                              className="glass-card border-white/20"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={stopAR}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Square className="w-4 h-4 mr-2" />
                              Stop AR
                            </Button>
                            <Button
                              variant="outline"
                              className="glass-card border-white/20"
                            >
                              <Camera className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              className="glass-card border-white/20"
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>

                      {/* AR Instructions */}
                      <div className="absolute bottom-20 left-4 glass-card p-3 rounded-lg max-w-xs">
                        <p className="text-sm text-white">
                          {isPlacing
                            ? `Move your device to position ${selectedFurniture?.name}. Tap "Place Here" when ready.`
                            : showRecommendations
                              ? "AI recommendations shown as blue overlays. Tap any recommendation to place furniture."
                              : "Enable recommendations with the eye icon to see AI-suggested furniture placements."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3D Controls */}
                <div className="mt-4 grid grid-cols-5 gap-2">
                  <Button
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <Move className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* AR Recommendations & Furniture Selector */}
              <div className="space-y-6">
                {/* AI Recommendations */}
                {arRecommendations.length > 0 && (
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="w-5 h-5 text-blue-400" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {arRecommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="glass-card p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-all"
                          onClick={() => placeFurniture(rec.furniture)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
                              <rec.furniture.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-white">
                                {rec.furniture.name}
                              </h4>
                              <p className="text-xs text-blue-300">
                                {rec.furniture.price}
                              </p>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                              {rec.confidence}%
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-300">{rec.reason}</p>
                          <div className="flex gap-2 mt-2">
                            <a
                              href={rec.furniture.ikeaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                              onClick={(e) => e.stopPropagation()}
                            >
                              IKEA
                            </a>
                            <a
                              href={rec.furniture.amazonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Amazon
                            </a>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* All Furniture */}
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>All Furniture</span>
                      {roomAnalysis && (
                        <Badge variant="secondary" className="text-xs">
                          {roomAnalysis.roomType}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {furnitureDatabase
                      .filter(
                        (item) =>
                          !roomAnalysis ||
                          item.roomType === roomAnalysis.roomType ||
                          item.roomType === "Any",
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`glass-card p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedFurniture?.id === item.id
                              ? "border-purple-500/50 bg-purple-500/10"
                              : "border-white/10 hover:border-purple-500/30"
                          }`}
                          onClick={() => placeFurniture(item)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-400">
                                {item.price}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.dimensions}
                              </p>
                            </div>
                            {item.arRecommended && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                AR Ready
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Placed Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {placedItems.length === 0 ? (
                      <div className="text-center text-gray-400 py-4">
                        <Box className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No items placed yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {placedItems.map((itemId, index) => {
                          const item = furnitureItems.find(
                            (f) => f.id === itemId,
                          );
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{item?.name}</span>
                              <Button size="sm" variant="ghost">
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
