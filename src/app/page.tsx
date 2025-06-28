"use client";

import { Sidebar } from "~/components/sidebar";
import { AgentConfig } from "~/components/agent-config";
import { AnimatedAIChat } from "~/components/ui/animated-ai-chat";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { MessageSquare, Settings } from "lucide-react";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"chat" | "config">("chat");

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Daisy AI Assistant</h1>
            
            <div className="flex items-center gap-2">
              <Button
                variant={activeView === "chat" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("chat")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button
                variant={activeView === "config" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("config")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {activeView === "chat" ? (
            <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20">
              <AnimatedAIChat />
            </div>
          ) : (
            <div className="h-full overflow-auto">
              <AgentConfig />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}