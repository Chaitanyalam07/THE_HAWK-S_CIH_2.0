import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "AI Design Studio", href: "/ai-studio" },
        { name: "3D Room Planner", href: "/3d-planner" },
        { name: "Photo Analysis", href: "/photo-analysis" },
        { name: "Style Matcher", href: "/style-matcher" },
        { name: "Collaboration Tools", href: "/collaboration" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Design Gallery", href: "/gallery" },
        { name: "Style Guides", href: "/styles" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Licensing", href: "/licensing" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Stay inspired with design trends
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Get weekly design inspiration, AI tips, and exclusive features
              delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary-500"
              />
              <Button className="bg-primary-500 hover:bg-primary-600 px-6">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time. Read our{" "}
              <Link
                to="/privacy"
                className="text-primary-400 hover:text-primary-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">DesignHub</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              The most advanced AI-powered interior design platform. Transform
              your space with intelligent suggestions, 3D visualization, and
              collaborative tools.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hello@designhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 DesignHub. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
