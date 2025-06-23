import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Box, Plane } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move3D,
  Eye,
  Palette,
  Settings,
  Download,
  Share2,
} from "lucide-react";
import { Room3DModel, FurnitureSuggestion, ColorSuggestion } from "@/types/ai";
import * as THREE from "three";

interface RoomViewer3DProps {
  room3DModel: Room3DModel;
  furnitureSuggestions: FurnitureSuggestion[];
  colorSuggestions: ColorSuggestion[];
  onFurnitureSelect?: (furniture: FurnitureSuggestion) => void;
  onColorSelect?: (color: ColorSuggestion) => void;
}

// 3D Furniture Component
const FurnitureModel: React.FC<{
  furniture: FurnitureSuggestion;
  isSelected: boolean;
  onClick: () => void;
}> = ({ furniture, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (isSelected && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Create simple furniture representation based on category
  const getFurnitureGeometry = () => {
    switch (furniture.category) {
      case "sofa":
        return (
          <group>
            <Box
              args={[
                furniture.dimensions.width,
                furniture.dimensions.height,
                furniture.dimensions.depth,
              ]}
              position={[0, furniture.dimensions.height / 2, 0]}
            >
              <meshStandardMaterial color={furniture.color} />
            </Box>
            {/* Back rest */}
            <Box
              args={[furniture.dimensions.width, 0.6, 0.2]}
              position={[
                0,
                furniture.dimensions.height + 0.3,
                furniture.dimensions.depth / 2 - 0.1,
              ]}
            >
              <meshStandardMaterial color={furniture.color} />
            </Box>
          </group>
        );
      case "table":
        return (
          <group>
            {/* Table top */}
            <Box
              args={[
                furniture.dimensions.width,
                0.05,
                furniture.dimensions.depth,
              ]}
              position={[0, furniture.dimensions.height - 0.025, 0]}
            >
              <meshStandardMaterial color={furniture.color} />
            </Box>
            {/* Legs */}
            {[0, 1, 2, 3].map((i) => (
              <Box
                key={i}
                args={[0.05, furniture.dimensions.height - 0.05, 0.05]}
                position={[
                  (i % 2 === 0 ? -1 : 1) *
                    (furniture.dimensions.width / 2 - 0.025),
                  (furniture.dimensions.height - 0.05) / 2,
                  (i < 2 ? -1 : 1) * (furniture.dimensions.depth / 2 - 0.025),
                ]}
              >
                <meshStandardMaterial color="#8B4513" />
              </Box>
            ))}
          </group>
        );
      case "chair":
        return (
          <group>
            {/* Seat */}
            <Box
              args={[
                furniture.dimensions.width,
                0.1,
                furniture.dimensions.depth,
              ]}
              position={[0, 0.45, 0]}
            >
              <meshStandardMaterial color={furniture.color} />
            </Box>
            {/* Back */}
            <Box
              args={[furniture.dimensions.width, 0.8, 0.1]}
              position={[0, 0.85, furniture.dimensions.depth / 2 - 0.05]}
            >
              <meshStandardMaterial color={furniture.color} />
            </Box>
            {/* Legs */}
            {[0, 1, 2, 3].map((i) => (
              <Box
                key={i}
                args={[0.05, 0.9, 0.05]}
                position={[
                  (i % 2 === 0 ? -1 : 1) *
                    (furniture.dimensions.width / 2 - 0.025),
                  0.45,
                  (i < 2 ? -1 : 1) * (furniture.dimensions.depth / 2 - 0.025),
                ]}
              >
                <meshStandardMaterial color="#8B4513" />
              </Box>
            ))}
          </group>
        );
      default:
        return (
          <Box
            args={[
              furniture.dimensions.width,
              furniture.dimensions.height,
              furniture.dimensions.depth,
            ]}
          >
            <meshStandardMaterial color={furniture.color} />
          </Box>
        );
    }
  };

  return (
    <group
      ref={meshRef}
      position={[
        furniture.position3D.x,
        furniture.position3D.y,
        furniture.position3D.z,
      ]}
      rotation={[
        furniture.position3D.rotation.x,
        furniture.position3D.rotation.y,
        furniture.position3D.rotation.z,
      ]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {getFurnitureGeometry()}

      {/* Hover/Selection indicator */}
      {(hovered || isSelected) && (
        <Text
          position={[0, furniture.dimensions.height + 0.5, 0]}
          fontSize={0.2}
          color={isSelected ? "#3B82F6" : "#6B7280"}
          anchorX="center"
          anchorY="middle"
        >
          {furniture.name}
        </Text>
      )}

      {/* Selection outline */}
      {isSelected && (
        <Box
          args={[
            furniture.dimensions.width + 0.1,
            furniture.dimensions.height + 0.1,
            furniture.dimensions.depth + 0.1,
          ]}
          position={[0, furniture.dimensions.height / 2, 0]}
        >
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.3}
          />
        </Box>
      )}
    </group>
  );
};

// 3D Room Component
const Room3D: React.FC<{ room: Room3DModel }> = ({ room }) => {
  return (
    <group>
      {/* Floor */}
      <Plane
        args={[8, 6]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2.5, 0, 2]}
      >
        <meshStandardMaterial color={room.floor.color} />
      </Plane>

      {/* Walls */}
      {room.walls.map((wall, index) => (
        <Plane
          key={wall.id}
          args={[5, 3]}
          position={index === 0 ? [2.5, 1.5, 0] : [5, 1.5, 2]}
          rotation={index === 0 ? [0, 0, 0] : [0, -Math.PI / 2, 0]}
        >
          <meshStandardMaterial color={wall.color} />
        </Plane>
      ))}

      {/* Ceiling */}
      <Plane
        args={[8, 6]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[2.5, 3, 2]}
      >
        <meshStandardMaterial color={room.ceiling.color} />
      </Plane>

      {/* Windows */}
      {room.windows.map((window) => (
        <Box
          key={window.id}
          args={[window.dimensions.width, window.dimensions.height, 0.05]}
          position={[window.position.x, window.position.y, window.position.z]}
        >
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
        </Box>
      ))}

      {/* Doors */}
      {room.doors.map((door) => (
        <Box
          key={door.id}
          args={[door.dimensions.width, door.dimensions.height, 0.05]}
          position={[door.position.x, door.position.y, door.position.z]}
        >
          <meshStandardMaterial color="#8B4513" />
        </Box>
      ))}
    </group>
  );
};

// Main 3D Room Viewer Component
const RoomViewer3D: React.FC<RoomViewer3DProps> = ({
  room3DModel,
  furnitureSuggestions,
  colorSuggestions,
  onFurnitureSelect,
  onColorSelect,
}) => {
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(
    null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"furniture" | "colors">("furniture");
  const [isLoading, setIsLoading] = useState(false);

  const handleFurnitureClick = (furniture: FurnitureSuggestion) => {
    setSelectedFurniture(
      furniture.id === selectedFurniture ? null : furniture.id,
    );
    onFurnitureSelect?.(furniture);
  };

  const handleColorSelect = (color: ColorSuggestion) => {
    setSelectedColor(color.id === selectedColor ? null : color.id);
    onColorSelect?.(color);
  };

  const resetView = () => {
    setSelectedFurniture(null);
    setSelectedColor(null);
  };

  const exportScene = () => {
    // Export 3D scene functionality
    console.log("Exporting 3D scene...");
  };

  const shareScene = () => {
    // Share 3D scene functionality
    console.log("Sharing 3D scene...");
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
      {/* 3D Controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Move3D className="h-3 w-3 mr-1" />
            3D Preview
          </Badge>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "furniture" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("furniture")}
            >
              Furniture
            </Button>
            <Button
              variant={viewMode === "colors" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("colors")}
            >
              <Palette className="h-4 w-4 mr-1" />
              Colors
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportScene}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={shareScene}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 h-96">
        {/* 3D Canvas */}
        <div className="lg:col-span-3 relative">
          <Canvas
            camera={{ position: [8, 6, 8], fov: 50 }}
            style={{
              background: "linear-gradient(to bottom, #87CEEB, #E0F6FF)",
            }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />

              {/* Room */}
              <Room3D room={room3DModel} />

              {/* Furniture */}
              {viewMode === "furniture" &&
                furnitureSuggestions.map((furniture) => (
                  <FurnitureModel
                    key={furniture.id}
                    furniture={furniture}
                    isSelected={selectedFurniture === furniture.id}
                    onClick={() => handleFurnitureClick(furniture)}
                  />
                ))}

              {/* Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin mb-2">
                  <Settings className="h-8 w-8 mx-auto" />
                </div>
                <div>Loading 3D model...</div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions Panel */}
        <div className="lg:col-span-1 bg-white border-l overflow-y-auto">
          {viewMode === "furniture" ? (
            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Furniture Suggestions
              </h3>
              {furnitureSuggestions.map((furniture) => (
                <Card
                  key={furniture.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedFurniture === furniture.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleFurnitureClick(furniture)}
                >
                  <CardContent className="p-3">
                    <img
                      src={furniture.imageUrl}
                      alt={furniture.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {furniture.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {furniture.brand}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary-600">
                        ${furniture.price}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(furniture.compatibility)}% match
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Color Suggestions
              </h3>
              {colorSuggestions.map((color) => (
                <Card
                  key={color.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedColor === color.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {color.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {color.hex.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      Apply to: {color.area}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {color.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.round(color.confidence)}% confidence
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Item Info */}
      {selectedFurniture && (
        <div className="p-4 bg-blue-50 border-t">
          {(() => {
            const furniture = furnitureSuggestions.find(
              (f) => f.id === selectedFurniture,
            );
            return furniture ? (
              <div className="flex items-center space-x-4">
                <img
                  src={furniture.imageUrl}
                  alt={furniture.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {furniture.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    ${furniture.price} • {furniture.compatibility}% room match
                  </div>
                </div>
                <Button size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default RoomViewer3D;
