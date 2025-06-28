"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Separator } from "~/components/ui/separator";
import { ArrowLeft, Bot, Settings, Zap, Calendar, MessageSquare, FileText, Check, Plus, ExternalLink, User, Bell, Shield, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

const integrations: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync action items as calendar events",
    icon: <Calendar className="w-5 h-5" />,
    connected: true,
    color: "bg-blue-500"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send summaries to channels",
    icon: <MessageSquare className="w-5 h-5" />,
    connected: false,
    color: "bg-purple-500"
  },
  {
    id: "notion",
    name: "Notion",
    description: "Save transcripts as pages",
    icon: <FileText className="w-5 h-5" />,
    connected: false,
    color: "bg-gray-800"
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect to 5000+ apps",
    icon: <Zap className="w-5 h-5" />,
    connected: false,
    color: "bg-orange-500"
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"agent" | "integrations" | "account" | "billing">("agent");
  const [agentSettings, setAgentSettings] = useState({
    autoSummary: true,
    actionItemDetection: true,
    realTimeTranscription: false,
    smartNotifications: true,
    voiceResponses: false
  });

  const [connectedIntegrations, setConnectedIntegrations] = useState(
    integrations.map(integration => ({
      ...integration,
      connected: integration.id === "google-calendar"
    }))
  );

  const toggleIntegration = (id: string) => {
    setConnectedIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const tabs = [
    { id: "agent", label: "Agent", icon: <Bot className="w-4 h-4" /> },
    { id: "integrations", label: "Integrations", icon: <Zap className="w-4 h-4" /> },
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your Daisy configuration and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "agent" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Agent Configuration */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Agent Configuration</h2>
                      <p className="text-sm text-muted-foreground">Configure Daisy's behavior and capabilities</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Agent Name */}
                    <div className="space-y-2">
                      <Label htmlFor="agent-name" className="text-sm font-medium">Agent Name</Label>
                      <input
                        id="agent-name"
                        type="text"
                        defaultValue="Daisy"
                        className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <Separator />

                    {/* Core Parameters */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Core Parameters</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Auto Summary</Label>
                            <p className="text-xs text-muted-foreground">
                              Automatically generate meeting summaries
                            </p>
                          </div>
                          <Switch
                            checked={agentSettings.autoSummary}
                            onCheckedChange={(checked) =>
                              setAgentSettings(prev => ({ ...prev, autoSummary: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Action Item Detection</Label>
                            <p className="text-xs text-muted-foreground">
                              Extract action items and deadlines
                            </p>
                          </div>
                          <Switch
                            checked={agentSettings.actionItemDetection}
                            onCheckedChange={(checked) =>
                              setAgentSettings(prev => ({ ...prev, actionItemDetection: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Real-time Transcription</Label>
                            <p className="text-xs text-muted-foreground">
                              Live transcription during meetings
                            </p>
                          </div>
                          <Switch
                            checked={agentSettings.realTimeTranscription}
                            onCheckedChange={(checked) =>
                              setAgentSettings(prev => ({ ...prev, realTimeTranscription: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Smart Notifications</Label>
                            <p className="text-xs text-muted-foreground">
                              Intelligent notification timing
                            </p>
                          </div>
                          <Switch
                            checked={agentSettings.smartNotifications}
                            onCheckedChange={(checked) =>
                              setAgentSettings(prev => ({ ...prev, smartNotifications: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Behavior Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-foreground">Behavior Settings</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Response Style</Label>
                          <select className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Detailed</option>
                            <option>Concise</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Summary Length</Label>
                          <select className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            <option>Brief</option>
                            <option>Standard</option>
                            <option>Detailed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "integrations" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Integrations */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
                        <p className="text-sm text-muted-foreground">Connect Daisy with your favorite tools</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Browse All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {connectedIntegrations.map((integration) => (
                      <motion.div
                        key={integration.id}
                        className={`p-4 rounded-lg border transition-all ${
                          integration.connected
                            ? "border-primary/20 bg-primary/5"
                            : "border-border bg-background hover:bg-accent/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${integration.color} rounded-lg flex items-center justify-center text-white`}>
                              {integration.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{integration.name}</h3>
                              <p className="text-xs text-muted-foreground">{integration.description}</p>
                            </div>
                          </div>
                          
                          {integration.connected ? (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleIntegration(integration.id)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${
                            integration.connected ? "text-primary" : "text-muted-foreground"
                          }`}>
                            {integration.connected ? "Connected" : "Available"}
                          </span>
                          
                          {integration.connected && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Settings className="w-3 h-3 mr-1" />
                              Configure
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "account" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Full Name</Label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <input
                          type="email"
                          defaultValue="john~example.com"
                          className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Company</Label>
                      <input
                        type="text"
                        defaultValue="Acme Corp"
                        className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div>
                        <h3 className="font-medium text-foreground">Free Plan</h3>
                        <p className="text-sm text-muted-foreground">5 meetings per month</p>
                      </div>
                      <Button>Upgrade to Pro</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}