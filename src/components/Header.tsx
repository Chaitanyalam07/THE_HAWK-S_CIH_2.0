import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  Heart,
  Home,
  Palette,
  Camera,
  Upload,
  Lightbulb,
  Bell,
  Settings,
  LogOut,
  CreditCard,
  Folder,
  Plus,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import apiService from "@/services/api";
import { NotificationData } from "@/types/api";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    }
  }, [isAuthenticated]);

  const loadNotifications = async () => {
    try {
      const response = await apiService.getNotifications();
      if (response.success && response.data) {
        setNotifications(response.data);
        setUnreadCount(response.data.filter((n) => !n.isRead).length);
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Please try again",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const startDesign = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate("/ai-studio");
  };

  const navigationItems = [
    {
      title: "Design Tools",
      icon: Palette,
      items: [
        {
          title: "AI Design Studio",
          description: "Create stunning designs with AI assistance",
          href: "/ai-studio",
        },
        {
          title: "3D Room Planner",
          description: "Plan your space in 3D",
          href: "/3d-planner",
        },
        {
          title: "Color Palette Generator",
          description: "Find the perfect color combinations",
          href: "/colors",
        },
        {
          title: "Furniture Placement",
          description: "Optimize your room layout",
          href: "/placement",
        },
      ],
    },
    {
      title: "AI Features",
      icon: Lightbulb,
      items: [
        {
          title: "Photo Analysis",
          description: "Upload photos for instant design suggestions",
          href: "/photo-analysis",
        },
        {
          title: "Style Matcher",
          description: "Match designs to your preferences",
          href: "/style-matcher",
        },
        {
          title: "Smart Recommendations",
          description: "Get personalized design ideas",
          href: "/recommendations",
        },
        {
          title: "Trend Insights",
          description: "Discover the latest design trends",
          href: "/trends",
        },
      ],
    },
    {
      title: "Inspiration",
      icon: Home,
      items: [
        {
          title: "Room Gallery",
          description: "Browse beautiful room designs",
          href: "/gallery",
        },
        {
          title: "Style Guides",
          description: "Learn about different design styles",
          href: "/styles",
        },
        {
          title: "Designer Showcases",
          description: "Featured work from top designers",
          href: "/showcases",
        },
        {
          title: "Before & After",
          description: "See amazing transformations",
          href: "/transformations",
        },
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gray-900">
              DesignHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-primary-600">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-80 gap-3 p-4">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search designs, furniture, ideas..."
                className="pl-10 pr-4 bg-gray-50 border-gray-200 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* AI Features */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center space-x-2"
              onClick={() => navigate("/photo-analysis")}
            >
              <Camera className="h-4 w-4" />
              <span>AI Analyze</span>
            </Button>

            <Button
              size="sm"
              className="hidden lg:flex items-center space-x-2"
              onClick={startDesign}
            >
              <Upload className="h-4 w-4" />
              <span>Start Design</span>
            </Button>

            {/* User Actions */}
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex-col items-start p-4"
                        >
                          <div className="font-medium">
                            {notification.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {notification.message}
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>
                        No notifications
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Favorites */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/favorites")}
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 pl-2"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>
                          {user?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block font-medium">
                        {user?.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-sm text-gray-500 font-normal">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/projects")}>
                      <Folder className="h-4 w-4 mr-2" />
                      My Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/billing")}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setShowAuthModal(true)}>
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <h4 className="flex items-center font-medium text-gray-900">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </h4>
                      <div className="space-y-1 pl-6">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className="block text-sm text-gray-600 hover:text-primary-600 py-1"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t bg-white p-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search designs, furniture, ideas..."
                className="pl-10 pr-4"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;
