import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Home,
  Plus,
  Eye,
  BarChart3,
  Camera,
  Upload,
  Box,
  Ruler,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Users,
  Zap,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Sparkles,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  lastModified: string;
  status: "completed" | "in-progress" | "draft";
  roomType: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Modern Living Room",
    type: "Room Analysis",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
    lastModified: "2 hours ago",
    status: "completed",
    roomType: "Living Room",
  },
  {
    id: "2",
    name: "Master Bedroom Design",
    type: "3D Design",
    thumbnail:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80",
    lastModified: "1 day ago",
    status: "in-progress",
    roomType: "Bedroom",
  },
  {
    id: "3",
    name: "Kitchen Renovation",
    type: "AR Preview",
    thumbnail:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=300&q=80",
    lastModified: "3 days ago",
    status: "draft",
    roomType: "Kitchen",
  },
];

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
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
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center pulse-glow">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">
                    DesignHub
                  </span>
                </Link>
                <nav className="hidden lg:flex items-center gap-6">
                  <Link
                    to="/dashboard"
                    className="text-blue-400 font-medium flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/analyzer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Analyzer
                  </Link>
                  <Link
                    to="/camera"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Camera
                  </Link>
                  <Link
                    to="/ar"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    AR/VR
                  </Link>
                  <Link
                    to="/designer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Designer
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
                <Link to="/profile">
                  <Button
                    variant="outline"
                    className="border-blue-500/30 text-white hover:bg-blue-500/20 glass-card"
                  >
                    Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Designer</span>! 👋
            </h1>
            <p className="text-gray-300">
              Continue creating amazing spaces with AI-powered design tools
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Projects</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+3 this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">AI Analyses</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+12 this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">AR Views</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Box className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+8 this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Shared Designs</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+2 this week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <Link to="/analyzer">
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-blue-500/30 w-full"
                      >
                        <Upload className="w-6 h-6 text-blue-400" />
                        <span className="text-sm">Analyze Room</span>
                      </Button>
                    </Link>
                    <Link to="/camera">
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-green-500/30 w-full"
                      >
                        <Camera className="w-6 h-6 text-green-400" />
                        <span className="text-sm">Live Camera</span>
                      </Button>
                    </Link>
                    <Link to="/ar">
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-purple-500/30 w-full"
                      >
                        <Box className="w-6 h-6 text-purple-400" />
                        <span className="text-sm">AR Viewer</span>
                      </Button>
                    </Link>
                    <Link to="/designer">
                      <Button
                        variant="outline"
                        className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-orange-500/30 w-full"
                      >
                        <Ruler className="w-6 h-6 text-orange-400" />
                        <span className="text-sm">Room Designer</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Projects List */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Projects</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search projects..."
                          className="pl-10 pr-4 py-2 bg-transparent border border-white/20 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 w-48"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects.map((project) => (
                    <div
                      key={project.id}
                      className="glass-card p-4 rounded-lg border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{project.name}</h3>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {project.type}
                            </Badge>
                            <Badge
                              className={`text-xs ${getStatusColor(project.status)}`}
                            >
                              {project.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Home className="w-3 h-3" />
                              {project.roomType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {project.lastModified}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-card border-white/20"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-card border-white/20"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 border-dashed h-16 hover:border-blue-500/30"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    Create New Project
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Upload className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Analyzed <strong>Modern Living Room</strong>
                      </p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Box className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Viewed in AR: <strong>Kitchen Renovation</strong>
                      </p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Camera className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Live camera session for <strong>Bedroom</strong>
                      </p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      AI Credits Used
                    </span>
                    <span className="font-semibold">47 / 100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-[47%]"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Storage Used</span>
                    <span className="font-semibold">2.3 GB / 5 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full w-[46%]"></div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-300">
                  <div className="p-3 glass-card rounded-lg border border-white/10">
                    <p className="font-medium text-white mb-1">
                      Better AI Results
                    </p>
                    <p>
                      Use well-lit photos with minimal clutter for more accurate
                      analysis.
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg border border-white/10">
                    <p className="font-medium text-white mb-1">AR Placement</p>
                    <p>
                      Move slowly and ensure good lighting for stable AR
                      tracking.
                    </p>
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

export default Dashboard;
