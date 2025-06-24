import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Camera,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Download,
  Share,
  Star,
  Trophy,
  Zap,
  Upload,
  Edit,
  Save,
  X,
  Crown,
  Sparkles,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Rivera",
    email: "alex@designhub.com",
    bio: "Interior design enthusiast with a passion for modern aesthetics and AI-powered creativity.",
    location: "San Francisco, CA",
    website: "alexrivera.design",
    joinDate: "March 2024",
  });

  const [tempData, setTempData] = useState(profileData);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const achievements = [
    {
      icon: Crown,
      title: "Design Master",
      description: "Created 50+ designs",
      unlocked: true,
    },
    {
      icon: Zap,
      title: "AI Expert",
      description: "Used AI tools 100+ times",
      unlocked: true,
    },
    {
      icon: Star,
      title: "Community Favorite",
      description: "Received 500+ likes",
      unlocked: true,
    },
    {
      icon: Trophy,
      title: "Featured Designer",
      description: "Design featured on homepage",
      unlocked: false,
    },
  ];

  const stats = [
    { label: "Designs Created", value: "47" },
    { label: "AI Analyses", value: "156" },
    { label: "AR Sessions", value: "23" },
    { label: "Likes Received", value: "892" },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 opacity-90"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="transparent-nav border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-cyan-400" />
                  <h1 className="text-2xl font-bold gradient-text">Profile</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="glass-card border-white/20"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="glass-card border-white/20"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                      AR
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-cyan-600 hover:bg-cyan-700"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white text-sm">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={tempData.name}
                          onChange={(e) =>
                            setTempData({ ...tempData, name: e.target.value })
                          }
                          className="glass-card border-white/20 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio" className="text-white text-sm">
                          Bio
                        </Label>
                        <textarea
                          id="bio"
                          value={tempData.bio}
                          onChange={(e) =>
                            setTempData({ ...tempData, bio: e.target.value })
                          }
                          className="w-full p-2 glass-card border border-white/20 rounded-md text-white bg-transparent mt-1 resize-none h-20"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="location"
                          className="text-white text-sm"
                        >
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={tempData.location}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              location: e.target.value,
                            })
                          }
                          className="glass-card border-white/20 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website" className="text-white text-sm">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={tempData.website}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              website: e.target.value,
                            })
                          }
                          className="glass-card border-white/20 text-white mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-2">
                        {profileData.name}
                      </h2>
                      <p className="text-gray-300 text-sm mb-4">
                        {profileData.bio}
                      </p>
                      <div className="space-y-2 text-sm text-gray-400">
                        <p>📍 {profileData.location}</p>
                        <p>🌐 {profileData.website}</p>
                        <p>📅 Joined {profileData.joinDate}</p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center gap-2 mt-4">
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro User
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Expert
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="font-semibold text-cyan-400">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-left justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Portfolio
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-left justify-start"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass-card border-white/20 text-left justify-start"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Design
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Achievements */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`glass-card p-4 rounded-lg border transition-all ${
                          achievement.unlocked
                            ? "border-yellow-500/30 bg-yellow-500/5"
                            : "border-white/10 opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              achievement.unlocked
                                ? "bg-yellow-500/20"
                                : "bg-gray-500/20"
                            }`}
                          >
                            <achievement.icon
                              className={`w-6 h-6 ${
                                achievement.unlocked
                                  ? "text-yellow-400"
                                  : "text-gray-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Email Notifications</h3>
                        <Bell className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Manage your email preferences
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        Configure
                      </Button>
                    </div>

                    <div className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Privacy & Security</h3>
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Control your privacy settings
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Billing & Plans</h3>
                        <CreditCard className="w-5 h-5 text-purple-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Manage subscription and billing
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        View Plans
                      </Button>
                    </div>

                    <div className="glass-card p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">AI Preferences</h3>
                        <Zap className="w-5 h-5 text-cyan-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Customize AI suggestions
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-white/20"
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 glass-card rounded-lg border border-white/10">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Upload className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Analyzed <strong>Modern Living Room</strong>
                        </p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 glass-card rounded-lg border border-white/10">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Received <strong>12 likes</strong> on Kitchen Design
                        </p>
                        <p className="text-xs text-gray-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 glass-card rounded-lg border border-white/10">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Unlocked <strong>AI Expert</strong> achievement
                        </p>
                        <p className="text-xs text-gray-400">3 days ago</p>
                      </div>
                    </div>
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

export default Profile;
