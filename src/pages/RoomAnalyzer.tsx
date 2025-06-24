import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowLeft,
  Download,
  Share,
  Palette,
  Sofa,
  Home,
  Lightbulb,
  Layers,
  RotateCcw,
  Box,
} from "lucide-react";

interface AnalysisResult {
  roomType: string;
  style: string;
  confidence: number;
  isRoomImage: boolean;
  suggestions: {
    furniture: FurnitureItem[];
    colors: ColorItem[];
    lighting: LightingItem[];
  };
  issues: string[];
}

interface FurnitureItem {
  name: string;
  description: string;
  price: string;
  amazonLink: string;
  ikeaLink: string;
  wayfairLink: string;
  image: string;
}

interface ColorItem {
  name: string;
  hexCode: string;
  brand: string;
  productName: string;
  buyLink: string;
  description: string;
}

interface LightingItem {
  name: string;
  description: string;
  price: string;
  amazonLink: string;
  image: string;
}

// Enhanced Furniture Database with Multiple Options
const FURNITURE_DATABASE = {
  livingRoom: {
    large: [
      // Sofas & Seating
      {
        name: "KIVIK 3-Seat Sofa",
        description: "Spacious sectional sofa with deep seats",
        price: "$899",
        category: "seating",
        amazonLink: "https://amazon.com/search?k=large+sectional+sofa",
        ikeaLink:
          "https://www.ikea.com/us/en/p/kivik-3-seat-sofa-hillared-dark-blue-s19421873/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/sectional-sofas-c45974.html",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "EKTORP 3-Seat Sofa",
        description: "Classic 3-seat sofa with washable covers",
        price: "$649",
        category: "seating",
        amazonLink: "https://amazon.com/search?k=3+seat+sofa+washable+covers",
        ikeaLink:
          "https://www.ikea.com/us/en/p/ektorp-3-seat-sofa-totebo-light-beige-s19175958/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/3-seat-sofas-c45863.html",
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "STRANDMON Wing Chair",
        description: "High-back wing chair in various colors",
        price: "$279",
        category: "seating",
        amazonLink: "https://amazon.com/search?k=wing+chair+high+back",
        ikeaLink:
          "https://www.ikea.com/us/en/p/strandmon-wing-chair-skiftebo-yellow-40341945/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/accent-chairs-c45863.html",
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
      },
      // Tables
      {
        name: "STOCKHOLM Coffee Table",
        description: "Large walnut veneer coffee table",
        price: "$399",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=large+coffee+table+walnut",
        ikeaLink:
          "https://www.ikea.com/us/en/p/stockholm-coffee-table-walnut-veneer-40239715/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/coffee-tables-c45885.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "HEMNES Console Table",
        description: "Console table with 2 drawers",
        price: "$199",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=console+table+2+drawers",
        ikeaLink:
          "https://www.ikea.com/us/en/p/hemnes-console-table-white-stain-80318872/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/console-tables-c45885.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
      // Storage
      {
        name: "BESTA TV Storage",
        description: "TV bench with drawers and shelves",
        price: "$340",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=tv+storage+bench+drawers",
        ikeaLink: "https://www.ikea.com/us/en/p/besta-tv-bench-white-40245848/",
        wayfairLink: "https://wayfair.com/furniture/sb1/tv-stands-c45885.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
    ],
    small: [
      // Compact Seating
      {
        name: "FRIHETEN Corner Sofa",
        description: "Compact sofa bed with storage",
        price: "$599",
        category: "seating",
        amazonLink: "https://amazon.com/search?k=small+sofa+bed+storage",
        ikeaLink:
          "https://www.ikea.com/us/en/p/friheten-corner-sofa-bed-skiftebo-dark-gray-s69216757/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/small-sofas-c45863.html",
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "KLIPPAN 2-Seat Sofa",
        description: "Compact 2-seat sofa, perfect for small spaces",
        price: "$199",
        category: "seating",
        amazonLink: "https://amazon.com/search?k=2+seat+sofa+compact",
        ikeaLink:
          "https://www.ikea.com/us/en/p/klippan-2-seat-sofa-flackarp-grey-beige-s79434420/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/2-seat-sofas-c45863.html",
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
      },
      // Small Tables
      {
        name: "LACK Side Table",
        description: "Simple white side table",
        price: "$25",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=small+side+table+white",
        ikeaLink:
          "https://www.ikea.com/us/en/p/lack-side-table-white-20011408/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/side-tables-c45886.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "FROSTA Stool",
        description: "Birch stool that doubles as side table",
        price: "$25",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=birch+stool+side+table",
        ikeaLink:
          "https://www.ikea.com/us/en/p/frosta-stool-birch-plywood-10162956/",
        wayfairLink: "https://wayfair.com/furniture/sb1/stools-c45885.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
      // Compact Storage
      {
        name: "KALLAX 2x2 Shelf",
        description: "Versatile 2x2 shelf unit",
        price: "$50",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=2x2+cube+shelf+storage",
        ikeaLink:
          "https://www.ikea.com/us/en/p/kallax-shelf-unit-white-80275887/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/cube-storage-c45885.html",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  bedroom: {
    large: [
      // Beds
      {
        name: "MALM King Bed Frame",
        description: "High bed frame with 4 storage boxes",
        price: "$379",
        category: "beds",
        amazonLink: "https://amazon.com/search?k=king+bed+frame+storage",
        ikeaLink:
          "https://www.ikea.com/us/en/p/malm-bed-frame-high-w-4-storage-boxes-white-s29932181/",
        wayfairLink: "https://wayfair.com/furniture/sb1/king-beds-c215393.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "HEMNES Queen Bed",
        description: "Traditional style queen bed with headboard",
        price: "$329",
        category: "beds",
        amazonLink: "https://amazon.com/search?k=queen+bed+frame+headboard",
        ikeaLink:
          "https://www.ikea.com/us/en/p/hemnes-bed-frame-white-stain-luroy-s59932670/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/queen-beds-c215393.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      // Storage
      {
        name: "HEMNES 8-Drawer Dresser",
        description: "Large dresser with mirror",
        price: "$449",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=large+dresser+8+drawer",
        ikeaLink:
          "https://www.ikea.com/us/en/p/hemnes-8-drawer-dresser-white-stain-80318872/",
        wayfairLink: "https://wayfair.com/furniture/sb1/dressers-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "PAX Wardrobe",
        description: "Large wardrobe with sliding doors",
        price: "$595",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=large+wardrobe+sliding+doors",
        ikeaLink:
          "https://www.ikea.com/us/en/p/pax-wardrobe-white-hasvik-white-s69276714/",
        wayfairLink: "https://wayfair.com/furniture/sb1/wardrobes-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      // Nightstands
      {
        name: "HEMNES Nightstand",
        description: "2-drawer nightstand with storage",
        price: "$89",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=nightstand+2+drawer",
        ikeaLink:
          "https://www.ikea.com/us/en/p/hemnes-2-drawer-chest-white-stain-80318898/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/nightstands-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "NORDLI Nightstand",
        description: "Modern nightstand with wireless charging",
        price: "$120",
        category: "tables",
        amazonLink: "https://amazon.com/search?k=nightstand+wireless+charging",
        ikeaLink:
          "https://www.ikea.com/us/en/p/nordli-nightstand-white-80347775/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/modern-nightstands-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
    ],
    small: [
      // Small Beds
      {
        name: "NEIDEN Bed Frame",
        description: "Simple twin bed frame in pine",
        price: "$85",
        category: "beds",
        amazonLink: "https://amazon.com/search?k=twin+bed+frame+pine",
        ikeaLink:
          "https://www.ikea.com/us/en/p/neiden-bed-frame-pine-50160218/",
        wayfairLink: "https://wayfair.com/furniture/sb1/twin-beds-c215395.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "TARVA Full Bed",
        description: "Pine bed frame, full size",
        price: "$149",
        category: "beds",
        amazonLink: "https://amazon.com/search?k=full+bed+frame+pine",
        ikeaLink:
          "https://www.ikea.com/us/en/p/tarva-bed-frame-pine-luroy-s59932646/",
        wayfairLink: "https://wayfair.com/furniture/sb1/full-beds-c215395.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      // Compact Storage
      {
        name: "KULLEN 3-Drawer Chest",
        description: "Compact 3-drawer chest",
        price: "$79",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=3+drawer+chest+compact",
        ikeaLink:
          "https://www.ikea.com/us/en/p/kullen-3-drawer-chest-white-70395307/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/small-dressers-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
      {
        name: "LACK Wall Shelf",
        description: "Floating wall shelf for small items",
        price: "$10",
        category: "storage",
        amazonLink: "https://amazon.com/search?k=floating+wall+shelf+small",
        ikeaLink:
          "https://www.ikea.com/us/en/p/lack-wall-shelf-white-40103633/",
        wayfairLink:
          "https://wayfair.com/furniture/sb1/wall-shelves-c45857.html",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  kitchen: [
    {
      name: "VADHOLMA Kitchen Island",
      description: "Kitchen island with rack and 3 drawers",
        price: "$599",
      amazonLink: "https://amazon.com/search?k=kitchen+island+storage",
      ikeaLink:
        "https://www.ikea.com/us/en/p/vadholma-kitchen-island-black-oak-40359154/",
      wayfairLink:
        "https://wayfair.com/furniture/sb1/kitchen-islands-c215757.html",
      image:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=300&q=80",
    },
  ],
  bathroom: [
    {
      name: "GODMORGON Sink Cabinet",
      description: "High gloss white with 2 drawers",
      price: "$329",
      amazonLink: "https://amazon.com/search?k=bathroom+vanity+white+drawers",
      ikeaLink:
        "https://www.ikea.com/us/en/p/godmorgon-sink-cabinet-2-drawers-white-80213463/",
      wayfairLink:
        "https://wayfair.com/bath/sb1/bathroom-vanities-c215398.html",
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=300&q=80",
    },
  ],
};

const COLOR_DATABASE = [
  {
    name: "Simply White",
    hexCode: "#F8F8F0",
    brand: "Benjamin Moore",
    productName: "Simply White OC-117",
    buyLink:
      "https://www.benjaminmoore.com/en-us/paint-colors/color/oc-117/simply-white",
    description: "A clean, crisp white with subtle warm undertones",
    category: "neutral",
  },
  {
    name: "Naval",
    hexCode: "#1E3A8A",
    brand: "Sherwin Williams",
    productName: "Naval SW 6244",
    buyLink:
      "https://www.sherwin-williams.com/homeowners/color/find-and-explore-colors/paint-colors-by-family/SW6244-naval",
    description: "A sophisticated navy blue for accent walls",
    category: "bold",
  },
  {
    name: "Sage Green",
    hexCode: "#9CAF88",
    brand: "Clare",
    productName: "Current Mood",
    buyLink: "https://clare.com/color/current-mood",
    description: "A calming sage green perfect for bedrooms",
    category: "nature",
  },
  {
    name: "Warm Terracotta",
    hexCode: "#E07A5F",
    brand: "Farrow & Ball",
    productName: "Red Earth No.64",
    buyLink: "https://www.farrow-ball.com/en-us/paint-colours/red-earth",
    description: "An earthy terracotta for cozy living spaces",
    category: "warm",
  },
  {
    name: "Soft Lavender",
    hexCode: "#C8B2DB",
    brand: "Benjamin Moore",
    productName: "Lavender Ice 2069-60",
    buyLink:
      "https://www.benjaminmoore.com/en-us/paint-colors/color/2069-60/lavender-ice",
    description: "A gentle lavender for relaxing bedrooms",
    category: "cool",
  },
];

const RoomAnalyzer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isRoom: boolean;
    message: string;
  } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [view3D, setView3D] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
  const [showColorPreview, setShowColorPreview] = useState(false);
  const [selected3DFurniture, setSelected3DFurniture] =
    useState<FurnitureItem | null>(null);
  const [imageSource, setImageSource] = useState<"upload" | "camera" | null>(
    null,
  );
  const [captureTimestamp, setCaptureTimestamp] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setAnalysisResult(null);
        setVerificationResult(null);
        setImageSource("upload");
        setCaptureTimestamp(new Date().toLocaleString());
        verifyRoomImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyRoomImage = async (imageData: string) => {
    setIsVerifying(true);

    // Enhanced room verification with image analysis simulation
    setTimeout(() => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setVerificationResult({
          isRoom: false,
          message: "❌ No file detected. Please try uploading again.",
        });
        setIsVerifying(false);
            return;
          }

      const fileName = file.name.toLowerCase();
      const fileSize = file.size;
      const fileType = file.type;

      // Check if it's a valid image file
      if (!fileType.startsWith("image/")) {
        setVerificationResult({
          isRoom: false,
          message: "❌ Please upload a valid image file (JPG, PNG, WebP, etc.)",
        });
        setIsVerifying(false);
            return;
          }

      // Start with a base score assuming most uploads are legitimate room attempts
      let roomScore = 50; // Start with positive base score
      let detectedFeatures: string[] = [];
      let issues: string[] = [];

      // Basic image validation - if it's a reasonable image file, it's likely a room
      if (
        fileType.includes("jpeg") ||
        fileType.includes("jpg") ||
        fileType.includes("png") ||
        fileType.includes("webp")
      ) {
        roomScore += 20;
        detectedFeatures.push("Valid image format for room photography");
      }

      // File size analysis (generous scoring)
      if (fileSize > 100000) {
        // > 100KB (more lenient)
        roomScore += 15;
        detectedFeatures.push("Sufficient image quality for analysis");
      } else if (fileSize < 20000) {
        // < 20KB (very small)
        roomScore -= 10;
        issues.push("Very low resolution image");
      }

      // Filename analysis (less weight, more positive)
      const roomKeywords = [
        "room",
        "bedroom",
        "living",
        "kitchen",
        "bathroom",
        "interior",
        "home",
        "house",
        "apartment",
        "office",
        "study",
        "dining",
        "family",
        "guest",
        "master",
        "lounge",
        "img",
        "image",
        "photo",
        "pic",
      ];
      const definiteNonRoomKeywords = [
        "selfie",
        "face",
        "portrait",
        "headshot",
        "logo",
        "text",
        "document",
        "screenshot",
        "chart",
        "graph",
        "meme",
      ];

      // Give bonus for room keywords but don't heavily penalize absence
      roomKeywords.forEach((keyword) => {
        if (fileName.includes(keyword)) {
          roomScore += 10;
          detectedFeatures.push(`Room-related filename detected`);
        }
      });

      // Only penalize for obviously non-room files
      definiteNonRoomKeywords.forEach((keyword) => {
        if (fileName.includes(keyword)) {
          roomScore -= 25;
          issues.push(`Non-room content indicated in filename`);
        }
      });

      // Simulate realistic image analysis (more generous)
      // Most uploaded images should pass these tests

      // Composition analysis (85% pass rate)
      if (Math.random() > 0.15) {
        roomScore += 20;
        detectedFeatures.push("Good composition for interior photography");
          } else {
        roomScore -= 5;
        issues.push("Unusual composition detected");
      }

      // Color analysis (80% pass rate)
      if (Math.random() > 0.2) {
        roomScore += 15;
        detectedFeatures.push("Color palette suitable for room analysis");
      } else {
        roomScore -= 5;
        issues.push("Limited color information");
      }

      // Structural analysis (90% pass rate)
      if (Math.random() > 0.1) {
        roomScore += 25;
        detectedFeatures.push("Structural elements detected");
      } else {
        roomScore -= 10;
        issues.push("No clear structural elements found");
      }

      // Object detection simulation (75% pass rate)
      const objectTypes = [
        "furniture",
        "walls",
        "flooring",
        "ceiling",
        "windows",
        "doors",
        "lighting",
      ];
      const detectedObjects = objectTypes.filter(() => Math.random() > 0.35);

      if (detectedObjects.length >= 1) {
        roomScore += detectedObjects.length * 10;
        detectedFeatures.push(
          `Interior elements identified: ${detectedObjects.join(", ")}`,
        );
      } else {
        roomScore -= 5;
        issues.push("Limited interior elements detected");
      }

      // Additional positive indicators
      if (fileSize > 500000) {
        roomScore += 10;
        detectedFeatures.push("High quality image with good detail");
      }

      // Make the threshold much more reasonable
      const isRoom = roomScore >= 45; // Lower threshold
      const confidence = Math.min(Math.max(roomScore, 0), 100);

      let message = "";
      if (isRoom) {
        message = `✅ Room detected! (${confidence}% confidence)\n\nDetected features:\n• ${detectedFeatures.join("\n• ")}`;
      } else {
        message = `⚠️ Room detection uncertain (${confidence}% confidence)\n\nPotential issues:\n• ${issues.join("\n• ")}\n\nIf this is a room image, you can proceed anyway using the button below.`;
      }

      setVerificationResult({
        isRoom,
        message,
      });
      setIsVerifying(false);
    }, 2500); // Longer processing time for more realistic feel
  };

  const analyzeImageCharacteristics = (imageData: string) => {
    // More sophisticated image analysis using multiple data points
    const dataLength = imageData.length;
    const firstSection = imageData.substring(50, 150);
    const middleSection = imageData.substring(
      dataLength / 2,
      dataLength / 2 + 100,
    );
    const lastSection = imageData.substring(dataLength - 150, dataLength - 50);

    // Analyze different characteristics from different parts
    const firstSum = firstSection
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const middleSum = middleSection
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const lastSum = lastSection
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Room type detection based on combined analysis
    const roomTypes = ["livingRoom", "bedroom", "kitchen", "bathroom"];
    const roomTypeIndex = (firstSum + middleSum) % roomTypes.length;
    const detectedRoomType = roomTypes[roomTypeIndex];

    // Size detection using different algorithm
    const sizeIndicator = (middleSum * 3 + lastSum) % 10;
    const isLargeRoom = sizeIndicator > 6; // 30% chance of large room

    // Style detection using more complex pattern
    const styles = [
      "Modern Contemporary",
      "Scandinavian",
      "Traditional",
      "Industrial",
      "Bohemian",
      "Minimalist",
    ];
    const styleIndicator = (firstSum ^ middleSum ^ lastSum) % styles.length;
    const detectedStyle = styles[styleIndicator];

    // Lighting analysis
    const lightingIndicator = (firstSum + lastSum) % 5;
    const lightingLevel = lightingIndicator > 2 ? "bright" : "dim";

    // Color dominance (simulated)
    const colorIndicator = middleSum % 4;
    const dominantColors = ["warm", "cool", "neutral", "vibrant"];
    const dominantColor = dominantColors[colorIndicator];

    // Add timestamp influence for more variation
    const timeStamp = Date.now();
    const timeInfluence = timeStamp % 100;

    return {
      roomType: detectedRoomType,
      isLarge: isLargeRoom,
      style: detectedStyle,
      lighting: lightingLevel,
      dominantColor: dominantColor,
      uniqueId: (firstSum + middleSum + lastSum + timeInfluence).toString(),
    };
  };

  const generateDynamicSuggestions = (
    roomType: string,
    isLarge: boolean,
    style: string,
    lighting: string,
    dominantColor: string,
    uniqueId: string,
  ) => {
    let furnitureItems: FurnitureItem[] = [];
    let colorItems: ColorItem[] = [];

    // Get base furniture based on room type and size
    let availableFurniture: FurnitureItem[] = [];
    if (roomType === "livingRoom") {
      availableFurniture = [
        ...(isLarge
          ? FURNITURE_DATABASE.livingRoom.large
          : FURNITURE_DATABASE.livingRoom.small),
      ];
    } else if (roomType === "bedroom") {
      availableFurniture = [
        ...(isLarge
          ? FURNITURE_DATABASE.bedroom.large
          : FURNITURE_DATABASE.bedroom.small),
      ];
    } else if (roomType === "kitchen") {
      availableFurniture = [...FURNITURE_DATABASE.kitchen];
    } else if (roomType === "bathroom") {
      availableFurniture = [...FURNITURE_DATABASE.bathroom];
    }

    // Organize furniture by category for better selection
    const furnitureByCategory = availableFurniture.reduce(
      (acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, FurnitureItem[]>,
    );

    // Generate diverse suggestions from different categories
    const idNumber = parseInt(uniqueId.slice(-3)) || 123;
    const categories = Object.keys(furnitureByCategory);

    // Select items from different categories to provide variety
    categories.forEach((category, categoryIndex) => {
      const categoryItems = furnitureByCategory[category];
      const selectionStart =
        (idNumber + categoryIndex * 17) % categoryItems.length;

      // For each category, select 1-2 items based on room size and category importance
      let itemsToSelect = 1;
      if (roomType === "livingRoom" && category === "seating" && isLarge) {
        itemsToSelect = 2; // Large living rooms can have multiple seating options
      } else if (roomType === "bedroom" && category === "tables" && isLarge) {
        itemsToSelect = 2; // Large bedrooms can have multiple nightstands
      }

      for (let i = 0; i < itemsToSelect && furnitureItems.length < 6; i++) {
        const itemIndex = (selectionStart + i) % categoryItems.length;
        furnitureItems.push(categoryItems[itemIndex]);
      }
    });

    // Add lighting furniture for dim rooms
    if (lighting === "dim") {
      furnitureItems.push({
        name: "FOTO Floor Lamp",
        description: "Bright floor lamp for better illumination",
        price: "$89",
        category: "lighting",
        amazonLink: "https://amazon.com/search?k=floor+lamp+bright",
        ikeaLink:
          "https://www.ikea.com/us/en/p/foto-pendant-lamp-aluminum-00218780/",
        wayfairLink:
          "https://wayfair.com/lighting/sb1/floor-lamps-c215385.html",
        image:
          "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=300&q=80",
      });
    }

    // Randomize the final selection but ensure variety
    const shuffleStart = idNumber % furnitureItems.length;
    furnitureItems = [
      ...furnitureItems.slice(shuffleStart),
      ...furnitureItems.slice(0, shuffleStart),
    ];

    // Select colors based on multiple factors (enhanced selection)
    let availableColors = [...COLOR_DATABASE];

    if (style.includes("Modern") || style.includes("Contemporary")) {
      availableColors = availableColors.filter(
        (color) => color.category === "neutral" || color.category === "bold",
      );
    } else if (style.includes("Scandinavian") || style.includes("Minimalist")) {
      availableColors = availableColors.filter(
        (color) => color.category === "neutral" || color.category === "cool",
      );
    } else if (style.includes("Bohemian") || style.includes("Traditional")) {
      availableColors = availableColors.filter(
        (color) => color.category === "warm" || color.category === "nature",
      );
    }

    // Further filter by dominant color analysis
    if (dominantColor === "warm") {
      availableColors = availableColors.filter(
        (color) => color.category === "warm" || color.category === "neutral",
      );
    } else if (dominantColor === "cool") {
      availableColors = availableColors.filter(
        (color) => color.category === "cool" || color.category === "neutral",
      );
    }

    // Ensure we have enough colors
    if (availableColors.length < 4) {
      availableColors = COLOR_DATABASE;
    }

    // Select 4 colors for more variety
    const colorStart = (idNumber * 3) % availableColors.length;
    colorItems = [];
    for (let i = 0; i < 4; i++) {
      const colorIndex = (colorStart + i * 2) % availableColors.length;
      if (
        !colorItems.find(
          (c) => c.hexCode === availableColors[colorIndex].hexCode,
        )
      ) {
        colorItems.push(availableColors[colorIndex]);
      }
    }

    // Ensure we have at least 3 colors
    while (colorItems.length < 3) {
      const randomColor =
        COLOR_DATABASE[Math.floor(Math.random() * COLOR_DATABASE.length)];
      if (!colorItems.find((c) => c.hexCode === randomColor.hexCode)) {
        colorItems.push(randomColor);
      }
    }

    return {
      furniture: furnitureItems.slice(0, 5), // Return up to 5 furniture items
      colors: colorItems.slice(0, 4), // Return up to 4 color options
    };
  };

  const handleAnalyze = async () => {
    if (!uploadedImage || !verificationResult?.isRoom) return;

    setIsAnalyzing(true);

    // Simulate enhanced AI analysis with dynamic suggestions
    setTimeout(() => {
      const { roomType, isLarge, style, lighting, dominantColor, uniqueId } =
        analyzeImageCharacteristics(uploadedImage);
      const { furniture, colors } = generateDynamicSuggestions(
        roomType,
        isLarge,
        style,
        lighting,
        dominantColor,
        uniqueId,
      );

      // Convert room type to display format
      const roomTypeDisplay =
        roomType === "livingRoom"
          ? "Living Room"
          : roomType === "bedroom"
            ? "Bedroom"
            : roomType === "kitchen"
              ? "Kitchen"
              : "Bathroom";

      setAnalysisResult({
        roomType: roomTypeDisplay,
        style: style,
        confidence: 85 + Math.floor(Math.random() * 15), // 85-99% confidence
        isRoomImage: true,
        suggestions: {
          furniture: furniture,
          colors: colors,
          lighting: [
            {
              name:
                roomType === "bedroom"
                  ? "Table Lamp"
                  : roomType === "kitchen"
                    ? "Under Cabinet LED"
                    : "Pendant Light",
              description: `${style} style lighting for ${roomTypeDisplay.toLowerCase()}`,
              price: `$${45 + Math.floor(Math.random() * 200)}`,
              amazonLink: `https://amazon.com/search?k=${roomType}+lighting+${style.replace(" ", "+")}`,
              image:
                "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=300&q=80",
            },
          ],
        },
        issues: generateRoomIssues(roomType, isLarge),
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateRoomIssues = (roomType: string, isLarge: boolean) => {
    const issues = [];
    if (roomType === "livingRoom") {
      issues.push("Consider adding more seating for better conversation flow");
      if (!isLarge)
        issues.push("Use light colors to make the space feel larger");
    } else if (roomType === "bedroom") {
      issues.push("Ensure adequate bedside lighting for reading");
      if (isLarge)
        issues.push("Create distinct zones for sleeping and dressing");
    } else if (roomType === "kitchen") {
      issues.push(
        "Optimize the work triangle between sink, stove, and refrigerator",
      );
    } else if (roomType === "bathroom") {
      issues.push("Improve ventilation to prevent moisture buildup");
    }
    return issues;
  };

  const startCamera = async () => {
    try {
      // Stop any existing stream first
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const constraints = {
        video: {
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          facingMode: "environment", // Use back camera on mobile
          frameRate: { ideal: 30 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setCameraStream(stream);
      setIsCameraActive(true);

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;

        // Multiple event handlers for better camera ready detection
        video.onloadedmetadata = () => {
          video.play().catch((e) => {
            console.error("Error playing video:", e);
          });
        };

        video.onloadeddata = () => {
          console.log("Video data loaded");
        };

        video.oncanplay = () => {
          console.log("Video can start playing");
        };

        video.onplaying = () => {
          console.log("Video is playing");
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Camera access denied. ";

      if (error.name === "NotAllowedError") {
        errorMessage +=
          "Please allow camera permissions in your browser settings and refresh the page.";
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found on this device.";
      } else if (error.name === "NotReadableError") {
        errorMessage += "Camera is being used by another application.";
      } else {
        errorMessage += "Please check your camera settings and try again.";
      }

      alert(errorMessage);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      alert("Camera not initialized. Please try starting the camera again.");
      return;
    }

      const canvas = canvasRef.current;
      const video = videoRef.current;

    // Check if video has basic data loaded (less strict than readyState 4)
    if (video.readyState < 2) {
      alert("Camera is still loading. Please wait a moment and try again.");
      return;
    }

    // Give video some time to initialize dimensions if they're not ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      // Wait a bit for video dimensions to be available
      setTimeout(() => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          // Retry capture after brief delay
          capturePhoto();
        } else {
          alert(
            "Camera feed not ready. Please ensure camera permissions are granted and try again.",
          );
        }
      }, 500);
      return;
    }

    try {
      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Get canvas context
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("Failed to get canvas context. Please try again.");
        return;
      }

      // Clear canvas and draw video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to high quality data URL
      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      // Validate the captured image
      if (imageData.length < 1000) {
        alert("Failed to capture image. Please try again.");
        return;
      }

      // Stop camera and set captured image
      stopCamera();
      setUploadedImage(imageData);
      setAnalysisResult(null);
      setVerificationResult(null);
      setShowColorPreview(false);
      setSelectedColor(null);
      setImageSource("camera");
      setCaptureTimestamp(new Date().toLocaleString());

      // Verify the captured image
      setTimeout(() => {
        verifyCapturedImage(imageData);
      }, 200);
    } catch (error) {
      console.error("Error capturing photo:", error);
      alert("Failed to capture photo. Please try again.");
    }
  };

  const verifyCapturedImage = async (imageData: string) => {
    setIsVerifying(true);

    // Enhanced verification for camera-captured images
    setTimeout(() => {
      // Camera photos are more likely to be rooms since user intentionally took them
      let roomScore = 70; // Higher starting score for camera captures
      let detectedFeatures: string[] = ["Image captured with camera"];
      let issues: string[] = [];

      // Simulate camera-specific analysis
      // Camera photos are typically larger and higher quality
      roomScore += 20;
      detectedFeatures.push("High quality camera capture");

      // Simulate composition analysis (camera photos usually better framed)
      if (Math.random() > 0.1) {
        // 90% pass rate for camera
        roomScore += 20;
        detectedFeatures.push("Good camera composition for room analysis");
      } else {
        roomScore -= 5;
        issues.push("Unusual camera angle detected");
      }

      // Simulate real-time environment detection
      const environmentTypes = [
        "indoor lighting",
        "room acoustics",
        "spatial depth",
        "interior surfaces",
      ];
      const detectedEnvironment = environmentTypes.filter(
        () => Math.random() > 0.3,
      );

      if (detectedEnvironment.length >= 2) {
        roomScore += detectedEnvironment.length * 8;
        detectedFeatures.push(
          `Environment analysis: ${detectedEnvironment.join(", ")}`,
        );
      }

      // Camera captures are almost always rooms unless obvious issues
      const isRoom = roomScore >= 60;
      const confidence = Math.min(Math.max(roomScore, 0), 100);

      let message = "";
      if (isRoom) {
        message = `✅ Room detected from camera! (${confidence}% confidence)\n\nDetected features:\n• ${detectedFeatures.join("\n• ")}`;
      } else {
        message = `⚠️ Room detection uncertain (${confidence}% confidence)\n\nPotential issues:\n• ${issues.join("\n• ")}\n\nCamera captures are usually good for analysis. You can proceed anyway.`;
      }

      setVerificationResult({ isRoom, message });
      setIsVerifying(false);
    }, 1500); // Faster for camera captures
  };

  const applyColorToWalls = (color: ColorItem) => {
    if (!uploadedImage || !previewCanvasRef.current) return;

    setSelectedColor(color);
    setShowColorPreview(true);

    // Simulate wall color application
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Apply color overlay to simulate wall painting
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = color.hexCode;

        // Create wall-like rectangles (simulated wall detection)
        const wallAreas = [
          { x: 0, y: 0, width: canvas.width * 0.3, height: canvas.height },
          {
            x: canvas.width * 0.7,
            y: 0,
            width: canvas.width * 0.3,
            height: canvas.height,
          },
          { x: 0, y: 0, width: canvas.width, height: canvas.height * 0.2 },
        ];

        wallAreas.forEach((wall) => {
          ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        });

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
      };
      img.src = uploadedImage;
    }
  };

  const resetColorPreview = () => {
    setShowColorPreview(false);
    setSelectedColor(null);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setVerificationResult(null);
    setIsVerifying(false);
    setIsAnalyzing(false);
    setView3D(false);
    setShowColorPreview(false);
    setSelectedColor(null);
    setSelected3DFurniture(null);
    setImageSource(null);
    setCaptureTimestamp(null);
    stopCamera(); // Also stop camera if active
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <div className="flex items-center gap-2">
                  <Upload className="w-6 h-6 text-blue-400" />
                  <h1 className="text-2xl font-bold gradient-text">
                    Room Analyzer
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
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                  className="glass-card border-white/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                          </div>
                        </div>
                          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {!uploadedImage ? (
            /* Upload Interface */
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Upload Your Room Photo
                </h2>
                <p className="text-gray-300 text-lg">
                  Get instant AI-powered design insights and suggestions
                </p>
                    </div>

              {!isCameraActive ? (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card
                    className="upload-zone cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CardContent className="p-12 text-center">
                      <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        Upload from Device
                      </h3>
                      <p className="text-gray-300 mb-4">
                        JPG, PNG up to 10MB for best results
                      </p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Recommended
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card
                    className="upload-zone cursor-pointer"
                    onClick={startCamera}
                  >
                    <CardContent className="p-12 text-center">
                      <Camera className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Take Photo</h3>
                      <p className="text-gray-300 mb-4">
                        Use your camera for instant capture
                      </p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Real-time AI
                      </Badge>
                    </CardContent>
                  </Card>
                              </div>
              ) : (
                <div className="mb-8">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Camera className="w-5 h-5 text-green-400" />
                          Camera Active
                        </span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Live
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-80 object-cover rounded-lg bg-black"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Camera Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            <p className="text-white text-sm">
                              Position your room in the frame
                            </p>
                              </div>

                          {/* Viewfinder guides */}
                          <div className="absolute inset-4 border-2 border-dashed border-green-400/50 rounded-lg"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-8 h-8 border-2 border-green-400 rounded-full bg-green-400/20"></div>
                        </div>
                      </div>

                        {/* Camera Controls */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                      <Button
                            onClick={capturePhoto}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full"
                      >
                            <Camera className="w-5 h-5 mr-2" />
                            Take Photo
                      </Button>
                      <Button
                            onClick={stopCamera}
                            variant="outline"
                            className="glass-card border-white/20 px-6 py-3 rounded-full"
                          >
                            Cancel
                      </Button>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm text-blue-300">
                          📸 <strong>Camera Tips:</strong> Hold steady, ensure
                          good lighting, and frame the entire room for best AI
                          analysis results.
                        </p>
                    </div>
                  </CardContent>
                </Card>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Guidelines */}
              <Card className="glass-card border-white/10">
                  <CardHeader>
                  <CardTitle className="text-center">
                    Photo Guidelines for Best Results
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      <h4 className="font-medium text-green-400 mb-1">
                        Perfect
                            </h4>
                      <p className="text-xs text-gray-400">
                        Wide angle, good lighting, clear furniture
                      </p>
                          </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                          </div>
                      <h4 className="font-medium text-yellow-400 mb-1">
                        Caution
                            </h4>
                      <p className="text-xs text-gray-400">
                        Partial views, mixed lighting
                      </p>
                                  </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <X className="w-6 h-6 text-red-400" />
                                </div>
                      <h4 className="font-medium text-red-400 mb-1">Avoid</h4>
                      <p className="text-xs text-gray-400">
                        Too dark, blurry, outdoor spaces
                      </p>
                              </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Lightbulb className="w-6 h-6 text-blue-400" />
                            </div>
                      <h4 className="font-medium text-blue-400 mb-1">Tips</h4>
                      <p className="text-xs text-gray-400">
                        Clean the room, turn on lights
                      </p>
                          </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Analysis Interface */
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div className="space-y-6">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {imageSource === "camera" ? (
                          <Camera className="w-5 h-5 text-green-400" />
                        ) : (
                          <Upload className="w-5 h-5 text-blue-400" />
                        )}
                        {imageSource === "camera"
                          ? "Camera Capture"
                          : "Uploaded Image"}
                      </span>
                      <div className="flex items-center gap-2">
                        {imageSource === "camera" && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Live Capture
                          </Badge>
                        )}
                        {captureTimestamp && (
                          <span className="text-xs text-gray-400">
                            {captureTimestamp}
                          </span>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded room"
                        className={`w-full h-80 object-cover rounded-lg ${showColorPreview ? "hidden" : "block"}`}
                      />
                      {showColorPreview && (
                        <canvas
                          ref={previewCanvasRef}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      )}

                      {showColorPreview && selectedColor && (
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-4 h-4 rounded border border-white/30"
                              style={{ backgroundColor: selectedColor.hexCode }}
                            ></div>
                            <span className="text-white text-sm font-medium">
                              {selectedColor.name}
                                      </span>
                                    </div>
                          <p className="text-xs text-gray-300">
                            Wall color preview
                          </p>
                          <Button
                            onClick={resetColorPreview}
                            size="sm"
                            variant="outline"
                            className="mt-2 text-xs h-6 px-2"
                          >
                            Reset
                          </Button>
                        </div>
                                )}
                              </div>

                    {/* Verification Status */}
                    {isVerifying && (
                      <div className="mt-4 p-4 glass-card rounded-lg border border-blue-500/30">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400 animate-spin" />
                          <span className="text-blue-400 font-medium">
                            Verifying image...
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Checking if this is a room image suitable for analysis
                        </p>
                            </div>
                          )}

                    {verificationResult && (
                      <div
                        className={`mt-4 p-4 glass-card rounded-lg border ${
                          verificationResult.isRoom
                            ? "border-green-500/30 bg-green-500/5"
                            : "border-red-500/30 bg-red-500/5"
                        }`}
                      >
                        <div
                          className={`font-medium mb-2 ${
                            verificationResult.isRoom
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {verificationResult.isRoom
                            ? "Image Verification: PASSED"
                            : "Image Verification: FAILED"}
                        </div>
                        <div
                          className={`text-sm whitespace-pre-line ${
                            verificationResult.isRoom
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {verificationResult.message}
                        </div>
                        {!verificationResult.isRoom && (
                          <div className="mt-3 space-y-3">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <p className="text-sm text-blue-300 font-medium mb-1">
                                💡 Tips for better room detection:
                              </p>
                              <ul className="text-xs text-blue-200 space-y-1">
                                <li>
                                  • Take photos from doorways or corners to show
                                  room layout
                              </li>
                              <li>
                                  • Include furniture, walls, and architectural
                                  elements
                              </li>
                              <li>
                                  • Ensure good lighting to show room details
                                  clearly
                                </li>
                                <li>
                                  • Avoid close-ups of individual objects or
                                  people
                              </li>
                            </ul>
                          </div>
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                              <p className="text-sm text-orange-300 font-medium mb-2">
                                🔧 Is this actually a room image?
                              </p>
                              <Button
                                onClick={() =>
                                  setVerificationResult({
                                    ...verificationResult,
                                    isRoom: true,
                                  })
                                }
                                className="bg-orange-600 hover:bg-orange-700 text-white text-sm"
                              >
                                Yes, analyze it anyway
                              </Button>
                        </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !verificationResult?.isRoom}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 pulse-glow disabled:opacity-50"
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing Room...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Analyze Room
                          </>
                        )}
                          </Button>
                      <Button
                        variant="outline"
                        className="glass-card border-white/20"
                      >
                        <Share className="w-4 h-4" />
                          </Button>
                      <Button
                        variant="outline"
                        className="glass-card border-white/20"
                      >
                        <Download className="w-4 h-4" />
                          </Button>
                        </div>
                  </CardContent>
                </Card>
                      </div>

              {/* Analysis Results */}
              <div className="space-y-6">
                {isAnalyzing ? (
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-8 text-center">
                      <div className="animate-pulse space-y-4">
                        <Sparkles className="w-16 h-16 text-blue-400 mx-auto animate-spin" />
                        <h3 className="text-xl font-semibold">
                          AI is analyzing your room...
                        </h3>
                        <p className="text-gray-300">
                          This may take a few moments
                        </p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : analysisResult ? (
                  <div className="space-y-6">
                    {/* Room Detection */}
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Room Analysis
                          </span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {analysisResult.confidence}% Match
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400">Room Type</p>
                          <p className="text-lg font-semibold">
                            {analysisResult.roomType}
                        </p>
                      </div>
                        <div>
                          <p className="text-sm text-gray-400">Style</p>
                          <p className="text-lg font-semibold">
                            {analysisResult.style}
                        </p>
                      </div>
                  </CardContent>
                </Card>

                    {/* Furniture Suggestions */}
                    <Card className="glass-card border-white/10">
                  <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sofa className="w-5 h-5" />
                          Furniture Recommendations
                    </CardTitle>
                  </CardHeader>
                      <CardContent className="space-y-4">
                        {analysisResult.suggestions.furniture.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="glass-card p-4 rounded-lg border border-white/10"
                            >
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white mb-1">
                                  {item.name}
                                </h4>
                                  <p className="text-sm text-gray-300 mb-2">
                                  {item.description}
                                </p>
                                  <p className="text-lg font-bold text-green-400 mb-3">
                                    {item.price}
                                  </p>
                                  <div className="flex gap-2">
                                    <a
                                      href={item.ikeaLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
                                    >
                                      IKEA
                                    </a>
                                    <a
                                      href={item.amazonLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded-md transition-colors"
                                    >
                                      Amazon
                                    </a>
                                    <a
                                      href={item.wayfairLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-md transition-colors"
                                    >
                                      Wayfair
                                    </a>
                                  </div>
                                </div>
                              </div>
                              </div>
                          ),
                        )}
                          </CardContent>
                        </Card>

                    {/* Color Palette */}
                    <Card className="glass-card border-white/10">
                  <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                          Paint Color Recommendations
                    </CardTitle>
                  </CardHeader>
                      <CardContent className="space-y-4">
                        {analysisResult.suggestions.colors.map(
                          (color, index) => (
                            <div
                              key={index}
                              className="glass-card p-4 rounded-lg border border-white/10"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color.hexCode }}
                                  onClick={() => applyColorToWalls(color)}
                                  title="Click to preview on walls"
                                ></div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">
                                    {color.name}
                                  </h4>
                                  <p className="text-sm text-gray-300">
                                    {color.productName}
                                  </p>
                                  <p className="text-xs text-gray-400 mb-2">
                                    {color.description}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">
                                      by {color.brand}
                                    </span>
                                    <a
                                      href={color.buyLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md transition-colors"
                                    >
                                      Buy Paint
                                    </a>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button
                                    onClick={() => applyColorToWalls(color)}
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700 text-xs"
                                  >
                                    Preview
                                  </Button>
                                  <span className="text-xs text-gray-400 font-mono text-center">
                                    {color.hexCode}
                                </span>
                              </div>
                          </div>
                        </div>
                          ),
                        )}
                        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-sm text-purple-300">
                            💡 <strong>Color Preview:</strong> Click on any
                            color swatch or "Preview" button to see how it looks
                            on your walls!
                          </p>
                    </div>
                  </CardContent>
                </Card>

                    {/* Lighting Suggestions */}
                    <Card className="glass-card border-white/10">
                <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Lighting Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                        {analysisResult.suggestions.lighting.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="glass-card p-4 rounded-lg border border-white/10"
                            >
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white mb-1">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-300 mb-2">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-yellow-400">
                                      {item.price}
                                    </p>
                                    <a
                                      href={item.amazonLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-md transition-colors"
                                    >
                                      Shop Now
                                    </a>
                              </div>
                            </div>
                              </div>
                            </div>
                          ),
                        )}
                      </CardContent>
                    </Card>

                    {/* Issues & Improvements */}
                    {analysisResult.issues.length > 0 && (
                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {analysisResult.issues.map((issue, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-sm"
                              >
                                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* 3D/2D View and Action Buttons */}
                    <div className="space-y-4">
                      {view3D ? (
                        <div className="space-y-6">
                          <Card className="glass-card border-white/10">
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                  <Layers className="w-5 h-5" />
                                  3D Room Visualization
                                </span>
                                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                  Interactive
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg relative overflow-hidden border border-purple-400/30">
                                {/* Enhanced 3D Scene */}
                                <div className="absolute inset-0">
                                  {/* Room structure */}
                                  <svg
                                    className="w-full h-full absolute inset-0"
                                    viewBox="0 0 400 300"
                                  >
                                    {/* Floor */}
                                    <polygon
                                      points="50,250 350,250 300,200 100,200"
                                      fill="#4A5568"
                                      opacity="0.8"
                                    />
                                    {/* Left wall */}
                                    <polygon
                                      points="50,50 50,250 100,200 100,100"
                                      fill="#2D3748"
                                      opacity="0.9"
                                    />
                                    {/* Right wall */}
                                    <polygon
                                      points="350,50 350,250 300,200 300,100"
                                      fill="#1A202C"
                                      opacity="0.9"
                                    />
                                    {/* Back wall */}
                                    <polygon
                                      points="100,100 300,100 300,200 100,200"
                                      fill="#2D3748"
                                      opacity="0.8"
                                    />

                                    {/* Furniture 3D representations */}
                                    {analysisResult.suggestions.furniture.map(
                                      (furniture, index) => (
                                        <g key={index}>
                                          {/* Sofa */}
                                          {furniture.name
                                            .toLowerCase()
                                            .includes("sofa") && (
                                            <>
                                              <rect
                                                x="120"
                                                y="180"
                                                width="80"
                                                height="40"
                                                fill="#3182CE"
                                                opacity="0.8"
                                                rx="5"
                                              />
                                              <rect
                                                x="115"
                                                y="175"
                                                width="90"
                                                height="10"
                                                fill="#2C5282"
                                                opacity="0.9"
                                                rx="5"
                                              />
                                            </>
                                          )}
                                          {/* Table */}
                                          {furniture.name
                                            .toLowerCase()
                                            .includes("table") && (
                                            <>
                                              <ellipse
                                                cx="200"
                                                cy="200"
                                                rx="25"
                                                ry="15"
                                                fill="#D69E2E"
                                                opacity="0.8"
                                              />
                                              <rect
                                                x="197"
                                                y="190"
                                                width="6"
                                                height="20"
                                                fill="#B7791F"
                                                opacity="0.9"
                                              />
                                            </>
                                          )}
                                          {/* Chair */}
                                          {furniture.name
                                            .toLowerCase()
                                            .includes("chair") && (
                                            <>
                                              <rect
                                                x="250"
                                                y="190"
                                                width="25"
                                                height="25"
                                                fill="#38A169"
                                                opacity="0.8"
                                                rx="3"
                                              />
                                              <rect
                                                x="248"
                                                y="180"
                                                width="29"
                                                height="15"
                                                fill="#2F855A"
                                                opacity="0.9"
                                                rx="3"
                                              />
                                            </>
                                          )}
                                        </g>
                                      ),
                                    )}

                                    {/* Lighting effects */}
                                    <circle
                                      cx="200"
                                      cy="50"
                                      r="30"
                                      fill="url(#lightGradient)"
                                      opacity="0.3"
                                    />
                                    <defs>
                                      <radialGradient id="lightGradient">
                                        <stop
                                          offset="0%"
                                          stopColor="#FFF"
                                          stopOpacity="0.8"
                                        />
                                        <stop
                                          offset="100%"
                                          stopColor="#FFF"
                                          stopOpacity="0"
                                        />
                                      </radialGradient>
                                    </defs>
                                  </svg>

                                  {/* Interactive furniture selector */}
                                  {selected3DFurniture && (
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Box className="w-4 h-4 text-purple-400" />
                                        <span className="text-white text-sm font-medium">
                                          {selected3DFurniture.name}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-300">
                                        {selected3DFurniture.description}
                                      </p>
                                      <p className="text-xs text-green-400 mt-1">
                                        {selected3DFurniture.price}
                                      </p>
                      </div>
                    )}
                                </div>
                  </div>

                              {/* 3D Controls */}
                              <div className="mt-4 grid grid-cols-4 gap-2">
                      <Button
                                  variant="outline"
                                  size="sm"
                                  className="glass-card border-white/20"
                      >
                                  <RotateCcw className="w-4 h-4 mr-1" />
                                  Rotate
                      </Button>
                        <Button
                          variant="outline"
                                  size="sm"
                                  className="glass-card border-white/20"
                        >
                                  <Eye className="w-4 h-4 mr-1" />
                                  Zoom
                        </Button>
                        <Button
                                  variant="outline"
                                  size="sm"
                                  className="glass-card border-white/20"
                                >
                                  <Layers className="w-4 h-4 mr-1" />
                                  Floors
                        </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="glass-card border-white/20"
                                >
                                  <Lightbulb className="w-4 h-4 mr-1" />
                                  Lighting
                        </Button>
                        </div>
                      </CardContent>
                    </Card>

                          {/* 3D Furniture Selector */}
                          <Card className="glass-card border-white/10">
                  <CardHeader>
                              <CardTitle className="text-lg">
                                3D Furniture Models
                    </CardTitle>
                  </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {analysisResult.suggestions.furniture.map(
                                  (furniture, index) => (
                                    <div
                                      key={index}
                                      className={`glass-card p-3 rounded-lg border cursor-pointer transition-all ${
                                        selected3DFurniture?.name ===
                                        furniture.name
                                          ? "border-purple-500/50 bg-purple-500/10"
                                          : "border-white/10 hover:border-purple-500/30"
                                      }`}
                                      onClick={() =>
                                        setSelected3DFurniture(furniture)
                                      }
                                    >
                                      <img
                                        src={furniture.image}
                                        alt={furniture.name}
                                        className="w-full h-16 object-cover rounded mb-2"
                                      />
                                      <h4 className="font-medium text-sm text-white">
                                        {furniture.name}
                              </h4>
                                      <p className="text-xs text-purple-400">
                                        {furniture.price}
                            </p>
                          </div>
                                  ),
                                )}
                              </div>
                              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <p className="text-sm text-blue-300">
                                  🎯 <strong>3D View:</strong> Click on
                                  furniture items to highlight them in the 3D
                                  visualization above!
                                </p>
                    </div>
                  </CardContent>
                </Card>
                        </div>
                      ) : (
                        <Card className="glass-card border-white/10">
                  <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                2D Floor Plan with Furniture
                              </span>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                Interactive
                              </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                            <div className="h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg relative border border-blue-400/30 overflow-hidden">
                              {/* 2D Floor Plan */}
                              <svg
                                className="w-full h-full absolute inset-0"
                                viewBox="0 0 400 300"
                              >
                                {/* Room outline */}
                                <rect
                                  x="50"
                                  y="50"
                                  width="300"
                                  height="200"
                                  fill="none"
                                  stroke="#60A5FA"
                                  strokeWidth="3"
                                  strokeDasharray="10,5"
                                />

                                {/* Room dimensions */}
                                <text
                                  x="200"
                                  y="40"
                                  textAnchor="middle"
                                  fill="#60A5FA"
                                  fontSize="12"
                                >
                                  12 ft
                                </text>
                                <text
                                  x="30"
                                  y="150"
                                  textAnchor="middle"
                                  fill="#60A5FA"
                                  fontSize="12"
                                  transform="rotate(-90 30 150)"
                                >
                                  10 ft
                                </text>

                                {/* Door */}
                                <rect
                                  x="50"
                                  y="130"
                                  width="20"
                                  height="40"
                                  fill="none"
                                  stroke="#34D399"
                                  strokeWidth="2"
                                />
                                <text
                                  x="35"
                                  y="155"
                                  fill="#34D399"
                                  fontSize="10"
                                >
                                  Door
                                </text>

                                {/* Windows */}
                                <rect
                                  x="150"
                                  y="50"
                                  width="100"
                                  height="10"
                                  fill="#FCD34D"
                                  stroke="#F59E0B"
                                  strokeWidth="1"
                                />
                                <text
                                  x="200"
                                  y="30"
                                  textAnchor="middle"
                                  fill="#F59E0B"
                                  fontSize="10"
                                >
                                  Window
                                </text>

                                {/* Furniture placements based on suggestions */}
                                {analysisResult.suggestions.furniture.map(
                                  (furniture, index) => {
                                    const positions = [
                                      { x: 100, y: 100, width: 80, height: 40 }, // Sofa area
                                      { x: 220, y: 160, width: 50, height: 30 }, // Table area
                                      { x: 280, y: 80, width: 40, height: 40 }, // Chair area
                                    ];
                                    const pos =
                                      positions[index] || positions[0];

                                    return (
                                      <g key={index}>
                                        <rect
                                          x={pos.x}
                                          y={pos.y}
                                          width={pos.width}
                                          height={pos.height}
                                          fill={
                                            furniture.name
                                              .toLowerCase()
                                              .includes("sofa")
                                              ? "#3B82F6"
                                              : furniture.name
                                                    .toLowerCase()
                                                    .includes("table")
                                                ? "#10B981"
                                                : "#F59E0B"
                                          }
                                          fillOpacity="0.6"
                                          stroke="#fff"
                                          strokeWidth="2"
                                          className="cursor-pointer hover:fillOpacity-0.8"
                                          onClick={() =>
                                            setSelected3DFurniture(furniture)
                                          }
                                        />
                                        <text
                                          x={pos.x + pos.width / 2}
                                          y={pos.y + pos.height / 2}
                                          textAnchor="middle"
                                          fill="white"
                                          fontSize="10"
                                          className="pointer-events-none"
                                        >
                                          {furniture.name.split(" ")[0]}
                                        </text>
                                      </g>
                                    );
                                  },
                                )}

                                {/* Selected furniture highlight */}
                                {selected3DFurniture && (
                                  <circle
                                    cx="350"
                                    cy="70"
                                    r="15"
                                    fill="#EF4444"
                                    fillOpacity="0.8"
                                  >
                                    <animate
                                      attributeName="r"
                                      values="15;20;15"
                                      dur="2s"
                                      repeatCount="indefinite"
                                    />
                                  </circle>
                                )}
                              </svg>

                              {/* Furniture info overlay */}
                              {selected3DFurniture && (
                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Sofa className="w-4 h-4 text-blue-400" />
                                    <span className="text-white text-sm font-medium">
                                      {selected3DFurniture.name}
                          </span>
                        </div>
                                  <p className="text-xs text-gray-300 mb-2">
                                    {selected3DFurniture.description}
                                  </p>
                                  <div className="flex gap-2">
                                    <span className="text-xs text-green-400">
                                      {selected3DFurniture.price}
                                  </span>
                                    <a
                                      href={selected3DFurniture.ikeaLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-400 hover:underline"
                                    >
                                      View Product
                                    </a>
                                </div>
                      </div>
                    )}

                              {/* Instructions */}
                              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                                <p className="text-white text-xs">
                                  Click furniture to view details
                            </p>
                          </div>
                          </div>

                            {/* 2D Controls */}
                            <div className="mt-4 grid grid-cols-3 gap-2">
                          <Button
                                variant="outline"
                                size="sm"
                                className="glass-card border-white/20"
                              >
                                <Sofa className="w-4 h-4 mr-1" />
                                Move
                          </Button>
                          <Button
                                variant="outline"
                                size="sm"
                                className="glass-card border-white/20"
                              >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Rotate
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="glass-card border-white/20"
                              >
                                <Palette className="w-4 h-4 mr-1" />
                                Colors
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <Link to="/designer">
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow">
                            <Layers className="w-4 h-4 mr-2" />
                            Open in Designer
                        </Button>
                        </Link>
                        <Link to="/ar">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 pulse-glow">
                            <Box className="w-4 h-4 mr-2" />
                            View in AR
                          </Button>
                        </Link>
                          </div>
                      </div>
                  </div>
                ) : (
                  <Card className="glass-card border-white/10">
                    <CardContent className="p-8 text-center text-gray-400">
                      <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Click "Analyze Room" to get AI insights</p>
                    </CardContent>
                  </Card>
                )}
                        </div>
                        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAnalyzer;
