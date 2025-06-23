import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  Upload,
  Sparkles,
  Download,
  Share2,
  Save,
  Palette,
  Move3D,
  Wand2,
  Eye,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Home,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { enhanced3DBackend } from "@/services/enhancedBackend";
import { Enhanced3DAnalysis, ColorSuggestion } from "@/types/ai";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomViewer3D from "@/components/3DRoomViewer";
import AuthModal from "@/components/AuthModal";

const PhotoAnalysis: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [modifiedImage, setModifiedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<Enhanced3DAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState("capture");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [colorAdjustments, setColorAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  // Camera Functions
  const startCamera = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Check if MediaDevices API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        variant: "destructive",
        title: "Camera not supported",
        description: "Your browser doesn't support camera access",
      });
      return;
    }

    try {
      console.log("📷 Starting camera...");
      setIsCameraActive(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      console.log("✅ Camera stream obtained");
      setCameraStream(stream);

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        // Handle video events
        video.onloadedmetadata = async () => {
          console.log("📼 Video metadata loaded");
          try {
            await video.play();
            console.log("✅ Video playing");
            toast({
              title: "📷 Camera Ready",
              description: "Point at your room and tap capture when ready",
            });
          } catch (playError) {
            console.error("❌ Play failed:", playError);
          }
        };

        video.oncanplay = () => {
          console.log(
            "✅ Video can play - dimensions:",
            video.videoWidth,
            "x",
            video.videoHeight,
          );
        };

        video.onerror = (e) => {
          console.error("❌ Video error:", e);
        };
      }
    } catch (error) {
      console.error("❌ Camera error:", error);
      setIsCameraActive(false);

      let errorMessage = "Unable to access camera";
      if (error instanceof Error) {
        switch (error.name) {
          case "NotAllowedError":
            errorMessage =
              "Camera permission denied. Please allow camera access and refresh.";
            break;
          case "NotFoundError":
            errorMessage = "No camera found on this device";
            break;
          case "NotReadableError":
            errorMessage = "Camera is being used by another application";
            break;
          default:
            errorMessage = error.message || "Unknown camera error";
        }
      }

      toast({
        variant: "destructive",
        title: "Camera access failed",
        description: errorMessage,
      });
    }
  };

  const capturePhoto = async () => {
    console.log("📸 Capture photo initiated");

    if (!videoRef.current || !canvasRef.current) {
      console.error("❌ Video or canvas ref not available");
      toast({
        variant: "destructive",
        title: "Capture failed",
        description: "Camera components not ready",
      });
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    console.log("📊 Video state:", {
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      readyState: video.readyState,
      paused: video.paused,
    });

    // Check if video is ready and has content
    if (!context) {
      toast({
        variant: "destructive",
        title: "Canvas error",
        description: "Browser doesn't support canvas",
      });
      return;
    }

    // Wait a moment if video dimensions aren't ready
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0 ||
      video.readyState < 3
    ) {
      toast({
        title: "⏳ Preparing capture...",
        description: "Waiting for camera to stabilize",
      });

      // Try again after delay
      setTimeout(() => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          capturePhoto();
        } else {
          toast({
            variant: "destructive",
            title: "Camera not ready",
            description: "Video feed is not available. Please restart camera.",
          });
        }
      }, 1000);
      return;
    }

    try {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Clear canvas first
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw current video frame (flip back to normal since video is mirrored)
      context.save();
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0);
      context.restore();

      console.log("✅ Image captured and drawn to canvas");

      // Get the image data
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

      // Show the captured image immediately
      setCapturedImage(dataUrl);
      setModifiedImage(dataUrl);

      // Stop camera
      stopCamera();

      toast({
        title: "📸 Photo Captured!",
        description: "Starting AI analysis...",
      });

      // Convert to blob for analysis
      canvas.toBlob(
        async (blob) => {
          if (blob && blob.size > 0) {
            console.log("✅ Blob created:", blob.size, "bytes");

            const file = new File([blob], `room-capture-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });

            // Start AI analysis
            await analyzeImage(file);
          } else {
            console.error("❌ Failed to create blob from canvas");
            toast({
              variant: "destructive",
              title: "Capture failed",
              description: "Could not save the captured image",
            });
          }
        },
        "image/jpeg",
        0.9,
      );
    } catch (error) {
      console.error("❌ Error during photo capture:", error);
      toast({
        variant: "destructive",
        title: "Capture error",
        description: "Failed to capture photo from camera stream",
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // File Upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
      });
      return;
    }

    console.log("📁 File uploaded:", file.name, file.size, "bytes");

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCapturedImage(result);
      setModifiedImage(result);
      console.log("🖼️ Image preview set");
    };
    reader.readAsDataURL(file);

    // Start analysis
    toast({
      title: "📁 File uploaded",
      description: "Starting AI analysis...",
    });

    await analyzeImage(file);
  };

  // AI Analysis
  const analyzeImage = async (file: File) => {
    console.log("🔬 Starting AI analysis for file:", file.name);

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysis(null); // Reset previous analysis

    try {
      // Step 1: Room Detection
      setProgress(25);
      console.log("🔍 Step 1: Room detection starting");
      toast({
        title: "🔍 Analyzing Image",
        description: "Checking if this is a room photo...",
      });

      const roomDetection = await enhanced3DBackend.detectRoom(file);
      console.log("🔍 Room detection result:", roomDetection);
      setProgress(50);

      if (!roomDetection.isRoom) {
        console.log("❌ Not a room image, stopping analysis");
        setProgress(0);
        toast({
          variant: "destructive",
          title: "❌ Not a Room Image",
          description: "Please upload an interior room photo for analysis",
        });
        return;
      }

      // Step 2: Full Analysis
      setProgress(75);
      console.log("✅ Room detected, starting full analysis");
      toast({
        title: "✅ Room Detected",
        description: "Generating furniture and color suggestions...",
      });

      const result = await enhanced3DBackend.analyze3DRoom(file);
      console.log("🎉 Analysis complete, result:", result);
      setProgress(100);
      setAnalysis(result);

      // Switch to analysis tab after completion
      setActiveTab("analysis");

      toast({
        title: "🎉 Analysis Complete!",
        description: `Found ${result.furnitureSuggestions.length} furniture and ${result.colorSuggestions.length} color suggestions`,
      });
    } catch (error) {
      console.error("❌ Analysis error:", error);
      setProgress(0);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Color Modification
  const applyColorAdjustments = useCallback(() => {
    if (!capturedImage || !imageCanvasRef.current) return;

    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters
      ctx!.filter = `
        brightness(${colorAdjustments.brightness}%)
        contrast(${colorAdjustments.contrast}%)
        saturate(${colorAdjustments.saturation}%)
        hue-rotate(${colorAdjustments.hue}deg)
      `;

      ctx!.drawImage(img, 0, 0);
      setModifiedImage(canvas.toDataURL("image/jpeg", 0.9));
    };

    img.src = capturedImage;
  }, [capturedImage, colorAdjustments]);

  // Apply color changes when adjustments change
  React.useEffect(() => {
    if (capturedImage) {
      applyColorAdjustments();
    }
  }, [colorAdjustments, applyColorAdjustments]);

  const resetAdjustments = () => {
    setColorAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    });
  };

  const applyColorSuggestion = (color: ColorSuggestion) => {
    // Apply suggested color adjustments
    setColorAdjustments({
      brightness: 105,
      contrast: 110,
      saturation: 120,
      hue: Math.random() * 30 - 15, // Random slight hue shift
    });

    toast({
      title: "Color Applied",
      description: `Applied ${color.name} color suggestion`,
    });
  };

  const downloadImage = () => {
    if (!modifiedImage) return;

    const link = document.createElement("a");
    link.href = modifiedImage;
    link.download = `enhanced-room-${Date.now()}.jpg`;
    link.click();

    toast({
      title: "Downloaded",
      description: "Enhanced image saved to your device",
    });
  };

  const resetPhoto = () => {
    console.log("🔄 Resetting photo analysis");
    setCapturedImage(null);
    setModifiedImage(null);
    setAnalysis(null);
    setProgress(0);
    setActiveTab("capture");
    setIsAnalyzing(false);
    resetAdjustments();
    stopCamera();

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      title: "Reset complete",
      description: "Ready for new photo analysis",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-300/20 to-indigo-400/20 rounded-full animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <Camera className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                AI Photo Analysis
              </span>
              <div className="ml-2 px-2 py-1 bg-white/60 rounded-full text-xs font-semibold text-blue-700">
                LIVE
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Capture & Analyze
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Dream Room
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unleash the power of AI to transform your space. Get instant
              furniture suggestions, color palettes, and immersive 3D
              visualizations tailored to your style.
            </p>
          </div>

          {/* Main Interface */}
          <Card className="w-full shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-white to-blue-50/50 border-b border-blue-100/50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      AI Room Analysis Studio
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Professional interior design insights
                    </p>
                  </div>
                </div>
                {capturedImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetPhoto}
                    className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New Photo
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-100 to-blue-50 p-1 rounded-xl border border-blue-100/50">
                  <TabsTrigger
                    value="capture"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-200/50 rounded-lg transition-all duration-200"
                  >
                    <Camera className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="font-medium">Capture</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="colors"
                    disabled={!capturedImage}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-purple-200/50 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <Palette className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="font-medium">Colors</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    disabled={!analysis}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-green-200/50 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium">Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="3d"
                    disabled={!analysis}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-indigo-200/50 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <Move3D className="h-4 w-4 mr-2 text-indigo-600" />
                    <span className="font-medium">3D View</span>
                  </TabsTrigger>
                </TabsList>

                {/* Capture Tab */}
                <TabsContent value="capture" className="space-y-6">
                  {!capturedImage && !isCameraActive && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                          <Button
                            onClick={startCamera}
                            className="w-full h-40 flex-col space-y-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            size="lg"
                          >
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <Camera className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg">
                                Take Photo
                              </div>
                              <div className="text-sm opacity-90 font-medium">
                                Use camera to capture room
                              </div>
                            </div>
                          </Button>
                          <div className="mt-3 flex items-center justify-center text-xs text-green-600 font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Recommended for best results
                          </div>
                        </div>

                        <div className="group">
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                            className="w-full h-40 flex-col space-y-3 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                            size="lg"
                          >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <Upload className="h-8 w-8 text-purple-600" />
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg text-gray-800">
                                Upload Photo
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                Choose from device
                              </div>
                            </div>
                          </Button>
                          <div className="mt-3 flex items-center justify-center text-xs text-gray-500 font-medium">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            JPG, PNG up to 10MB
                          </div>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}

                  {/* Camera View */}
                  {isCameraActive && (
                    <div className="space-y-6">
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-gray-700">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-96 object-cover"
                          style={{ transform: "scaleX(-1)" }}
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Enhanced camera overlay */}
                        <div className="absolute inset-4 border-2 border-white/30 rounded-xl pointer-events-none">
                          <div className="absolute top-3 right-3 text-white text-sm bg-black/60 px-3 py-2 rounded-lg backdrop-blur-sm">
                            📱 Point at your room
                          </div>

                          {/* Improved focus area */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/60 rounded-2xl">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-white rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-white rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-white rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-white rounded-br-lg"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced camera controls */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6">
                          <Button
                            onClick={capturePhoto}
                            size="lg"
                            className="rounded-full w-20 h-20 bg-white text-black hover:bg-gray-100 shadow-2xl border-4 border-white hover:scale-105 transition-all duration-200"
                            disabled={
                              !videoRef.current?.videoWidth ||
                              videoRef.current?.readyState < 3
                            }
                          >
                            <Camera className="h-8 w-8" />
                          </Button>
                          <Button
                            onClick={stopCamera}
                            variant="outline"
                            size="lg"
                            className="rounded-full w-16 h-16 bg-red-500 text-white border-2 border-red-400 hover:bg-red-600 shadow-xl hover:scale-105 transition-all duration-200"
                          >
                            ✕
                          </Button>
                        </div>

                        {/* Enhanced status indicator */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span>LIVE</span>
                        </div>
                      </div>

                      {/* Enhanced tip section */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm">💡</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-1">
                              Pro Tips for Best Results
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                              Ensure your room is well-lit and shows furniture,
                              walls, and floor. Stand back to capture the entire
                              space for optimal AI analysis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Captured Image Preview */}
                  {capturedImage && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-800">
                              Original Photo
                            </h3>
                            <Badge variant="outline" className="bg-gray-50">
                              <Eye className="h-3 w-3 mr-1" />
                              Source
                            </Badge>
                          </div>
                          <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                            <img
                              src={capturedImage}
                              alt="Captured room"
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        <div className="group">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-800">
                              Enhanced Photo
                            </h3>
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI Enhanced
                            </Badge>
                          </div>
                          <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                            <img
                              src={modifiedImage || capturedImage}
                              alt="Enhanced room"
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Analysis Progress */}
                  {isAnalyzing && (
                    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-2xl border border-blue-200/50 shadow-xl overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>

                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <Wand2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
                          AI Analysis in Progress
                        </h3>
                        <div className="max-w-md mx-auto mb-6">
                          <Progress
                            value={progress}
                            className="h-3 bg-gray-200 rounded-full overflow-hidden"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0%</span>
                            <span className="font-medium text-blue-600">
                              {progress}%
                            </span>
                            <span>100%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-gray-800">
                            {progress < 30
                              ? "🔍 Detecting room features..."
                              : progress < 60
                                ? "✅ Confirming room layout..."
                                : progress < 90
                                  ? "🎨 Generating suggestions..."
                                  : "🎉 Finalizing analysis..."}
                          </p>
                          <p className="text-sm text-gray-600">
                            {progress < 30
                              ? "Scanning image for room characteristics and layout"
                              : progress < 60
                                ? "AI has confirmed this is a valid room interior"
                                : progress < 90
                                  ? "Creating personalized furniture and color recommendations"
                                  : "Preparing your comprehensive design analysis"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Colors Tab */}
                <TabsContent value="colors" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Color Adjustments</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Brightness: {colorAdjustments.brightness}%
                          </label>
                          <Slider
                            value={[colorAdjustments.brightness]}
                            onValueChange={(value) =>
                              setColorAdjustments((prev) => ({
                                ...prev,
                                brightness: value[0],
                              }))
                            }
                            min={50}
                            max={150}
                            step={1}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Contrast: {colorAdjustments.contrast}%
                          </label>
                          <Slider
                            value={[colorAdjustments.contrast]}
                            onValueChange={(value) =>
                              setColorAdjustments((prev) => ({
                                ...prev,
                                contrast: value[0],
                              }))
                            }
                            min={50}
                            max={150}
                            step={1}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Saturation: {colorAdjustments.saturation}%
                          </label>
                          <Slider
                            value={[colorAdjustments.saturation]}
                            onValueChange={(value) =>
                              setColorAdjustments((prev) => ({
                                ...prev,
                                saturation: value[0],
                              }))
                            }
                            min={0}
                            max={200}
                            step={1}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Hue Shift: {colorAdjustments.hue}°
                          </label>
                          <Slider
                            value={[colorAdjustments.hue]}
                            onValueChange={(value) =>
                              setColorAdjustments((prev) => ({
                                ...prev,
                                hue: value[0],
                              }))
                            }
                            min={-180}
                            max={180}
                            step={1}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={resetAdjustments} variant="outline">
                            Reset
                          </Button>
                          <Button onClick={downloadImage}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">
                        AI Color Suggestions
                      </h3>
                      {analysis?.colorSuggestions.map((color) => (
                        <Card
                          key={color.id}
                          className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => applyColorSuggestion(color)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-12 h-12 rounded-lg border"
                                style={{ backgroundColor: color.hex }}
                              />
                              <div className="flex-1">
                                <div className="font-medium">{color.name}</div>
                                <div className="text-sm text-gray-600">
                                  {color.area}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {color.hex}
                                </div>
                              </div>
                              <Badge variant="outline">
                                {Math.round(color.confidence)}%
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <canvas ref={imageCanvasRef} className="hidden" />
                </TabsContent>

                {/* Analysis Tab */}
                <TabsContent value="analysis" className="space-y-6">
                  {analysis && (
                    <div className="space-y-6">
                      {/* Room Detection Status */}
                      <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-900">
                            Room Successfully Detected
                          </div>
                          <div className="text-green-700 text-sm">
                            {analysis.roomDetection.roomType.replace("_", " ")}{" "}
                            •{" "}
                            {Math.round(
                              analysis.roomDetection.confidence * 100,
                            )}
                            % confidence
                          </div>
                        </div>
                      </div>

                      {/* Analysis Results */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">
                            Furniture Suggestions
                          </h3>
                          <div className="space-y-3">
                            {analysis.furnitureSuggestions
                              .slice(0, 3)
                              .map((furniture) => (
                                <Card key={furniture.id}>
                                  <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                      <img
                                        src={furniture.imageUrl}
                                        alt={furniture.name}
                                        className="w-16 h-16 object-cover rounded"
                                      />
                                      <div className="flex-1">
                                        <div className="font-medium">
                                          {furniture.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          {furniture.brand}
                                        </div>
                                        <div className="text-sm font-semibold text-primary-600">
                                          ${furniture.price}
                                        </div>
                                      </div>
                                      <Badge variant="outline">
                                        {Math.round(furniture.compatibility)}%
                                        match
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-4">Room Analysis</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-sm text-gray-500">
                                  Style
                                </div>
                                <div className="font-medium">
                                  {analysis.styleAnalysis.detectedStyle}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500">
                                  Confidence
                                </div>
                                <div className="font-medium">
                                  {Math.round(
                                    analysis.styleAnalysis.styleConfidence,
                                  )}
                                  %
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">
                                Recommendations
                              </h4>
                              <ul className="space-y-1">
                                {analysis.recommendations.immediate
                                  .slice(0, 3)
                                  .map((rec, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-gray-600 flex items-start space-x-2"
                                    >
                                      <Sparkles className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* 3D View Tab */}
                <TabsContent value="3d" className="space-y-6">
                  {analysis && (
                    <div className="h-96 border rounded-lg overflow-hidden">
                      <RoomViewer3D
                        room3DModel={analysis.room3DModel}
                        furnitureSuggestions={analysis.furnitureSuggestions}
                        colorSuggestions={analysis.colorSuggestions}
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              {capturedImage && (
                <div className="pt-8 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={downloadImage}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Enhanced
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Analysis
                    </Button>
                    {isAuthenticated && (
                      <Button
                        variant="outline"
                        className="border-2 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-700 hover:text-green-800 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save to Collection
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default PhotoAnalysis;
