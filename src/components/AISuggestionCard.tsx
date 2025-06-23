import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Upload,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  Wand2,
  Eye,
  Download,
  Trash2,
  Save,
  Share2,
  AlertCircle,
  Move3D,
  Palette,
  Sofa,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import apiService from "@/services/api";
import { AIAnalysis, AISuggestion } from "@/types/api";
import {
  Enhanced3DAnalysis,
  FurnitureSuggestion,
  ColorSuggestion,
} from "@/types/ai";
import { enhanced3DBackend } from "@/services/enhancedBackend";
import { toast } from "@/hooks/use-toast";
import AuthModal from "./AuthModal";
import RoomViewer3D from "./3DRoomViewer";

interface AISuggestionCardProps {
  className?: string;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ className }) => {
  const { user, isAuthenticated } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [enhanced3DAnalysis, setEnhanced3DAnalysis] =
    useState<Enhanced3DAnalysis | null>(null);
  const [progress, setProgress] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [selectedFurniture, setSelectedFurniture] =
    useState<FurnitureSuggestion | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorSuggestion | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Analyze with AI
      await analyzeWithAI(file);
    },
    [isAuthenticated],
  );

  const analyzeWithAI = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysis(null);
    setEnhanced3DAnalysis(null);

    try {
      // Step 1: Room Detection (25% progress)
      setProgress(25);
      toast({
        title: "🔍 Analyzing Image...",
        description: "Verifying if this is a room interior photo",
      });

      const roomDetection = await enhanced3DBackend.detectRoom(file);

      setProgress(50);

      // Step 2: Check if it's actually a room
      if (!roomDetection.isRoom) {
        setProgress(0);

        // Show detailed error with reasons
        toast({
          variant: "destructive",
          title: "❌ Not a Room Image",
          description: `This image cannot be analyzed for furniture suggestions. ${roomDetection.reasons[0]}`,
        });

        // Show the uploaded image with error overlay
        setUploadedImage(URL.createObjectURL(file));

        // Don't proceed with suggestions
        return;
      }

      // Step 3: Confirmed room - proceed with full analysis
      setProgress(75);
      toast({
        title: "✅ Room Detected!",
        description: `${roomDetection.roomType.replace("_", " ")} identified with ${Math.round(roomDetection.confidence * 100)}% confidence`,
      });

      // Step 4: Generate furniture and color suggestions
      const enhanced3DResult = await enhanced3DBackend.analyze3DRoom(file);

      setProgress(100);
      setEnhanced3DAnalysis(enhanced3DResult);
      setActiveTab("analysis");

      toast({
        title: "🎉 Analysis Complete!",
        description: `Found ${enhanced3DResult.furnitureSuggestions.length} furniture suggestions and ${enhanced3DResult.colorSuggestions.length} color recommendations`,
      });
    } catch (error) {
      console.error("AI analysis error:", error);

      setProgress(0);

      if (
        error instanceof Error &&
        error.message.includes("not appear to be a room")
      ) {
        toast({
          variant: "destructive",
          title: "❌ Invalid Image Type",
          description:
            "This image is not suitable for room design analysis. Please upload an interior room photo.",
        });

        // Show the image with error state
        setUploadedImage(URL.createObjectURL(file));
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description:
            "There was an error analyzing your image. Please try again with a different photo.",
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

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
      setIsCameraActive(true);

      // Try different camera constraints, starting with less restrictive
      const constraints = [
        // Try environment camera first (back camera)
        {
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        // Fallback to any camera
        {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        // Minimal constraints as last resort
        {
          video: true,
        },
      ];

      let stream = null;
      let lastError = null;

      for (const constraint of constraints) {
        try {
          console.log("Trying camera constraint:", constraint);
          stream = await navigator.mediaDevices.getUserMedia(constraint);
          console.log("Camera stream obtained with constraint:", constraint);
          break;
        } catch (err) {
          console.warn("Camera constraint failed:", constraint, err);
          lastError = err;
          continue;
        }
      }

      if (!stream) {
        throw lastError || new Error("No camera constraints worked");
      }

      setCameraStream(stream);

      // Set up video element
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;

        // Set video properties
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        console.log("Video element configured");

        // Handle video ready events
        const handleCanPlay = () => {
          console.log(
            "✅ Video can play, dimensions:",
            video.videoWidth,
            "x",
            video.videoHeight,
          );
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            toast({
              title: "📷 Camera Ready",
              description:
                "Point camera at your room and tap the capture button",
            });
          }
        };

        const handleLoadedMetadata = async () => {
          console.log("📼 Video metadata loaded");
          try {
            // Force video to play
            video.muted = true; // Ensure muted for autoplay
            video.playsInline = true;
            await video.play();
            console.log("✅ Video playing successfully");
          } catch (playError) {
            console.error("❌ Initial play failed:", playError);
            // Force play with different approach
            setTimeout(async () => {
              try {
                await video.play();
                console.log("✅ Video playing on retry");
              } catch (retryError) {
                console.error("❌ Retry play failed:", retryError);
                // Manual user interaction might be needed
                toast({
                  title: "👆 Tap to activate camera",
                  description: "Click anywhere on the video to start the feed",
                });
              }
            }, 500);
          }
        };

        const handlePlaying = () => {
          console.log("✅ Video is now playing");
          // Double check dimensions are available
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            toast({
              title: "📷 Camera Active",
              description: "Ready to capture your room!",
            });
          }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("playing", handlePlaying);

        // Add click handler to force play if needed
        video.addEventListener("click", async () => {
          if (video.paused) {
            try {
              await video.play();
              console.log("✅ Video started via user click");
            } catch (error) {
              console.error("❌ Click play failed:", error);
            }
          }
        });

        // Handle errors
        video.addEventListener("error", (e) => {
          console.error("Video error:", e);
          toast({
            variant: "destructive",
            title: "Video error",
            description: "Camera feed failed to start",
          });
        });

        // Start loading
        video.load();
      }
    } catch (error) {
      console.error("Camera setup failed:", error);
      setIsCameraActive(false);

      let errorTitle = "Camera access failed";
      let errorMessage = "Unable to access camera";

      if (error instanceof Error) {
        switch (error.name) {
          case "NotAllowedError":
            errorTitle = "Camera permission denied";
            errorMessage =
              "Please allow camera access in your browser settings and refresh the page";
            break;
          case "NotFoundError":
            errorTitle = "No camera found";
            errorMessage = "No camera device was found on this device";
            break;
          case "NotReadableError":
            errorTitle = "Camera in use";
            errorMessage = "Camera is being used by another application";
            break;
          case "OverconstrainedError":
            errorTitle = "Camera constraints error";
            errorMessage = "Camera doesn't support the required settings";
            break;
          default:
            errorMessage = error.message || "Unknown camera error";
        }
      }

      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
      });
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera");

    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        console.log("Stopping track:", track.kind);
        track.stop();
      });
      setCameraStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);

    toast({
      title: "Camera stopped",
      description: "Camera has been turned off",
    });
  };

  const capturePhoto = async () => {
    console.log("📸 Capture photo button clicked");

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
      currentTime: video.currentTime,
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

    // Wait a moment for video to be fully ready
    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0 ||
      video.readyState < 3
    ) {
      toast({
        title: "⏳ Preparing capture...",
        description: "Waiting for camera to stabilize",
      });

      // Try again after a short delay
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
      setUploadedImage(dataUrl);

      // Convert to blob for analysis
      canvas.toBlob(
        async (blob) => {
          if (blob && blob.size > 0) {
            console.log("✅ Blob created:", blob.size, "bytes");

            const file = new File([blob], `room-capture-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });

            // Stop camera before analysis
            stopCamera();

            toast({
              title: "📸 Photo Captured!",
              description: "Starting AI analysis of your room...",
            });

            // Start AI analysis
            await analyzeWithAI(file);
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

  const saveAnalysis = async () => {
    if (!analysis || !isAuthenticated) return;

    try {
      // In a real app, save to user's designs
      toast({
        title: "Analysis saved!",
        description: "Added to your design collection",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Unable to save analysis",
      });
    }
  };

  const shareAnalysis = async () => {
    if (!analysis) return;

    try {
      await navigator.share({
        title: "My Design Analysis",
        text: `Check out my AI design analysis: ${analysis.detectedStyle} style detected!`,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysis(null);
    setEnhanced3DAnalysis(null);
    setProgress(0);
    setActiveTab("analysis");
    setSelectedFurniture(null);
    setSelectedColor(null);
    stopCamera();
  };

  const getSuggestionIcon = (type: AISuggestion["type"]) => {
    switch (type) {
      case "style":
        return "🎨";
      case "lighting":
        return "💡";
      case "furniture":
        return "🪑";
      case "color":
        return "🌈";
      case "layout":
        return "📐";
      case "decor":
        return "🏺";
      default:
        return "✨";
    }
  };

  const getPriorityColor = (priority: AISuggestion["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <Card
        className={cn(
          "w-full max-w-2xl mx-auto shadow-elegant border-0 bg-white/95 backdrop-blur-sm hover-lift",
          className,
        )}
      >
        <CardHeader className="bg-gradient-to-r from-white to-blue-50/30 border-b border-blue-100/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                AI Design Assistant
              </span>
              {!isAuthenticated && (
                <Badge
                  variant="outline"
                  className="ml-3 border-orange-200 text-orange-700 bg-orange-50"
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Login Required
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2 leading-relaxed">
            Upload a photo or take a picture to get instant design suggestions
            powered by advanced AI technology
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Camera View */}
          {isCameraActive && (
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl border-2 border-gray-700/50">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  webkit-playsinline="true"
                  className="w-full h-80 object-cover"
                  style={{
                    transform: "scaleX(-1)",
                    backgroundColor: "#000",
                  }}
                  onCanPlay={() => {
                    console.log(
                      "✅ Video can play - dimensions:",
                      videoRef.current?.videoWidth,
                      "x",
                      videoRef.current?.videoHeight,
                    );
                  }}
                  onPlaying={() => {
                    console.log("✅ Video is playing");
                  }}
                  onLoadStart={() => {
                    console.log("🔄 Video load started");
                  }}
                  onLoadedData={() => {
                    console.log("✅ Video data loaded");
                  }}
                  onError={(e) => {
                    console.error("❌ Video error:", e);
                  }}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Enhanced camera overlay */}
                <div className="absolute inset-6 border-2 border-white/40 rounded-2xl pointer-events-none">
                  <div className="absolute top-4 right-4 text-white text-sm bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm font-medium shadow-lg">
                    📱 Point at your room
                  </div>

                  {/* Enhanced focus area */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/70 rounded-3xl">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced camera controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6">
                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className={cn(
                      "rounded-full w-24 h-24 shadow-2xl border-4 transition-all duration-300",
                      videoRef.current?.videoWidth &&
                        videoRef.current?.readyState >= 3
                        ? "bg-white text-black hover:bg-gray-100 border-blue-400 hover:border-blue-500 hover:scale-110 shadow-glow"
                        : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed",
                    )}
                    disabled={
                      !videoRef.current?.videoWidth ||
                      videoRef.current?.readyState < 3
                    }
                  >
                    <Camera className="h-10 w-10" />
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    size="lg"
                    className="rounded-full w-16 h-16 bg-red-500 text-white border-2 border-red-400 hover:bg-red-600 shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-xl">✕</span>
                  </Button>
                </div>

                {/* Enhanced status indicator */}
                <div className="absolute top-6 right-6 flex items-center space-x-3 bg-red-500/90 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>

                {/* Camera status indicator */}
                <div className="absolute top-6 left-6 bg-black/60 text-white text-xs p-3 rounded-xl max-w-52 backdrop-blur-sm">
                  <div className="space-y-1">
                    <div>📷 {cameraStream ? "Connected" : "Disconnected"}</div>
                    <div>
                      📹{" "}
                      {videoRef.current?.videoWidth
                        ? `${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`
                        : "No video"}
                    </div>
                    <div>
                      🎬{" "}
                      {videoRef.current?.readyState === 4
                        ? "Ready"
                        : "Loading..."}
                    </div>
                  </div>
                </div>

                {/* Camera loading/error states */}
                {(!cameraStream || !videoRef.current?.videoWidth) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="text-white text-center p-6 rounded-2xl bg-black/50">
                      {!cameraStream ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Camera className="h-8 w-8 animate-pulse" />
                          </div>
                          <div>
                            <div className="text-lg font-semibold">
                              Requesting camera access...
                            </div>
                            <div className="text-sm text-gray-300 mt-2">
                              Please allow camera permissions
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                            <Camera className="h-8 w-8 animate-pulse" />
                          </div>
                          <div>
                            <div className="text-lg font-semibold">
                              Connecting to camera...
                            </div>
                            <div className="text-sm text-gray-300 mt-2">
                              Video feed starting...
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced tip section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2 text-lg">
                      Pro Tips for Best Results
                    </h4>
                    <div className="text-sm text-blue-800 space-y-2">
                      <p>
                        • Ensure your room is well-lit with natural or bright
                        artificial lighting
                      </p>
                      <p>
                        • Capture the entire space including furniture, walls,
                        and floor
                      </p>
                      <p>
                        • Stand back to get a wide-angle view of the room layout
                      </p>
                      <p>
                        • Avoid extreme angles - shoot from eye level for best
                        perspective
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Section */}
          {!uploadedImage && !isCameraActive && (
            <div className="space-y-6">
              {/* Room Image Guidelines */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center text-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📸</span>
                  </div>
                  Room Photo Guidelines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/70 rounded-xl p-4 border border-green-200/50">
                    <div className="text-green-600 font-semibold mb-2 flex items-center">
                      <span className="text-lg mr-2">✅</span>
                      Perfect for AI
                    </div>
                    <p className="text-green-800">
                      Interior room photos showing walls, floor, and furniture
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 border border-red-200/50">
                    <div className="text-red-600 font-semibold mb-2 flex items-center">
                      <span className="text-lg mr-2">❌</span>
                      Not suitable
                    </div>
                    <p className="text-red-800">
                      Outdoor scenes, portraits, food, vehicles, or close-ups
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 border border-blue-200/50">
                    <div className="text-blue-600 font-semibold mb-2 flex items-center">
                      <span className="text-lg mr-2">💡</span>
                      Best results
                    </div>
                    <p className="text-blue-800">
                      Good lighting, wide angle showing the entire room
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <Button
                    variant="outline"
                    className="w-full h-36 flex-col space-y-3 border-2 border-dashed border-purple-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-7 w-7 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">
                        Upload Room Photo
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        JPG, PNG up to 10MB
                      </div>
                    </div>
                    <Badge className="absolute top-3 right-3 text-xs bg-green-500 text-white">
                      Recommended
                    </Badge>
                  </Button>
                  <div className="mt-3 flex items-center justify-center text-xs text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Best accuracy & quality
                  </div>
                </div>

                <div className="group">
                  <Button
                    variant="outline"
                    className="w-full h-36 flex-col space-y-3 border-2 border-blue-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    onClick={startCamera}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">
                        Take Room Photo
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        Use your camera
                      </div>
                    </div>
                  </Button>
                  <div className="mt-3 flex items-center justify-center text-xs text-blue-600 font-medium">
                    <Camera className="h-3 w-3 mr-1" />
                    Real-time capture
                  </div>
                </div>
              </div>

              {/* Example images */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <div className="text-center">
                  <div className="bg-green-100 border-2 border-green-300 rounded p-2 mb-1">
                    <div className="text-2xl">🛋️</div>
                  </div>
                  <div className="text-xs text-green-700">Living Room ✅</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 border-2 border-green-300 rounded p-2 mb-1">
                    <div className="text-2xl">🍳</div>
                  </div>
                  <div className="text-xs text-green-700">Kitchen ✅</div>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 border-2 border-red-300 rounded p-2 mb-1">
                    <div className="text-2xl">🌳</div>
                  </div>
                  <div className="text-xs text-red-700">Outdoor ❌</div>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 border-2 border-red-300 rounded p-2 mb-1">
                    <div className="text-2xl">👤</div>
                  </div>
                  <div className="text-xs text-red-700">Portrait ❌</div>
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

          {/* Analysis Section */}
          {uploadedImage && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded room"
                  className="w-full h-64 object-cover"
                />

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Wand2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <div className="font-medium">
                        {progress < 30
                          ? "Verifying room image..."
                          : progress < 60
                            ? "Room detected! Analyzing..."
                            : progress < 90
                              ? "Generating suggestions..."
                              : "Finalizing analysis..."}
                      </div>
                      <div className="text-sm opacity-80 mb-3">
                        {progress < 30
                          ? "Checking if this is an interior room photo"
                          : progress < 60
                            ? "AI confirmed this is a room interior"
                            : progress < 90
                              ? "Creating furniture and color recommendations"
                              : "Almost ready with your design suggestions"}
                      </div>
                      <Progress value={progress} className="w-48 mx-auto" />
                      <div className="text-xs mt-2">{progress}% complete</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Non-Room Image Error State */}
              {!isAnalyzing && !enhanced3DAnalysis && (
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Image Not Suitable for Room Analysis
                  </h3>
                  <p className="text-red-700 mb-4">
                    This image doesn't appear to be an interior room photo. Our
                    AI can only provide furniture and color suggestions for room
                    interiors.
                  </p>

                  <div className="bg-white p-4 rounded border border-red-200 mb-4">
                    <h4 className="font-medium text-red-900 mb-2">
                      What we look for in room photos:
                    </h4>
                    <div className="text-sm text-red-800 space-y-1 text-left">
                      <p>✅ Interior spaces with walls, floors, and ceilings</p>
                      <p>✅ Furniture pieces (sofas, tables, beds, etc.)</p>
                      <p>✅ Room layouts (living rooms, bedrooms, kitchens)</p>
                      <p>✅ Good lighting showing room details</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-red-200 mb-4">
                    <h4 className="font-medium text-red-900 mb-2">
                      Images we cannot analyze:
                    </h4>
                    <div className="text-sm text-red-800 space-y-1 text-left">
                      <p>❌ Outdoor scenes, landscapes, or gardens</p>
                      <p>❌ People portraits or selfies</p>
                      <p>❌ Food, vehicles, or single objects</p>
                      <p>❌ Text documents or screenshots</p>
                      <p>❌ Very dark or unclear images</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={resetAnalysis}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Try Different Photo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={startCamera}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Room Photo
                    </Button>
                  </div>
                </div>
              )}

              {/* Enhanced Analysis Results */}
              {enhanced3DAnalysis && !isAnalyzing && (
                <div className="space-y-4">
                  {/* Room Detection Status */}
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">
                          Room Successfully Detected
                        </div>
                        <div className="text-sm text-green-700">
                          {enhanced3DAnalysis.roomDetection.roomType.replace(
                            "_",
                            " ",
                          )}{" "}
                          •{" "}
                          {Math.round(
                            enhanced3DAnalysis.roomDetection.confidence * 100,
                          )}
                          % confidence
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <Move3D className="h-3 w-3 mr-1" />
                      3D Ready
                    </Badge>
                  </div>

                  {/* Tabbed Interface */}
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger
                        value="analysis"
                        className="flex items-center space-x-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Analysis</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="3d-view"
                        className="flex items-center space-x-2"
                      >
                        <Move3D className="h-4 w-4" />
                        <span>3D View</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="suggestions"
                        className="flex items-center space-x-2"
                      >
                        <Sofa className="h-4 w-4" />
                        <span>Furniture</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analysis" className="space-y-4">
                      {/* Room Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-500">Room Type</div>
                          <div className="font-medium">
                            {enhanced3DAnalysis.roomDetection.roomType.replace(
                              "_",
                              " ",
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500">Style</div>
                          <div className="font-medium">
                            {enhanced3DAnalysis.styleAnalysis.detectedStyle}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            Dimensions
                          </div>
                          <div className="font-medium">
                            {Math.round(
                              enhanced3DAnalysis.spatialAnalysis.roomDimensions
                                .width,
                            )}
                            m ×{" "}
                            {Math.round(
                              enhanced3DAnalysis.spatialAnalysis.roomDimensions
                                .depth,
                            )}
                            m
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            Available Space
                          </div>
                          <div className="font-medium">
                            {Math.round(
                              enhanced3DAnalysis.spatialAnalysis.availableSpace,
                            )}
                            %
                          </div>
                        </div>
                      </div>

                      {/* Style Analysis */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Style Analysis</h4>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {enhanced3DAnalysis.styleAnalysis.detectedStyle}
                            </span>
                            <Badge variant="outline">
                              {Math.round(
                                enhanced3DAnalysis.styleAnalysis
                                  .styleConfidence,
                              )}
                              % match
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            Compatible styles:{" "}
                            {enhanced3DAnalysis.styleAnalysis.compatibleStyles.join(
                              ", ",
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {enhanced3DAnalysis.styleAnalysis.designPrinciples.map(
                              (principle, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {principle}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-3">
                        <h4 className="font-medium">AI Recommendations</h4>
                        <div className="space-y-2">
                          {enhanced3DAnalysis.recommendations.immediate.map(
                            (rec, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg"
                              >
                                <Wand2 className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span className="text-sm text-blue-900">
                                  {rec}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="3d-view" className="space-y-4">
                      <div className="h-96 border rounded-lg overflow-hidden">
                        <RoomViewer3D
                          room3DModel={enhanced3DAnalysis.room3DModel}
                          furnitureSuggestions={
                            enhanced3DAnalysis.furnitureSuggestions
                          }
                          colorSuggestions={enhanced3DAnalysis.colorSuggestions}
                          onFurnitureSelect={setSelectedFurniture}
                          onColorSelect={setSelectedColor}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="space-y-4">
                      {/* Budget Categories */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["low", "medium", "high"].map((budget) => (
                          <div key={budget} className="border rounded-lg p-4">
                            <h5 className="font-medium capitalize mb-3">
                              {budget} Budget
                            </h5>
                            <div className="space-y-2">
                              {enhanced3DAnalysis.recommendations.budget[
                                budget as keyof typeof enhanced3DAnalysis.recommendations.budget
                              ]
                                .slice(0, 2)
                                .map((furniture) => (
                                  <div
                                    key={furniture.id}
                                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                                  >
                                    <img
                                      src={furniture.imageUrl}
                                      alt={furniture.name}
                                      className="w-8 h-8 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-medium truncate">
                                        {furniture.name}
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        ${furniture.price}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* All Furniture Suggestions */}
                      <div className="space-y-3">
                        <h4 className="font-medium">
                          All Furniture Suggestions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {enhanced3DAnalysis.furnitureSuggestions.map(
                            (furniture) => (
                              <Card
                                key={furniture.id}
                                className="hover:shadow-md transition-shadow"
                              >
                                <CardContent className="p-4">
                                  <img
                                    src={furniture.imageUrl}
                                    alt={furniture.name}
                                    className="w-full h-32 object-cover rounded mb-3"
                                  />
                                  <div className="space-y-2">
                                    <div className="font-medium">
                                      {furniture.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {furniture.brand}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold text-primary-600">
                                        ${furniture.price}
                                      </span>
                                      <Badge variant="outline">
                                        {Math.round(furniture.compatibility)}%
                                        match
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {furniture.dimensions.width}×
                                      {furniture.dimensions.depth}×
                                      {furniture.dimensions.height}m
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator />

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {isAuthenticated && (
                      <Button
                        size="sm"
                        className="flex items-center space-x-2"
                        onClick={saveAnalysis}
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Analysis</span>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => setActiveTab("3d-view")}
                    >
                      <Move3D className="h-4 w-4" />
                      <span>View in 3D</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={shareAnalysis}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Report</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetAnalysis}
                      className="ml-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Try Another Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Login Prompt */}
          {!isAuthenticated && (
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg">
              <div className="text-gray-600 mb-4">
                Sign in to save your analyses, access premium AI features, and
                collaborate with others
              </div>
              <Button onClick={() => setShowAuthModal(true)}>
                Sign In to Continue
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AISuggestionCard;
