"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { 
  Zap, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Mail, 
  Github,
  Slack,
  Check,
  Plus,
  ExternalLink,
  Settings,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  category: string;
  color: string;
  features: string[];
}

const integrations: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Automatically sync action items as calendar events and schedule follow-up meetings",
    icon: <Calendar className="w-6 h-6" />,
    connected: true,
    category: "Calendar",
    color: "bg-blue-500",
    features: ["Auto-sync action items", "Meeting scheduling", "Calendar blocking"]
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send meeting summaries to channels and notify team members of action items",
    icon: <MessageSquare className="w-6 h-6" />,
    connected: false,
    category: "Communication",
    color: "bg-purple-500",
    features: ["Channel summaries", "Direct notifications", "Bot commands"]
  },
  {
    id: "notion",
    name: "Notion",
    description: "Save transcripts as pages and organize meeting notes in your workspace",
    icon: <FileText className="w-6 h-6" />,
    connected: false,
    category: "Documentation",
    color: "bg-gray-800",
    features: ["Page creation", "Template sync", "Database integration"]
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect Daisy to 5000+ apps with custom automation workflows",
    icon: <Zap className="w-6 h-6" />,
    connected: false,
    category: "Automation",
    color: "bg-orange-500",
    features: ["Custom workflows", "5000+ app connections", "Trigger automation"]
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Integrate with Teams meetings and share summaries in channels",
    icon: <MessageSquare className="w-6 h-6" />,
    connected: false,
    category: "Communication",
    color: "bg-blue-600",
    features: ["Teams integration", "Channel posting", "Meeting bot"]
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send meeting summaries via email and create follow-up reminders",
    icon: <Mail className="w-6 h-6" />,
    connected: true,
    category: "Email",
    color: "bg-red-500",
    features: ["Email summaries", "Follow-up reminders", "Contact sync"]
  },
];

const categories = ["All", "Calendar", "Communication", "Documentation", "Automation", "Email"];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedIntegrations, setConnectedIntegrations] = useState(integrations);

  const toggleIntegration = (id: string) => {
    setConnectedIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const filteredIntegrations = connectedIntegrations.filter(integration => {
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedCount = connectedIntegrations.filter(i => i.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect Daisy with your favorite tools and services</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Request Integration
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{connectedCount}</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{integrations.length}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">Active</p>
              <p className="text-sm text-muted-foreground">All Systems</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            className={`bg-card rounded-xl border transition-all ${
              integration.connected
                ? "border-primary/20 bg-primary/5"
                : "border-border hover:shadow-md"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center text-white`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{integration.name}</h3>
                    <span className="text-xs text-muted-foreground">{integration.category}</span>
                  </div>
                </div>
                
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>

              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-medium text-foreground">Features:</h4>
                <ul className="space-y-1">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => toggleIntegration(integration.id)}
                  >
                    Connect
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Benefits */}
      <motion.div 
        className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Why integrate with Daisy?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-2">🔄 Automatic Sync</h4>
            <p className="text-sm text-muted-foreground">
              Action items and summaries automatically sync to your tools without manual work
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">⚡ Real-time Updates</h4>
            <p className="text-sm text-muted-foreground">
              Get instant notifications and updates across all your connected platforms
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">🎯 Centralized Workflow</h4>
            <p className="text-sm text-muted-foreground">
              Keep insights in one place while using your favorite tools for execution
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}