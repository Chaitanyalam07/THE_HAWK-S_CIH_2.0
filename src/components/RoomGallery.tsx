import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Heart,
  Share2,
  Download,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import apiService from "@/services/api";
import { Design, SearchFilters } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import AuthModal from "./AuthModal";

const filterOptions = [
  { value: "all", label: "All Rooms" },
  { value: "living_room", label: "Living Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "office", label: "Office" },
  { value: "dining_room", label: "Dining Room" },
];

const styleOptions = [
  { value: "all", label: "All Styles" },
  { value: "modern", label: "Modern" },
  { value: "contemporary", label: "Contemporary" },
  { value: "scandinavian", label: "Scandinavian" },
  { value: "industrial", label: "Industrial" },
  { value: "bohemian", label: "Bohemian" },
  { value: "traditional", label: "Traditional" },
  { value: "minimalist", label: "Minimalist" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" },
  { value: "likes", label: "Most Liked" },
];

const RoomGallery: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: "newest",
    roomType: "all",
    style: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [likedDesigns, setLikedDesigns] = useState<Set<string>>(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Load designs on component mount and when filters change
  useEffect(() => {
    loadDesigns();
  }, [filters, currentPage, searchQuery]);

  const loadDesigns = async () => {
    setLoading(true);
    try {
      const searchFilters: SearchFilters = {
        ...filters,
        page: currentPage,
        limit: 12,
      };

      let response;
      if (searchQuery.trim()) {
        response = await apiService.searchDesigns(searchQuery, searchFilters);
      } else {
        response = await apiService.getDesigns(searchFilters);
      }

      if (response.success && response.data) {
        setDesigns(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
        }

        // Load liked status for authenticated users
        if (isAuthenticated) {
          const liked = new Set<string>();
          response.data.forEach((design) => {
            if (design.isLiked) {
              liked.add(design.id);
            }
          });
          setLikedDesigns(liked);
        }
      } else {
        // Fallback to demo data
        setDesigns([
          {
            id: "1",
            title: "Modern Living Room",
            description: "A beautiful modern living space with clean lines",
            imageUrl:
              "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
            userId: "user1",
            userName: "Sarah Johnson",
            userAvatar: "",
            style: "Contemporary",
            roomType: "living_room",
            tags: ["Modern", "Minimalist", "Neutral"],
            likes: 432,
            views: 2847,
            isPublic: true,
            isLiked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            assets: [],
          },
          {
            id: "2",
            title: "Elegant Kitchen Design",
            description: "A stunning kitchen with premium finishes",
            imageUrl:
              "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
            userId: "user2",
            userName: "Mike Chen",
            userAvatar: "",
            style: "Modern",
            roomType: "kitchen",
            tags: ["Kitchen", "White", "Elegant"],
            likes: 387,
            views: 1923,
            isPublic: true,
            isLiked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            assets: [],
          },
          {
            id: "3",
            title: "Cozy Bedroom Retreat",
            description: "A peaceful bedroom sanctuary",
            imageUrl:
              "https://images.pexels.com/photos/30217028/pexels-photo-30217028.jpeg",
            userId: "user3",
            userName: "Emma Wilson",
            userAvatar: "",
            style: "Scandinavian",
            roomType: "bedroom",
            tags: ["Bedroom", "Cozy", "Natural"],
            likes: 521,
            views: 3156,
            isPublic: true,
            isLiked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            assets: [],
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to load designs:", error);
      toast({
        variant: "destructive",
        title: "Failed to load designs",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (designId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await apiService.likeDesign(designId);
      if (response.success && response.data) {
        const newLikedDesigns = new Set(likedDesigns);
        if (response.data.liked) {
          newLikedDesigns.add(designId);
        } else {
          newLikedDesigns.delete(designId);
        }
        setLikedDesigns(newLikedDesigns);

        // Update design in the list
        setDesigns((prevDesigns) =>
          prevDesigns.map((design) =>
            design.id === designId
              ? {
                  ...design,
                  likes: response.data!.likesCount,
                  isLiked: response.data!.liked,
                }
              : design,
          ),
        );

        toast({
          title: response.data.liked
            ? "Added to favorites"
            : "Removed from favorites",
          description: response.data.liked
            ? "Design saved to your favorites"
            : "Design removed from favorites",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to like design",
        description: "Please try again",
      });
    }
  };

  const handleShare = async (design: Design, platform: string = "copy") => {
    try {
      if (platform === "copy") {
        const shareUrl = `${window.location.origin}/designs/${design.id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Design link copied to clipboard",
        });
      } else {
        const response = await apiService.shareDesign(design.id, platform);
        if (response.success && response.data) {
          window.open(response.data.shareUrl, "_blank");
        }
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast({
        variant: "destructive",
        title: "Share failed",
        description: "Unable to share design",
      });
    }
  };

  const handleDownload = async (design: Design) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      // Create a download link
      const link = document.createElement("a");
      link.href = design.imageUrl;
      link.download = `${design.title.replace(/\s+/g, "_")}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started",
        description: "Design image is downloading",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Unable to download image",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadDesigns();
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      sortBy: "newest",
      roomType: "all",
      style: "all",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day",
    );
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Design Inspiration Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of beautiful room designs created by our
              community of talented designers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search designs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Filter by:
                  </span>
                </div>

                <Select
                  value={filters.roomType || "all"}
                  onValueChange={(value) => updateFilter("roomType", value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.style || "all"}
                  onValueChange={(value) => updateFilter("style", value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy || "newest"}
                  onValueChange={(value) =>
                    updateFilter("sortBy", value as any)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              <span className="ml-2 text-gray-600">Loading designs...</span>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && (
            <div
              className={cn(
                "grid gap-6 mb-12",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1",
              )}
            >
              {designs.map((design, index) => (
                <Card
                  key={design.id}
                  className={cn(
                    "group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                    "animate-scale-in",
                    viewMode === "list" && "flex flex-row",
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === "list"
                        ? "w-80 flex-shrink-0"
                        : "aspect-[4/3]",
                    )}
                  >
                    <img
                      src={design.imageUrl}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          onClick={() =>
                            window.open(`/designs/${design.id}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          onClick={() => handleLike(design.id)}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              likedDesigns.has(design.id)
                                ? "fill-red-500 text-red-500"
                                : "",
                            )}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          onClick={() => handleShare(design)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white"
                          onClick={() => handleDownload(design)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Featured badge */}
                    {design.likes > 500 && (
                      <Badge className="absolute top-3 left-3 bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent
                    className={cn(
                      "p-4",
                      viewMode === "list" &&
                        "flex-1 flex flex-col justify-between",
                    )}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                          {design.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="ml-2 flex-shrink-0"
                        >
                          {design.style}
                        </Badge>
                      </div>

                      {design.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {design.description}
                        </p>
                      )}

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {design.userName.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-600">
                          by {design.userName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(design.createdAt)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {design.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {design.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{design.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(design.id)}
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              likedDesigns.has(design.id)
                                ? "fill-red-500 text-red-500"
                                : "",
                            )}
                          />
                          <span>{design.likes}</span>
                        </button>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{design.views}</span>
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-600 hover:text-primary-700"
                        onClick={() =>
                          window.open(`/designs/${design.id}`, "_blank")
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && designs.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No designs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}

          {/* Pagination */}
          {!loading && designs.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <Button
                      variant={
                        currentPage === totalPages ? "default" : "outline"
                      }
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default RoomGallery;
