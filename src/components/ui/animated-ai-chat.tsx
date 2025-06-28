"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "~/lib/utils";
import {
    Send,
    Paperclip,
    Bot,
    User,
    Upload,
    Mic,
    Calendar,
    FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    return { textareaRef, adjustHeight };
}

// Mock AI responses based on user input
const getAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Daisy, your AI meeting assistant. I can help you transcribe audio, generate summaries, extract action items, and sync with your favorite tools. What would you like to do today?";
  }
  
  // Audio/transcription related
  if (message.includes('upload') || message.includes('audio') || message.includes('transcribe')) {
    return "I'd be happy to help you transcribe audio! You can upload audio files in MP3, WAV, or M4A format. I use OpenAI's Whisper model for 99% accurate transcription in 50+ languages. Would you like to upload a file now?";
  }
  
  // Meeting summaries
  if (message.includes('summary') || message.includes('summarize') || message.includes('meeting')) {
    return "I can generate intelligent meeting summaries that include key points, decisions made, and action items with assignees. Just upload your meeting audio and I'll analyze it for you. I can also identify deadlines and important follow-ups automatically.";
  }
  
  // Action items
  if (message.includes('action') || message.includes('task') || message.includes('todo')) {
    return "I excel at extracting action items from meetings! I can identify who's responsible for each task, when it's due, and automatically sync these to your calendar or project management tools. This helps ensure nothing falls through the cracks.";
  }
  
  // Integrations
  if (message.includes('integration') || message.includes('calendar') || message.includes('slack') || message.includes('notion')) {
    return "I integrate with all your favorite tools! I can sync action items to Google Calendar, send summaries to Slack channels, save transcripts to Notion, and connect with 1000+ apps through Zapier. Would you like help setting up an integration?";
  }
  
  // Pricing
  if (message.includes('price') || message.includes('cost') || message.includes('plan') || message.includes('free')) {
    return "I offer flexible pricing! Free plan includes 5 meetings per month with full transcription and AI summaries. Pro plan ($29/month) gives you unlimited meetings, real-time transcription, and all integrations. Enterprise plans are available for larger teams.";
  }
  
  // Features
  if (message.includes('feature') || message.includes('what can') || message.includes('help')) {
    return "Here's what I can do for you:\n\n• Transcribe audio with 99% accuracy\n• Generate smart meeting summaries\n• Extract action items and deadlines\n• Sync with your favorite tools\n• Real-time transcription during meetings\n• Multi-language support\n• Chat interface for easy access\n\nWhat would you like to try first?";
  }
  
  // Real-time
  if (message.includes('real-time') || message.includes('live') || message.includes('record')) {
    return "Yes! I can transcribe meetings in real-time as they happen. Just click the 'Record Live' button and I'll provide live captions and automatically generate summaries when the meeting ends. This is perfect for important meetings where you want to stay focused on the conversation.";
  }
  
  // Languages
  if (message.includes('language') || message.includes('spanish') || message.includes('french')) {
    return "I support transcription in over 50 languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, and many more. The AI automatically detects the language being spoken for seamless transcription.";
  }
  
  // Security/Privacy
  if (message.includes('secure') || message.includes('privacy') || message.includes('safe')) {
    return "Your privacy and security are my top priorities! I use enterprise-grade encryption, never store audio files longer than necessary, and am SOC 2 compliant. Your meeting data is processed securely and never used to train AI models.";
  }
  
  // Default responses
  const defaultResponses = [
    "That's an interesting question! I'm designed to help with meeting transcription, summaries, and action items. Could you tell me more about what you're looking to accomplish?",
    "I'd love to help you with that! As your AI meeting assistant, I specialize in transcribing audio, generating summaries, and managing action items. What specific task can I assist you with?",
    "Thanks for reaching out! I'm here to make your meetings more productive. Whether you need transcription, summaries, or help with action items, I'm ready to assist. What would you like to work on?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export function AnimatedAIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hello! I'm Daisy, your AI meeting assistant. I can help you transcribe audio, generate summaries, and extract action items from your meetings. How can I help you today?",
            sender: 'ai',
            timestamp: new Date(Date.now() - 60000)
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 44,
        maxHeight: 120,
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        adjustHeight(true);
        setIsTyping(true);

        // Simulate AI thinking time
        const thinkingTime = 1500 + Math.random() * 1000; // 1.5-2.5 seconds
        
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: getAIResponse(userMessage.content),
                sender: 'ai',
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, thinkingTime);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const quickActions = [
        { icon: Upload, label: "Upload Audio", action: () => setInputValue("I'd like to upload an audio file for transcription") },
        { icon: Mic, label: "Record Live", action: () => setInputValue("How do I record a live meeting?") },
        { icon: FileText, label: "View Summaries", action: () => setInputValue("Show me my recent meeting summaries") },
        { icon: Calendar, label: "Calendar Sync", action: () => setInputValue("Help me set up calendar integration") },
    ];

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "flex gap-3",
                                message.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            {message.sender === 'ai' && (
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-primary-foreground" />
                                </div>
                            )}
                            
                            <div className={cn(
                                "max-w-[70%] space-y-1",
                                message.sender === 'user' ? "items-end" : "items-start"
                            )}>
                                <div className={cn(
                                    "px-4 py-3 rounded-2xl",
                                    message.sender === 'user' 
                                        ? "bg-primary text-primary-foreground rounded-br-md" 
                                        : "bg-muted text-foreground rounded-bl-md"
                                )}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                </div>
                                <p className="text-xs text-muted-foreground px-2">
                                    {formatTime(message.timestamp)}
                                </p>
                            </div>

                            {message.sender === 'user' && (
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-foreground" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex gap-3 justify-start"
                        >
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-md">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-muted-foreground">Daisy is typing</span>
                                    <TypingDots />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-t border-border">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickActions.map((action, index) => (
                        <motion.button
                            key={index}
                            onClick={action.action}
                            className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm text-foreground whitespace-nowrap transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <action.icon className="w-4 h-4" />
                            {action.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border bg-card/50">
                <div className="flex items-end gap-3">
                    <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask Daisy a question..."
                            className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                            style={{ minHeight: '44px' }}
                        />
                    </div>

                    <motion.button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className={cn(
                            "p-3 rounded-xl transition-all",
                            inputValue.trim() && !isTyping
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                        whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
                        whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
                    >
                        <Send className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

function TypingDots() {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: dot * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}