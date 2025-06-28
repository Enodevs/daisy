"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Settings, MessageSquare, Bot, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

interface ChatEntry {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

const recentChats: ChatEntry[] = [
  {
    id: "1",
    title: "Meeting Analysis",
    preview: "Analyzed team standup from yesterday...",
    timestamp: "2 hours ago"
  },
  {
    id: "2", 
    title: "Action Items Review",
    preview: "Found 5 pending action items...",
    timestamp: "1 day ago"
  }
];

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="w-80 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Daisy</span>
        </div>
        
        <Button className="w-full justify-start gap-2" size="sm">
          <Plus className="w-4 h-4" />
          Add Chat
        </Button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 p-4 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Chats</h3>
        
        {recentChats.map((chat) => (
          <motion.div
            key={chat.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              activeChat === chat.id 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent/50"
            }`}
            onClick={() => setActiveChat(chat.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {chat.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {chat.preview}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {chat.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-2 bg-secondary rounded-lg">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}