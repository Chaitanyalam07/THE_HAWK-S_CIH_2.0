import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Camera,
  Square,
  Sparkles,
  Eye,
  ArrowLeft,
  Settings,
  Zap,
  Palette,
  Sofa,
  Lightbulb,
  Volume2,
  VolumeX,
  RotateCcw,
  Share,
} from "lucide-react";

interface LiveSuggestion {
  type: "furniture" | "color" | "lighting";
  message: string;
  confidence: number;
  position?: { x: number; y: number };
}

const LiveCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<LiveSuggestion[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        setPermissionGranted(true);
        startAIAnalysis();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Camera access denied. Please allow camera permissions and try again.",
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setSuggestions([]);
  };

  const startAIAnalysis = () => {
    // Simulate AI analysis with random suggestions
    const analysisInterval = setInterval(() => {
      const suggestionTypes: LiveSuggestion["type"][] = [
        "furniture",
        "color",
        "lighting",
      ];
      const furnitureSuggestions = [
        "Add a coffee table in this area",
        "Consider a floor lamp here",
        "A bookshelf would work well in this corner",
        "This space could use accent chairs",
      ];
      const colorSuggestions = [
        "This wall would look great in warm white",
        "Consider blue accent colors",
        "Add gold metallic touches",
        "Natural wood tones would complement this space",
      ];
      const lightingSuggestions = [
        "Add pendant lighting above this area",
        "Consider LED strip lighting",
        "A table lamp would improve ambiance",
        "Smart lighting would enhance this room",
      ];

      const type =
        suggestionTypes[Math.floor(Math.random() * suggestionTypes.length)];
      let message = "";

      switch (type) {
        case "furniture":
          message =
            furnitureSuggestions[
              Math.floor(Math.random() * furnitureSuggestions.length)
            ];
          break;
        case "color":
          message =
            colorSuggestions[
              Math.floor(Math.random() * colorSuggestions.length)
            ];
          break;
        case "lighting":
          message =
            lightingSuggestions[
              Math.floor(Math.random() * lightingSuggestions.length)
            ];
          break;
      }

      const newSuggestion: LiveSuggestion = {
        type,
        message,
        confidence: Math.floor(Math.random() * 30) + 70,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        },
      };

      setSuggestions((prev) => {
        const updated = [...prev, newSuggestion];
        return updated.slice(-3); // Keep only last 3 suggestions
      });
    }, 4000);

    // Clear suggestions periodically
    setTimeout(() => {
      clearInterval(analysisInterval);
    }, 30000);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <div className="flex items-center gap-2">
                  <Camera className="w-6 h-6 text-green-400" />
                  <h1 className="text-2xl font-bold gradient-text">
                    Live Camera AI
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="glass-card border-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Camera Feed */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-white/10 relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Camera Feed
                    </span>
                    {isStreaming && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Live
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 relative">
                  {!isStreaming ? (
                    <div className="h-96 flex items-center justify-center bg-gray-800/50 relative">
                      <div className="text-center space-y-4">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                        <h3 className="text-xl font-semibold">
                          Start Camera for AI Analysis
                        </h3>
                        <p className="text-gray-300 max-w-md">
                          Point your camera at any room to get real-time AI
                          suggestions for furniture, colors, and lighting
                        </p>
                        <Button
                          onClick={startCamera}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 pulse-glow"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Start Camera
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-96 object-cover camera-preview"
                      />

                      {/* AI Overlay Suggestions */}
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="absolute bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-xs animate-fade-in"
                          style={{
                            left: `${suggestion.position?.x}%`,
                            top: `${suggestion.position?.y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {suggestion.type === "furniture" && (
                              <Sofa className="w-4 h-4 text-blue-400" />
                            )}
                            {suggestion.type === "color" && (
                              <Palette className="w-4 h-4 text-purple-400" />
                            )}
                            {suggestion.type === "lighting" && (
                              <Lightbulb className="w-4 h-4 text-yellow-400" />
                            )}
                            <span className="text-xs font-medium">
                              {suggestion.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-sm text-white">
                            {suggestion.message}
                          </p>
                        </div>
                      ))}

                      {/* Camera Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        <Button
                          onClick={stopCamera}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Stop
                        </Button>
                        <Button
                          variant="outline"
                          className="glass-card border-white/20"
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Suggestions Panel */}
            <div className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestions.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        Start camera to see real-time suggestions
                      </p>
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="glass-card p-4 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {suggestion.type === "furniture" && (
                            <Sofa className="w-4 h-4 text-blue-400" />
                          )}
                          {suggestion.type === "color" && (
                            <Palette className="w-4 h-4 text-purple-400" />
                          )}
                          {suggestion.type === "lighting" && (
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-sm font-medium capitalize">
                            {suggestion.type}
                          </span>
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {suggestion.confidence}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">
                          {suggestion.message}
                        </p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/analyzer">
                    <Button
                      variant="outline"
                      className="w-full glass-card border-white/20 text-left justify-start"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Analyze Snapshot
                    </Button>
                  </Link>
                  <Link to="/ar">
                    <Button
                      variant="outline"
                      className="w-full glass-card border-white/20 text-left justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View in AR
                    </Button>
                  </Link>
                  <Link to="/designer">
                    <Button
                      variant="outline"
                      className="w-full glass-card border-white/20 text-left justify-start"
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Open Designer
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Camera Tips */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Camera Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-300">
                  <div className="flex gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <p>Ensure good lighting for accurate analysis</p>
                  </div>
                  <div className="flex gap-2">
                    <Eye className="w-4 h-4 text-blue-400 mt-0.5" />
                    <p>Hold camera steady for 3-5 seconds</p>
                  </div>
                  <div className="flex gap-2">
                    <RotateCcw className="w-4 h-4 text-purple-400 mt-0.5" />
                    <p>Move slowly to capture different angles</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;
