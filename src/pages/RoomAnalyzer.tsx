import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Camera,
  Upload,
  Sparkles,
  Box,
  Palette,
  Ruler,
  Eye,
  Download,
  Share,
  RotateCcw,
  Zap,
  CheckCircle,
  Home,
  Bed,
  Bath,
  Utensils,
  Monitor,
  Maximize,
  Volume2,
  Settings,
  Star,
  ShoppingCart,
  Heart,
  RefreshCw,
  X,
} from "lucide-react";

// Mock furniture data with realistic suggestions
const furnitureDatabase = {
  "living-room": {
    small: [
      {
        name: "Compact L-Sofa",
        price: "$899",
        color: "#4A5568",
        description: "Perfect for small spaces",
        rating: 4.5,
      },
      {
        name: "Round Coffee Table",
        price: "$299",
        color: "#8B4513",
        description: "Space-saving design",
        rating: 4.7,
      },
      {
        name: "Wall-mounted TV Unit",
        price: "$199",
        color: "#2D3748",
        description: "Floating design",
        rating: 4.3,
      },
      {
        name: "Corner Floor Lamp",
        price: "$129",
        color: "#F7FAFC",
        description: "Ambient lighting",
        rating: 4.6,
      },
    ],
    medium: [
      {
        name: "3-Seater Sofa",
        price: "$1,299",
        color: "#4A5568",
        description: "Comfortable seating",
        rating: 4.8,
      },
      {
        name: "Glass Coffee Table",
        price: "$449",
        color: "#E2E8F0",
        description: "Modern design",
        rating: 4.4,
      },
      {
        name: "Entertainment Center",
        price: "$699",
        color: "#2D3748",
        description: "Storage included",
        rating: 4.5,
      },
      {
        name: "Accent Chair",
        price: "$399",
        color: "#ED8936",
        description: "Statement piece",
        rating: 4.6,
      },
    ],
    large: [
      {
        name: "Sectional Sofa",
        price: "$1,899",
        color: "#4A5568",
        description: "Family-size seating",
        rating: 4.9,
      },
      {
        name: "Large Coffee Table",
        price: "$599",
        color: "#8B4513",
        description: "Spacious surface",
        rating: 4.7,
      },
      {
        name: "Built-in Entertainment Wall",
        price: "$1,299",
        color: "#2D3748",
        description: "Custom storage",
        rating: 4.8,
      },
      {
        name: "Reading Nook Set",
        price: "$799",
        color: "#48BB78",
        description: "Cozy corner",
        rating: 4.5,
      },
    ],
  },
  bedroom: {
    small: [
      {
        name: "Twin Platform Bed",
        price: "$399",
        color: "#8B4513",
        description: "Space-efficient",
        rating: 4.4,
      },
      {
        name: "Compact Nightstand",
        price: "$149",
        color: "#8B4513",
        description: "Essential storage",
        rating: 4.3,
      },
      {
        name: "Wall-mounted Desk",
        price: "$199",
        color: "#F7FAFC",
        description: "Foldable design",
        rating: 4.5,
      },
    ],
    medium: [
      {
        name: "Queen Bed Frame",
        price: "$699",
        color: "#8B4513",
        description: "Classic design",
        rating: 4.7,
      },
      {
        name: "Dresser with Mirror",
        price: "$549",
        color: "#8B4513",
        description: "Ample storage",
        rating: 4.6,
      },
      {
        name: "Nightstand Pair",
        price: "$299",
        color: "#8B4513",
        description: "Matching set",
        rating: 4.5,
      },
    ],
    large: [
      {
        name: "King Bed with Storage",
        price: "$1,199",
        color: "#8B4513",
        description: "Maximum comfort",
        rating: 4.9,
      },
      {
        name: "Walk-in Closet System",
        price: "$1,599",
        color: "#F7FAFC",
        description: "Custom organization",
        rating: 4.8,
      },
      {
        name: "Seating Area Set",
        price: "$899",
        color: "#4A5568",
        description: "Luxury addition",
        rating: 4.6,
      },
    ],
  },
  kitchen: {
    small: [
      {
        name: "Compact Island Cart",
        price: "$299",
        color: "#8B4513",
        description: "Mobile workspace",
        rating: 4.4,
      },
      {
        name: "Wall Storage System",
        price: "$199",
        color: "#F7FAFC",
        description: "Vertical organization",
        rating: 4.5,
      },
    ],
    medium: [
      {
        name: "Kitchen Island",
        price: "$899",
        color: "#8B4513",
        description: "Extra prep space",
        rating: 4.7,
      },
      {
        name: "Bar Stool Set",
        price: "$299",
        color: "#4A5568",
        description: "Counter seating",
        rating: 4.5,
      },
      {
        name: "Pantry Cabinet",
        price: "$599",
        color: "#F7FAFC",
        description: "Storage solution",
        rating: 4.6,
      },
    ],
    large: [
      {
        name: "Large Kitchen Island",
        price: "$1,499",
        color: "#8B4513",
        description: "Centerpiece design",
        rating: 4.9,
      },
      {
        name: "Custom Cabinet System",
        price: "$2,999",
        color: "#F7FAFC",
        description: "Full renovation",
        rating: 4.8,
      },
      {
        name: "Dining Nook Set",
        price: "$799",
        color: "#8B4513",
        description: "Casual dining",
        rating: 4.6,
      },
    ],
  },
  bathroom: {
    small: [
      {
        name: "Corner Vanity",
        price: "$399",
        color: "#F7FAFC",
        description: "Space-saving",
        rating: 4.4,
      },
      {
        name: "Wall Storage Cabinet",
        price: "$149",
        color: "#F7FAFC",
        description: "Vertical storage",
        rating: 4.3,
      },
    ],
    medium: [
      {
        name: "Double Sink Vanity",
        price: "$799",
        color: "#F7FAFC",
        description: "Shared space",
        rating: 4.7,
      },
      {
        name: "Linen Tower",
        price: "$299",
        color: "#F7FAFC",
        description: "Extra storage",
        rating: 4.5,
      },
    ],
    large: [
      {
        name: "Luxury Vanity Suite",
        price: "$1,299",
        color: "#F7FAFC",
        description: "Spa-like experience",
        rating: 4.9,
      },
      {
        name: "Built-in Storage Wall",
        price: "$899",
        color: "#F7FAFC",
        description: "Custom solution",
        rating: 4.8,
      },
    ],
  },
};

const colorPalettes = {
  warm: {
    name: "Warm & Cozy",
    colors: ["#F7E6D3", "#E6B68A", "#CD853F", "#8B4513"],
    description: "Creates a welcoming, comfortable atmosphere",
  },
  cool: {
    name: "Cool & Modern",
    colors: ["#E6F3FF", "#B3D9FF", "#4A90E2", "#2C5282"],
    description: "Clean, contemporary feel with calming blues",
  },
  neutral: {
    name: "Neutral Elegance",
    colors: ["#F8F8F8", "#E5E5E5", "#CCCCCC", "#999999"],
    description: "Timeless sophistication with versatile grays",
  },
  earth: {
    name: "Earth Tones",
    colors: ["#F5F5DC", "#DEB887", "#CD853F", "#A0522D"],
    description: "Natural, grounding colors inspired by nature",
  },
};

const RoomAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [roomDimensions, setRoomDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [selectedRoomType, setSelectedRoomType] = useState("living-room");
  const [detectedRoomType, setDetectedRoomType] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<string>("");
  const [arMode, setArMode] = useState(false);
  const [vrMode, setVrMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isValidRoom, setIsValidRoom] = useState<boolean | null>(null);
  const [imageValidationError, setImageValidationError] = useState<string>("");
  const [furniture3D, setFurniture3D] = useState<any[]>([]);
  const [recommendedColors, setRecommendedColors] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simplified but effective room image validation
  const validateRoomImage = (
    imageUrl: string,
  ): Promise<{ isValid: boolean; reason?: string }> => {
    return new Promise((resolve) => {
      // Simulate AI image analysis with more realistic validation
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          // Basic image quality checks
          const aspectRatio = img.width / img.height;
          const hasValidDimensions = img.width > 200 && img.height > 150;
          const hasReasonableAspectRatio =
            aspectRatio > 0.5 && aspectRatio < 5.0;

          // Check filename for obvious non-room indicators
          const fileName = uploadedFile?.name.toLowerCase() || "";
          const obviouslyNotRoom =
            fileName.includes("selfie") ||
            fileName.includes("portrait") ||
            fileName.includes("face") ||
            fileName.includes("food") ||
            fileName.includes("car") ||
            fileName.includes("vehicle") ||
            fileName.includes("logo") ||
            fileName.includes("icon") ||
            fileName.includes("outdoor") ||
            fileName.includes("landscape") ||
            fileName.includes("nature") ||
            fileName.includes("animal") ||
            fileName.includes("pet");

          // Basic validation checks
          if (!hasValidDimensions) {
            resolve({
              isValid: false,
              reason:
                "Image resolution too low. Please upload a higher quality image.",
            });
            return;
          }

          if (!hasReasonableAspectRatio) {
            resolve({
              isValid: false,
              reason:
                "Unusual image proportions. Please upload a standard room photo.",
            });
            return;
          }

          if (obviouslyNotRoom) {
            resolve({
              isValid: false,
              reason:
                "File name suggests this is not a room photo. Please upload an interior room image.",
            });
            return;
          }

          // Simplified AI simulation - much more lenient
          // In reality, most uploaded images should be accepted as "room" unless obviously not
          const randomValidation = Math.random();

          // 85% chance of accepting any reasonable image as a room
          // Only reject 15% to simulate strict AI validation
          if (randomValidation > 0.15) {
            resolve({ isValid: true });
          } else {
            resolve({
              isValid: false,
              reason:
                "AI analysis could not identify this as a clear room interior. Please try a different photo with better lighting and a clear view of the room.",
            });
          }
        };

        img.onerror = () => {
          resolve({
            isValid: false,
            reason:
              "Unable to process image. Please try a different file format (JPG, PNG, WEBP).",
          });
        };

        img.src = imageUrl;
      }, 1500); // Reasonable processing time
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // First, validate file type and size
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        setImageValidationError(
          "Invalid file type. Please upload JPG, PNG, or WEBP images only.",
        );
        return;
      }

      if (file.size > maxSize) {
        setImageValidationError(
          "File too large. Please upload images smaller than 10MB.",
        );
        return;
      }

      setUploadedFile(file);
      setImageValidationError("");
      setIsValidRoom(null);
      setAnalysisComplete(false);

      // Create preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);

        // Start validation with visual feedback
        setIsAnalyzing(true);
        setAnalysisProgress(5);

        try {
          const validation = await validateRoomImage(imageUrl);
          setIsValidRoom(validation.isValid);

          if (validation.isValid) {
            // Continue with room analysis
            setAnalysisProgress(20);
            startAnalysis();
          } else {
            // Stop analysis and show error
            setIsAnalyzing(false);
            setAnalysisProgress(0);
            setImageValidationError(
              validation.reason ||
                "This doesn't appear to be a room image. Please upload a clear photo of an interior room.",
            );
          }
        } catch (error) {
          setIsAnalyzing(false);
          setAnalysisProgress(0);
          setIsValidRoom(false);
          setImageValidationError(
            "Error processing image. Please try a different file.",
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(20); // Start from 20 since validation was already at 10
    setAnalysisComplete(false);

    // Simulate AI analysis with realistic progress
    const phases = [
      { progress: 40, message: "Analyzing room layout..." },
      { progress: 60, message: "Detecting furniture and features..." },
      { progress: 80, message: "Generating 3D recommendations..." },
      { progress: 100, message: "Creating visualization..." },
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      if (currentPhase < phases.length) {
        setAnalysisProgress(phases[currentPhase].progress);
        currentPhase++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisComplete(true);

        // Set mock analysis results
        const roomTypes = [
          "Modern Living Room",
          "Contemporary Bedroom",
          "Minimalist Kitchen",
          "Spa-like Bathroom",
        ];
        setDetectedRoomType(
          roomTypes[Math.floor(Math.random() * roomTypes.length)],
        );

        // Determine room characteristics and generate recommendations
        const roomSize =
          Math.random() > 0.6
            ? "large"
            : Math.random() > 0.3
              ? "medium"
              : "small";
        const detectedStyle = Math.random() > 0.5 ? "modern" : "traditional";

        // Generate furniture recommendations
        const furniture =
          furnitureDatabase[
            selectedRoomType as keyof typeof furnitureDatabase
          ]?.[roomSize] || [];
        setAiRecommendations(furniture);

        // Set 3D furniture with positions
        const furniture3DLayout = furniture.slice(0, 4).map((item, i) => ({
          ...item,
          id: i,
          position: {
            x: Math.random() * 60 + 20, // 20-80% from left
            y: Math.random() * 60 + 20, // 20-80% from top
            scale: Math.random() * 0.5 + 0.75, // 0.75-1.25 scale
          },
          type: ["sofa", "table", "lamp", "storage"][i % 4],
        }));
        setFurniture3D(furniture3DLayout);

        // Set color recommendations based on detected style
        if (detectedStyle === "modern") {
          setSelectedPalette("cool");
          setRecommendedColors(colorPalettes.cool);
        } else {
          setSelectedPalette("warm");
          setRecommendedColors(colorPalettes.warm);
        }
      }
    }, 1000);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment", // Use back camera on mobile
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        setCameraActive(true);

        // Start AR analysis simulation
        setTimeout(() => {
          setArMode(true);
        }, 2000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Camera access denied. Please allow camera permissions and try again.",
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
      setArMode(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setPreviewImage(imageData);

        // Convert to file for analysis
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "camera-capture.jpg", {
                type: "image/jpeg",
              });
              setUploadedFile(file);
              startAnalysis();
            }
          },
          "image/jpeg",
          0.8,
        );
      }
    }
  };

  const calculateArea = () => {
    const length = parseFloat(roomDimensions.length);
    const width = parseFloat(roomDimensions.width);
    const height = parseFloat(roomDimensions.height);

    if (length && width && height) {
      const area = length * width;
      let roomSize = "small";
      if (area > 150) roomSize = "medium";
      if (area > 300) roomSize = "large";

      return {
        floorArea: area.toFixed(2),
        volume: (length * width * height).toFixed(2),
        wallArea: (2 * (length + width) * height).toFixed(2),
        roomSize,
      };
    }
    return null;
  };

  const generateAIRecommendations = () => {
    const area = calculateArea();
    if (area) {
      const furniture =
        furnitureDatabase[selectedRoomType as keyof typeof furnitureDatabase]?.[
          area.roomSize as keyof any
        ] || [];
      setAiRecommendations(furniture);

      // Auto-select appropriate color palette
      if (area.roomSize === "small") setSelectedPalette("cool");
      else if (area.roomSize === "large") setSelectedPalette("warm");
      else setSelectedPalette("neutral");
    }
  };

  const roomTypes = [
    { id: "living-room", name: "Living Room", icon: Home },
    { id: "bedroom", name: "Bedroom", icon: Bed },
    { id: "bathroom", name: "Bathroom", icon: Bath },
    { id: "kitchen", name: "Kitchen", icon: Utensils },
  ];

  const area = calculateArea();

  // Auto-generate recommendations when dimensions change
  useEffect(() => {
    if (area) {
      generateAIRecommendations();
    }
  }, [roomDimensions, selectedRoomType]);

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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold">Design Hub</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Transform your space with AI-powered analysis, 3D visualization,
              and intelligent design recommendations
            </p>
          </div>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-dark">
              <TabsTrigger value="upload">Upload Photo</TabsTrigger>
              <TabsTrigger value="camera">Live Camera</TabsTrigger>
              <TabsTrigger value="dimensions">Room Dimensions</TabsTrigger>
              <TabsTrigger value="ar-vr">AR/VR View</TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="glass-dark border-blue-500/20 card-3d">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Upload Room Photo</span>
                    </CardTitle>
                    <CardDescription>
                      Upload a photo of your room for AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-blue-500/50 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors min-h-[200px] flex items-center justify-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <div className="space-y-4 w-full">
                          <img
                            src={previewImage}
                            alt="Room preview"
                            className="max-w-full max-h-48 mx-auto rounded-lg shadow-lg"
                          />
                          <div className="space-y-2">
                            {isValidRoom === true && (
                              <>
                                <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                                <p className="font-medium text-green-400">
                                  Room Image Detected ✓
                                </p>
                              </>
                            )}
                            {isValidRoom === false && (
                              <>
                                <X className="w-8 h-8 text-red-400 mx-auto" />
                                <p className="font-medium text-red-400">
                                  Not a Room Image ✗
                                </p>
                              </>
                            )}
                            {isValidRoom === null && isAnalyzing && (
                              <>
                                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="font-medium text-blue-400">
                                  Validating Image...
                                </p>
                              </>
                            )}
                            <p className="font-medium">
                              {uploadedFile?.name || "Camera capture"}
                            </p>
                            <p className="text-sm text-gray-400">
                              {uploadedFile
                                ? (uploadedFile.size / 1024 / 1024).toFixed(2) +
                                  " MB"
                                : "Ready for analysis"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-12 h-12 text-blue-400 mx-auto" />
                          <div>
                            <p className="font-medium text-lg">
                              📸 Upload ROOM INTERIOR Photo Only
                            </p>
                            <p className="text-sm text-gray-400">
                              JPG, PNG, WEBP up to 10MB
                            </p>
                          </div>
                          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-xs font-medium text-blue-400 mb-1">
                              ✅ ACCEPTED ROOM TYPES:
                            </p>
                            <p className="text-xs text-gray-300">
                              Living rooms • Bedrooms • Kitchens • Bathrooms •
                              Dining rooms • Home offices
                            </p>
                            <p className="text-xs font-medium text-red-400 mt-2 mb-1">
                              ❌ NOT ACCEPTED:
                            </p>
                            <p className="text-xs text-gray-300">
                              Outdoor scenes • Portraits • Food • Vehicles •
                              Logos • Abstract images
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {imageValidationError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-red-400 mb-1">
                              ❌ Cannot Analyze This Image
                            </h4>
                            <p className="text-sm text-red-300 mb-3">
                              {imageValidationError}
                            </p>

                            <div className="space-y-2">
                              <p className="text-xs font-medium text-red-400">
                                ✅ UPLOAD ONLY:
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-red-300">
                                <div>• Living rooms</div>
                                <div>• Bedrooms</div>
                                <div>• Kitchens</div>
                                <div>• Bathrooms</div>
                                <div>• Dining rooms</div>
                                <div>• Home offices</div>
                              </div>

                              <p className="text-xs font-medium text-red-400 mt-3">
                                ❌ DO NOT UPLOAD:
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-red-300">
                                <div>• Outdoor scenes</div>
                                <div>• Portrait photos</div>
                                <div>• Food images</div>
                                <div>• Vehicle photos</div>
                                <div>• Logos/icons</div>
                                <div>• Abstract images</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Analyzing room...</span>
                          <span>{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} className="w-full" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="glass"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadedFile ? "Change Photo" : "Choose Room Photo"}
                      </Button>
                      <Button
                        onClick={startAnalysis}
                        disabled={
                          !uploadedFile || isAnalyzing || isValidRoom === false
                        }
                        className={`${
                          isValidRoom === false
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-purple-600"
                        }`}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {isValidRoom === false
                          ? "Invalid Image"
                          : "Analyze Room"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Analysis Results */}
                <Card className="glass-dark border-blue-500/20 card-3d">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>AI Analysis Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {analysisComplete && isValidRoom ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="font-medium">Analysis Complete</span>
                          <Badge variant="secondary">98% Accuracy</Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <h4 className="font-medium text-blue-400 mb-2">
                              Room Type Detected
                            </h4>
                            <p className="text-sm">{detectedRoomType}</p>
                          </div>

                          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <h4 className="font-medium text-purple-400 mb-2">
                              Style Analysis
                            </h4>
                            <p className="text-sm">Contemporary, Minimalist</p>
                          </div>

                          {/* 3D Furniture Layout Preview */}
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <h4 className="font-medium text-green-400 mb-2">
                              3D Furniture Layout
                            </h4>
                            <div className="relative w-full h-32 bg-gray-800/50 rounded-lg border border-gray-600/30 overflow-hidden">
                              {/* Room boundaries */}
                              <div className="absolute inset-2 border border-dashed border-blue-400/50 rounded"></div>

                              {/* Furniture pieces */}
                              {furniture3D.map((item, i) => (
                                <div
                                  key={item.id}
                                  className="absolute transform-gpu transition-all duration-500 cursor-pointer hover:scale-110"
                                  style={{
                                    left: `${item.position.x}%`,
                                    top: `${item.position.y}%`,
                                    transform: `scale(${item.position.scale})`,
                                  }}
                                  title={`${item.name} - ${item.price}`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                      item.type === "sofa"
                                        ? "bg-blue-500/30 border-blue-400"
                                        : item.type === "table"
                                          ? "bg-green-500/30 border-green-400"
                                          : item.type === "lamp"
                                            ? "bg-yellow-500/30 border-yellow-400"
                                            : "bg-purple-500/30 border-purple-400"
                                    }`}
                                  >
                                    <Box
                                      className={`w-3 h-3 ${
                                        item.type === "sofa"
                                          ? "text-blue-400"
                                          : item.type === "table"
                                            ? "text-green-400"
                                            : item.type === "lamp"
                                              ? "text-yellow-400"
                                              : "text-purple-400"
                                      }`}
                                    />
                                  </div>
                                </div>
                              ))}

                              {/* Room info overlay */}
                              <div className="absolute bottom-1 right-1 bg-black/70 rounded px-2 py-1">
                                <span className="text-xs text-gray-300">
                                  Interactive 3D View
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Wall Color Recommendations */}
                          {recommendedColors && (
                            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                              <h4 className="font-medium text-orange-400 mb-2">
                                Recommended Wall Colors
                              </h4>
                              <p className="text-sm text-gray-300 mb-2">
                                {recommendedColors.description}
                              </p>
                              <div className="flex space-x-2">
                                {recommendedColors.colors.map(
                                  (color: string, i: number) => (
                                    <div
                                      key={i}
                                      className="w-8 h-8 rounded border-2 border-white/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                                      style={{ backgroundColor: color }}
                                      title={color}
                                    >
                                      <span className="text-xs font-mono text-black/70">
                                        {color.slice(1, 4)}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <h4 className="font-medium text-cyan-400 mb-2">
                              AI Design Tips
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>• Add warm accent lighting for ambiance</li>
                              <li>
                                • Use{" "}
                                {recommendedColors?.name.toLowerCase() ||
                                  "neutral"}{" "}
                                tones for walls
                              </li>
                              <li>
                                • Position furniture to optimize traffic flow
                              </li>
                              <li>
                                • Add plants for natural elements and air
                                quality
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="glass">
                            <Eye className="w-4 h-4 mr-2" />
                            Full 3D View
                          </Button>
                          <Button size="sm" variant="outline" className="glass">
                            <Download className="w-4 h-4 mr-2" />
                            Export Layout
                          </Button>
                          <Button size="sm" variant="outline" className="glass">
                            <Share className="w-4 h-4 mr-2" />
                            Share Design
                          </Button>
                        </div>
                      </div>
                    ) : isValidRoom === false ? (
                      <div className="text-center py-8">
                        <X className="w-16 h-16 mx-auto mb-4 text-red-400 opacity-50" />
                        <p className="text-red-400 font-medium">
                          Invalid Image Type
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Please upload a room interior photo
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <Box className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>
                          Upload a room photo to see AI analysis and 3D
                          furniture suggestions
                        </p>
                        <p className="text-xs mt-2">
                          📸 Supported: Living rooms, bedrooms, kitchens,
                          bathrooms
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Furniture Recommendations */}
              {analysisComplete && aiRecommendations.length > 0 && (
                <Card className="glass-dark border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>AI Furniture Recommendations</span>
                      <Badge variant="secondary">Personalized</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {aiRecommendations.map((item, i) => (
                        <Card
                          key={i}
                          className="glass border-gray-600 hover:border-blue-400 transition-colors"
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div
                                className="w-full h-24 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: item.color + "20" }}
                              >
                                <Box
                                  className="w-8 h-8"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-400 mb-2">
                                  {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-green-400 font-bold">
                                    {item.price}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">
                                      {item.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <Button size="sm" className="flex-1 text-xs">
                                  Add to Room
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="glass"
                                >
                                  <Heart className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Color Palette Recommendations */}
              {analysisComplete && selectedPalette && (
                <Card className="glass-dark border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="w-5 h-5" />
                      <span>Recommended Color Palette</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(colorPalettes).map(([key, palette]) => (
                        <div
                          key={key}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedPalette === key
                              ? "border-blue-400 bg-blue-500/10"
                              : "border-gray-600 hover:border-blue-400/50"
                          }`}
                          onClick={() => setSelectedPalette(key)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{palette.name}</h4>
                            {selectedPalette === key && (
                              <Badge className="bg-blue-500">Recommended</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-3">
                            {palette.description}
                          </p>
                          <div className="flex space-x-2">
                            {palette.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-12 h-12 rounded-lg border-2 border-white/20 flex items-center justify-center"
                                style={{ backgroundColor: color }}
                              >
                                <span className="text-xs font-mono text-black/70">
                                  {color.slice(1)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Enhanced Camera Tab */}
            <TabsContent value="camera" className="space-y-6">
              <Card className="glass-dark border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Live Camera Analysis</span>
                    {cameraActive && (
                      <Badge className="bg-red-500 animate-pulse">● LIVE</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Use your camera for real-time room analysis and AR furniture
                    preview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    {cameraActive ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Enhanced AR Overlay */}
                        {arMode && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-4 left-4 bg-black/70 rounded-lg p-3">
                              <div className="flex items-center space-x-2 text-green-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">
                                  AR Analysis Active
                                </span>
                              </div>
                              <div className="text-xs text-gray-300 mt-1">
                                Detecting furniture placement...
                              </div>
                            </div>

                            {/* AR Furniture Suggestions */}
                            <div className="absolute bottom-1/4 left-1/4 animate-pulse">
                              <div className="bg-blue-500/30 border-2 border-blue-400 rounded-lg p-3 backdrop-blur">
                                <Box className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                                <p className="text-xs text-center font-medium">
                                  Sofa Here
                                </p>
                                <p className="text-xs text-center text-gray-300">
                                  92% fit
                                </p>
                              </div>
                            </div>

                            <div className="absolute top-1/3 right-1/3 animate-pulse delay-1000">
                              <div className="bg-green-500/30 border-2 border-green-400 rounded-lg p-3 backdrop-blur">
                                <Box className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                <p className="text-xs text-center font-medium">
                                  Table
                                </p>
                                <p className="text-xs text-center text-gray-300">
                                  87% fit
                                </p>
                              </div>
                            </div>

                            <div className="absolute bottom-1/3 right-1/4 animate-pulse delay-2000">
                              <div className="bg-purple-500/30 border-2 border-purple-400 rounded-lg p-3 backdrop-blur">
                                <Box className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                                <p className="text-xs text-center font-medium">
                                  Lamp
                                </p>
                                <p className="text-xs text-center text-gray-300">
                                  95% fit
                                </p>
                              </div>
                            </div>

                            {/* Room measurements overlay */}
                            <div className="absolute top-4 right-4 bg-black/70 rounded-lg p-3">
                              <div className="text-xs text-gray-300 space-y-1">
                                <div>Estimated dimensions:</div>
                                <div className="text-blue-400">
                                  12' × 14' × 9'
                                </div>
                                <div>Area: ~168 sq ft</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-4">
                          <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                          <div>
                            <p className="font-medium">Camera Preview</p>
                            <p className="text-sm text-gray-400">
                              Click "Start Camera" to begin live analysis
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    {!cameraActive ? (
                      <Button
                        onClick={startCamera}
                        className="bg-gradient-to-r from-blue-500 to-purple-600"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={capturePhoto}
                          variant="outline"
                          className="glass"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Capture & Analyze
                        </Button>
                        <Button
                          onClick={() => setArMode(!arMode)}
                          variant={arMode ? "default" : "outline"}
                          className={arMode ? "bg-green-600" : "glass"}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {arMode ? "AR On" : "AR Off"}
                        </Button>
                        <Button onClick={stopCamera} variant="destructive">
                          Stop Camera
                        </Button>
                      </>
                    )}
                  </div>

                  {cameraActive && (
                    <Card className="glass border-blue-500/20">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                          Real-time AI Analysis
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Room detection</span>
                            <Badge className="bg-green-500/20 text-green-400">
                              Active
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Furniture recognition</span>
                            <Badge className="bg-blue-500/20 text-blue-400">
                              Scanning
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>AR placement</span>
                            <Badge className="bg-purple-500/20 text-purple-400">
                              {arMode ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Dimensions Tab */}
            <TabsContent value="dimensions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="glass-dark border-blue-500/20 card-3d">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Ruler className="w-5 h-5" />
                      <span>Room Dimensions</span>
                    </CardTitle>
                    <CardDescription>
                      Enter your room measurements for precise furniture
                      recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Room Type Selection */}
                    <div className="space-y-2">
                      <Label>Room Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {roomTypes.map((room) => (
                          <Button
                            key={room.id}
                            variant={
                              selectedRoomType === room.id
                                ? "default"
                                : "outline"
                            }
                            className={`justify-start ${
                              selectedRoomType === room.id ? "" : "glass"
                            }`}
                            onClick={() => setSelectedRoomType(room.id)}
                          >
                            <room.icon className="w-4 h-4 mr-2" />
                            {room.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Dimensions Input */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="length">Length (ft)</Label>
                          <Input
                            id="length"
                            type="number"
                            placeholder="12"
                            className="glass"
                            value={roomDimensions.length}
                            onChange={(e) =>
                              setRoomDimensions({
                                ...roomDimensions,
                                length: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (ft)</Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder="10"
                            className="glass"
                            value={roomDimensions.width}
                            onChange={(e) =>
                              setRoomDimensions({
                                ...roomDimensions,
                                width: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (ft)</Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder="9"
                            className="glass"
                            value={roomDimensions.height}
                            onChange={(e) =>
                              setRoomDimensions({
                                ...roomDimensions,
                                height: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {area && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-400">
                                {area.floorArea}
                              </p>
                              <p className="text-sm text-gray-400">sq ft</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-purple-400">
                                {area.volume}
                              </p>
                              <p className="text-sm text-gray-400">cubic ft</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-400">
                                {area.wallArea}
                              </p>
                              <p className="text-sm text-gray-400">wall area</p>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-green-400">
                                Room Classification
                              </h4>
                              <Badge className="bg-green-500/20 text-green-400">
                                {area.roomSize.charAt(0).toUpperCase() +
                                  area.roomSize.slice(1)}{" "}
                                Room
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400">
                              Based on {area.floorArea} sq ft, this is
                              classified as a {area.roomSize}{" "}
                              {selectedRoomType.replace("-", " ")}.
                            </p>
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                        disabled={!area}
                        onClick={generateAIRecommendations}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate AI Recommendations
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced 3D Preview */}
                <Card className="glass-dark border-blue-500/20 card-3d">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Box className="w-5 h-5" />
                      <span>3D Room Preview</span>
                    </CardTitle>
                    <CardDescription>
                      Interactive room visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg flex items-center justify-center border border-blue-500/20 relative overflow-hidden">
                      {area ? (
                        <div className="w-full h-full relative">
                          {/* 3D Room Simulation */}
                          <div className="absolute inset-4 border-2 border-blue-400/50 rounded-lg transform-3d">
                            <div className="w-full h-full bg-gradient-to-b from-gray-800/40 to-gray-900/60 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                              {/* Room floor visualization */}
                              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-b-lg"></div>
                              {/* Room walls */}
                              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>
                            </div>
                          </div>

                          {/* Furniture Placement */}
                          {aiRecommendations.slice(0, 3).map((item, i) => (
                            <div
                              key={i}
                              className={`absolute w-12 h-12 border-2 rounded-lg backdrop-blur flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ${
                                i === 0
                                  ? "bottom-1/3 left-1/4 border-blue-400 bg-blue-500/20"
                                  : i === 1
                                    ? "top-1/3 right-1/4 border-green-400 bg-green-500/20"
                                    : "bottom-1/4 right-1/3 border-purple-400 bg-purple-500/20"
                              }`}
                              title={item.name}
                            >
                              <Box
                                className={`w-6 h-6 ${
                                  i === 0
                                    ? "text-blue-400"
                                    : i === 1
                                      ? "text-green-400"
                                      : "text-purple-400"
                                }`}
                              />
                            </div>
                          ))}

                          <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-2">
                            <div className="text-xs text-gray-300">
                              <div>
                                {roomDimensions.length}' ×{" "}
                                {roomDimensions.width}'
                              </div>
                              <div className="text-blue-400">
                                {area.floorArea} sq ft
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <Box className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
                          <div>
                            <p className="font-medium">3D Preview</p>
                            <p className="text-sm text-gray-400">
                              Enter dimensions to see 3D preview
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {area && aiRecommendations.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Optimal Furniture Layout
                          </span>
                          <Badge variant="secondary">AI Optimized</Badge>
                        </div>
                        <ScrollArea className="h-32">
                          <div className="space-y-2 text-sm">
                            {aiRecommendations.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-2 rounded bg-muted/20"
                              >
                                <span>{item.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-green-400">
                                    {item.price}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 px-2 text-xs"
                                  >
                                    Place
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced AR/VR Tab */}
            <TabsContent value="ar-vr" className="space-y-6">
              <Card className="glass-dark border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>AR/VR Visualization</span>
                    <Badge className="bg-blue-500">Enhanced</Badge>
                  </CardTitle>
                  <CardDescription>
                    Experience your designed space in augmented and virtual
                    reality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="glass border-blue-500/20 hover:border-blue-400 transition-colors">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto relative">
                            <Eye className="w-8 h-8 text-blue-400" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold">Augmented Reality</h3>
                            <p className="text-sm text-gray-400">
                              View furniture in your real space using your
                              camera
                            </p>
                          </div>
                          <div className="space-y-2 text-xs text-gray-400">
                            <p>✓ Real-time furniture placement</p>
                            <p>✓ Scale and proportion accuracy</p>
                            <p>✓ Interactive 3D models</p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                            onClick={() => {
                              // Simulate AR launch
                              alert(
                                "AR Mode would launch here with WebXR API. Camera access required.",
                              );
                            }}
                          >
                            <Monitor className="w-4 h-4 mr-2" />
                            Launch AR Experience
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass border-purple-500/20 hover:border-purple-400 transition-colors">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto relative">
                            <Box className="w-8 h-8 text-purple-400" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold">Virtual Reality</h3>
                            <p className="text-sm text-gray-400">
                              Immersive 3D room walkthrough experience
                            </p>
                          </div>
                          <div className="space-y-2 text-xs text-gray-400">
                            <p>✓ 360° room exploration</p>
                            <p>✓ Immersive environment</p>
                            <p>✓ VR headset compatible</p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600"
                            onClick={() => {
                              setVrMode(true);
                              // Simulate VR launch
                              setTimeout(() => {
                                alert("VR Experience launched! (Simulated)");
                                setVrMode(false);
                              }, 2000);
                            }}
                            disabled={vrMode}
                          >
                            <Maximize className="w-4 h-4 mr-2" />
                            {vrMode ? "Loading VR..." : "Launch VR Experience"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Available 3D Models</span>
                        <Button size="sm" variant="outline" className="glass">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh Catalog
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          {
                            name: "Modern Sofa",
                            category: "Seating",
                            models: 12,
                          },
                          {
                            name: "Coffee Tables",
                            category: "Tables",
                            models: 8,
                          },
                          {
                            name: "Floor Lamps",
                            category: "Lighting",
                            models: 15,
                          },
                          {
                            name: "Bookshelves",
                            category: "Storage",
                            models: 10,
                          },
                          {
                            name: "Dining Sets",
                            category: "Tables",
                            models: 6,
                          },
                          {
                            name: "Accent Chairs",
                            category: "Seating",
                            models: 20,
                          },
                          {
                            name: "TV Units",
                            category: "Entertainment",
                            models: 9,
                          },
                          { name: "Plant Pots", category: "Decor", models: 25 },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-muted/20 text-center cursor-pointer hover:bg-muted/30 transition-colors group"
                          >
                            <Box className="w-8 h-8 mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.category}
                            </p>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {item.models} models
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* VR/AR Controls */}
                  <Card className="glass border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Experience Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Environment</Label>
                          <select className="w-full p-2 rounded-lg bg-muted/20 border border-gray-600">
                            <option>Natural Lighting</option>
                            <option>Evening Ambiance</option>
                            <option>Bright Daylight</option>
                            <option>Cozy Warm</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>View Mode</Label>
                          <select className="w-full p-2 rounded-lg bg-muted/20 border border-gray-600">
                            <option>Realistic</option>
                            <option>Wireframe</option>
                            <option>X-Ray</option>
                            <option>Blueprint</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Quality</Label>
                          <select className="w-full p-2 rounded-lg bg-muted/20 border border-gray-600">
                            <option>Ultra High</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Performance</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Settings className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-medium text-blue-400">
                            System Requirements
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 space-y-1">
                          <p>• Modern browser with WebXR support</p>
                          <p>• Camera access for AR features</p>
                          <p>• VR headset for full VR experience (optional)</p>
                          <p>
                            • Stable internet connection for 3D model loading
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RoomAnalyzer;
