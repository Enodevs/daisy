import { AnimatedAIChat } from "~/components/ui/animated-ai-chat";
import { AnimatedAIChatNew } from "~/components/ui/animated-ai-chat-new";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Chat with Daisy</h1>
                  <p className="text-sm text-muted-foreground">AI Meeting Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-[calc(100vh-80px)]">
        <AnimatedAIChatNew />
      </div>
    </div>
  );
}