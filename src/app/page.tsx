import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Settings, Upload, Mic, FileText, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Daisy</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/chat">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </Link>
              <Link href="/meetings">
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Meetings
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              AI Meeting Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload audio, get transcriptions, summaries, and action items. 
              Sync with your favorite tools through a chat-first interface.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </Link>
            <Link href="/meetings">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Upload className="w-5 h-5 mr-2" />
                Upload Meeting
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Audio Transcription</h3>
            <p className="text-muted-foreground">
              Powered by OpenAI Whisper for accurate speech-to-text conversion
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Summaries</h3>
            <p className="text-muted-foreground">
              Get intelligent summaries and extract action items automatically
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Smart Integrations</h3>
            <p className="text-muted-foreground">
              Sync with Google Calendar, Slack, Notion, and more
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}