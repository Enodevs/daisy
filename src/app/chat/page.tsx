import { AnimatedAIChatNew } from "~/components/ui/animated-ai-chat-new";
import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-4 flex items-center gap-2 border-b border-border">
        <Link href="/" className="flex items-center gap-1 text-primary-foreground hover:text-primary cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <Bot className="ml-auto w-6 h-6 text-primary-foreground" />
      </div>
      {/* Chat Interface */}
      <div className="h-[calc(100vh-80px)]">
        <AnimatedAIChatNew />
      </div>
    </div>
  );
}