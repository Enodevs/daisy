"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import {
    ImageIcon,
    Paperclip,
    SendIcon,
    XIcon,
    LoaderIcon,
    Command,
    Mic,
    FileText,
    Calendar,
    Zap,
    Bot,
    User,
    CheckCheck,
    Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import type { Message } from "~/types/message";

// import { processChat } from "~/lib/openai";

interface Suggestion {
    id: string;
    text: string;
    icon?: React.ReactNode;
    category: 'greeting' | 'feature' | 'help' | 'action' | 'followup';
}

// Enhanced AI response system
const getAIResponse = (userMessage: string, conversationHistory: Message[]): string => {
    const message = userMessage.toLowerCase();
    const isFirstMessage = conversationHistory.filter(m => m.sender === 'user').length === 1;

    // First-time greetings
    if (isFirstMessage && (message.includes('hello') || message.includes('hi') || message.includes('hey'))) {
        return "Hello! I'm Daisy, your AI meeting assistant. I can help you transcribe audio, generate summaries, extract action items, and sync with your favorite tools. What would you like to do today? ✨";
    }

    // Audio/transcription related
    if (message.includes('upload') || message.includes('audio') || message.includes('transcribe') || message.includes('recording')) {
        return "I'd be happy to help you transcribe audio! You can upload audio files in MP3, WAV, or M4A format. I use OpenAI's Whisper model for 99% accurate transcription in 50+ languages. Just click the attachment button below to get started! 🎵";
    }

    // Meeting summaries
    if (message.includes('summary') || message.includes('summarize') || message.includes('meeting')) {
        return "I excel at generating intelligent meeting summaries! I can identify:\n\n📋 Key discussion points\n🎯 Decisions made\n✅ Action items with assignees\n📅 Deadlines and follow-ups\n👥 Participant insights\n\nJust upload your meeting audio and I'll analyze it for you automatically!";
    }

    // Action items
    if (message.includes('action') || message.includes('task') || message.includes('todo')) {
        return "I'm great at extracting action items from meetings! I can identify:\n\n✅ Who's responsible for each task\n📅 When it's due\n📝 Task descriptions and context\n🔄 Priority levels\n\nI can also automatically sync these to your calendar or project management tools. Would you like me to set up an integration?";
    }

    // Integrations
    if (message.includes('integration') || message.includes('calendar') || message.includes('slack') || message.includes('notion') || message.includes('sync')) {
        return "I integrate seamlessly with all your favorite tools! 🔗\n\n📅 **Google Calendar** - Auto-sync action items as events\n💬 **Slack** - Send summaries to channels\n📝 **Notion** - Save transcripts as pages\n⚡ **Zapier** - Connect to 1000+ apps\n📧 **Email** - Send automated reports\n\nWhich integration would you like to set up first?";
    }

    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('plan') || message.includes('upgrade')) {
        return "Here are my flexible pricing options! 💰\n\n🆓 **Free Plan** - 5 meetings/month, basic features\n⭐ **Pro Plan** ($29/month) - Unlimited meetings, all integrations, real-time transcription\n🏢 **Enterprise** - Custom pricing, advanced security, dedicated support\n\nAll plans include AI summaries and action item extraction. Want to start with a free trial?";
    }

    // Features overview
    if (message.includes('feature') || message.includes('what can') || message.includes('help') || message.includes('capabilities')) {
        return "Here's what I can do for you! ✨\n\n🎵 **AI Transcription** - 99% accuracy, 50+ languages\n📋 **Smart Summaries** - Key points, decisions, insights\n✅ **Action Items** - Auto-extract with assignees & deadlines\n🔗 **Integrations** - Sync with your favorite tools\n⚡ **Real-time** - Live transcription during meetings\n💬 **Chat Interface** - Easy access to all features\n\nWhat would you like to try first?";
    }

    // Default responses with variety
    const defaultResponses = [
        "That's an interesting question! I'm designed to help with meeting transcription, summaries, and action items. Could you tell me more about what you're looking to accomplish? 🤔",
        "I'd love to help you with that! As your AI meeting assistant, I specialize in transcribing audio, generating summaries, and managing action items. What specific task can I assist you with? ✨",
        "Thanks for reaching out! I'm here to make your meetings more productive. Whether you need transcription, summaries, or help with action items, I'm ready to assist. What would you like to work on? 🎯",
        "Great question! I'm Daisy, your AI meeting assistant. I can help transform your meeting recordings into actionable insights. What type of meeting support do you need today? 📋",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Intelligent suggestion system
const baseSuggestions: Suggestion[] = [
    { id: "1", text: "Hi Daisy! 👋", icon: <Bot className="w-4 h-4" />, category: "greeting" },
    { id: "2", text: "Upload meeting audio", icon: <Mic className="w-4 h-4" />, category: "action" },
    { id: "3", text: "How does transcription work?", icon: <FileText className="w-4 h-4" />, category: "feature" },
    { id: "4", text: "Show me integrations", icon: <Zap className="w-4 h-4" />, category: "feature" },
    { id: "5", text: "What are your pricing plans?", icon: <Calendar className="w-4 h-4" />, category: "help" },
];

const contextualSuggestions: Record<string, Suggestion[]> = {
    greeting: [
        { id: "g1", text: "I need help with a meeting recording", category: "action" },
        { id: "g2", text: "Tell me about your features", category: "feature" },
        { id: "g3", text: "How accurate is your transcription?", category: "help" },
    ],
    transcription: [
        { id: "t1", text: "Generate a summary please", category: "action" },
        { id: "t2", text: "Extract action items", category: "action" },
        { id: "t3", text: "What languages do you support?", category: "help" },
    ],
    integration: [
        { id: "i1", text: "Set up Google Calendar sync", category: "action" },
        { id: "i2", text: "Connect to Slack", category: "action" },
        { id: "i3", text: "Show me Notion integration", category: "feature" },
    ],
    summary: [
        { id: "s1", text: "Sync action items to calendar", category: "action" },
        { id: "s2", text: "Send summary to team", category: "action" },
        { id: "s3", text: "Export as PDF", category: "action" },
    ],
    followup: [
        { id: "f1", text: "That's perfect, thank you! ✨", category: "followup" },
        { id: "f2", text: "Can you help with another meeting?", category: "followup" },
        { id: "f3", text: "How do I upgrade my plan?", category: "help" },
    ]
};

// Get contextual suggestions based on conversation
const getContextualSuggestions = (messages: Message[], currentInput: string): Suggestion[] => {
    const lastAIMessage = messages.filter(m => m.sender === 'ai').pop();
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();

    // If user is typing, filter suggestions based on input
    if (currentInput.length > 0) {
        const allSuggestions = [
            ...baseSuggestions,
            ...Object.values(contextualSuggestions).flat()
        ];

        return allSuggestions
            .filter(s => s.text.toLowerCase().includes(currentInput.toLowerCase()))
            .slice(0, 3);
    }

    // No messages yet - show greeting suggestions
    if (messages.length === 0) {
        return baseSuggestions.slice(0, 4);
    }

    // Context-based suggestions
    if (lastAIMessage?.content.includes('transcrib')) {
        return contextualSuggestions.transcription;
    }

    if (lastAIMessage?.content.includes('integrat') || lastAIMessage?.content.includes('sync')) {
        return contextualSuggestions.integration;
    }

    if (lastAIMessage?.content.includes('summary') || lastAIMessage?.content.includes('action item')) {
        return contextualSuggestions.summary;
    }

    if (lastAIMessage?.content.includes('welcome') || lastAIMessage?.content.includes('thank')) {
        return contextualSuggestions.followup;
    }

    if (lastUserMessage?.content.toLowerCase().includes('hi') || lastUserMessage?.content.toLowerCase().includes('hello')) {
        return contextualSuggestions.greeting;
    }

    // Default suggestions
    return baseSuggestions.slice(1, 5);
};

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

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface CommandSuggestion {
    icon: React.ReactNode;
    label: string;
    description: string;
    prefix: string;
}

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerClassName?: string;
    showRing?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, containerClassName, showRing = true, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);

        return (
            <div className={cn(
                "relative",
                containerClassName
            )}>
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                        "transition-all duration-200 ease-in-out",
                        "placeholder:text-muted-foreground",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
                        className
                    )}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {showRing && isFocused && (
                    <motion.span
                        className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-primary/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {props.onChange && (
                    <div
                        className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-primary rounded-full"
                        style={{
                            animation: 'none',
                        }}
                        id="textarea-ripple"
                    />
                )}
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export function AnimatedAIChatNew() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [recentCommand, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const commandSuggestions: CommandSuggestion[] = [
        {
            icon: <Mic className="w-4 h-4" />,
            label: "Upload Audio",
            description: "Upload meeting recording for transcription",
            prefix: "/upload"
        },
        {
            icon: <FileText className="w-4 h-4" />,
            label: "Transcribe",
            description: "Start transcription process",
            prefix: "/transcribe"
        },
        {
            icon: <Calendar className="w-4 h-4" />,
            label: "Schedule",
            description: "Schedule a meeting",
            prefix: "/schedule"
        },
        {
            icon: <Zap className="w-4 h-4" />,
            label: "Integrations",
            description: "View available integrations",
            prefix: "/integrations"
        },
    ];

    // Update suggestions when messages or input changes
    useEffect(() => {
        const newSuggestions = getContextualSuggestions(messages, value);
        setSuggestions(newSuggestions);
    }, [messages, value]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (value.startsWith('/') && !value.includes(' ')) {
            setShowCommandPalette(true);

            const matchingSuggestionIndex = commandSuggestions.findIndex(
                (cmd) => cmd.prefix.startsWith(value)
            );

            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex);
            } else {
                setActiveSuggestion(-1);
            }
        } else {
            setShowCommandPalette(false);
        }
    }, [value]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const commandButton = document.querySelector('[data-command-button]');

            if (commandPaletteRef.current &&
                !commandPaletteRef.current.contains(target) &&
                !commandButton?.contains(target)) {
                setShowCommandPalette(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestion(prev =>
                    prev < commandSuggestions.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestion(prev =>
                    prev > 0 ? prev - 1 : commandSuggestions.length - 1
                );
            } else if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion];
                    setValue(selectedCommand.prefix + ' ');
                    setShowCommandPalette(false);

                    setRecentCommand(selectedCommand.label);
                    setTimeout(() => setRecentCommand(null), 3500);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setShowCommandPalette(false);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSendMessage();
            }
        }
    };

    const handleSendMessage = () => {
        if (value.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                content: value.trim(),
                sender: 'user',
                timestamp: new Date(),
                isRead: true
            };

            setMessages(prev => [...prev, userMessage]);
            setValue("");
            adjustHeight(true);
            setIsTyping(true);

            // Simulate AI thinking time
            const thinkingTime = 1500 + Math.random() * 1000; // 1.5-2.5 seconds

            setTimeout(() => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: getAIResponse(userMessage.content, [...messages, userMessage]),
                    sender: 'ai',
                    timestamp: new Date(),
                    isRead: false
                };

                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);
            }, thinkingTime);
        }
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setValue(suggestion.text);
        // Auto-send if it's a simple greeting or action
        if (suggestion.category === 'greeting' || suggestion.category === 'action') {
            setTimeout(() => {
                handleSendMessage();
            }, 100);
        }
    };

    const handleAttachFile = () => {
        const mockFileName = `meeting-recording-${Math.floor(Math.random() * 1000)}.mp3`;
        setAttachments(prev => [...prev, mockFileName]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);

        setRecentCommand(selectedCommand.label);
        setTimeout(() => setRecentCommand(null), 2000);
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    // Show chat interface if there are messages or user is typing
    const showChatInterface = messages.length > 0 || isTyping;

    if (showChatInterface) {
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
                                        "px-4 py-3 rounded-2xl relative",
                                        message.sender === 'user'
                                            ? "bg-primary text-primary-foreground rounded-br-md"
                                            : "bg-muted text-foreground rounded-bl-md"
                                    )}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 px-2">
                                        <p className="text-xs text-muted-foreground">
                                            {formatDate(message.timestamp)}
                                        </p>
                                        {message.sender === 'user' && (
                                            <div className="flex items-center">
                                                {message.isRead ? (
                                                    <CheckCheck className="w-3 h-3 text-primary" />
                                                ) : (
                                                    <Check className="w-3 h-3 text-muted-foreground" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {message.sender === 'user' && (
                                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 text-foreground" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

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
                    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
                            <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
                        </div>
                        <div className="w-full max-w-2xl mx-auto relative">
                            <motion.div
                                className="relative z-10 space-y-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <div className="text-center space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="inline-block"
                                    >
                                        <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground pb-1">
                                            How can I help today?
                                        </h1>
                                        <motion.div
                                            className="h-px bg-gradient-to-r from-transparent via-border to-transparent"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "100%", opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                        />
                                    </motion.div>
                                    <motion.p
                                        className="text-sm text-muted-foreground"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        Type a command or ask a question about your meetings
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="relative backdrop-blur-2xl bg-card/50 rounded-2xl border border-border shadow-2xl"
                                    initial={{ scale: 0.98 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <AnimatePresence>
                                        {showCommandPalette && (
                                            <motion.div
                                                ref={commandPaletteRef}
                                                className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-popover/95 rounded-lg z-50 shadow-lg border border-border overflow-hidden"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <div className="py-1">
                                                    {commandSuggestions.map((suggestion, index) => (
                                                        <motion.div
                                                            key={suggestion.prefix}
                                                            className={cn(
                                                                "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                                activeSuggestion === index
                                                                    ? "bg-accent text-accent-foreground"
                                                                    : "text-muted-foreground hover:bg-accent/50"
                                                            )}
                                                            onClick={() => selectCommandSuggestion(index)}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: index * 0.03 }}
                                                        >
                                                            <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                                                                {suggestion.icon}
                                                            </div>
                                                            <div className="font-medium">{suggestion.label}</div>
                                                            <div className="text-muted-foreground text-xs ml-1">
                                                                {suggestion.prefix}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="p-4">
                                        <Textarea
                                            ref={textareaRef}
                                            value={value}
                                            onChange={(e) => {
                                                setValue(e.target.value);
                                                adjustHeight();
                                            }}
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => setInputFocused(true)}
                                            onBlur={() => setInputFocused(false)}
                                            placeholder="Ask Daisy a question..."
                                            containerClassName="w-full"
                                            className={cn(
                                                "w-full px-4 py-3",
                                                "resize-none",
                                                "bg-transparent",
                                                "border-none",
                                                "text-foreground text-sm",
                                                "focus:outline-none",
                                                "placeholder:text-muted-foreground",
                                                "min-h-[60px]"
                                            )}
                                            style={{
                                                overflow: "hidden",
                                            }}
                                            showRing={false}
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {attachments.length > 0 && (
                                            <motion.div
                                                className="px-4 pb-3 flex gap-2 flex-wrap"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                {attachments.map((file, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="flex items-center gap-2 text-xs bg-secondary py-1.5 px-3 rounded-lg text-secondary-foreground"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                    >
                                                        <Mic className="w-3 h-3" />
                                                        <span>{file}</span>
                                                        <button
                                                            onClick={() => removeAttachment(index)}
                                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                                        >
                                                            <XIcon className="w-3 h-3" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="p-4 border-t border-border flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <motion.button
                                                type="button"
                                                onClick={handleAttachFile}
                                                whileTap={{ scale: 0.94 }}
                                                className="p-2 hover:text-foreground rounded-lg transition-colors relative group cursor-pointer bg-accent"
                                            >
                                                <Paperclip className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                data-command-button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowCommandPalette(prev => !prev);
                                                }}
                                                whileTap={{ scale: 0.94 }}
                                                className={cn(
                                                    "p-2 hover:text-foreground rounded-lg transition-colors relative group cursor-pointer bg-accent",
                                                    showCommandPalette && "bg-accent text-accent-foreground"
                                                )}
                                            >
                                                <Command className="w-4 h-4" />
                                            </motion.button>
                                        </div>

                                        <motion.button
                                            type="button"
                                            onClick={handleSendMessage}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isTyping || !value.trim()}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                "flex items-center gap-2",
                                                value.trim()
                                                    ? "bg-primary text-primary-foreground shadow-lg"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {isTyping ? (
                                                <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                            ) : (
                                                <SendIcon className="w-4 h-4" />
                                            )}
                                            <span>Send</span>
                                        </motion.button>
                                    </div>
                                </motion.div>

                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {commandSuggestions.map((suggestion, index) => (
                                        <motion.button
                                            key={suggestion.prefix}
                                            onClick={() => selectCommandSuggestion(index)}
                                            className="flex items-center gap-2 px-3 py-2 bg-card/50 hover:bg-card rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all relative group border border-border/50 hover:border-border"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {suggestion.icon}
                                            <span>{suggestion.label}</span>
                                            <motion.div
                                                className="absolute inset-0 border border-primary/20 rounded-lg opacity-0 group-hover:opacity-100"
                                                initial={false}
                                                animate={{
                                                    opacity: [0, 1],
                                                    scale: [0.98, 1],
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {inputFocused && (
                            <motion.div
                                className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-primary via-primary/50 to-primary blur-[96px]"
                                animate={{
                                    x: mousePosition.x - 400,
                                    y: mousePosition.y - 400,
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 150,
                                    mass: 0.5,
                                }}
                            />
                        )}
                    </div>
                </div>
                {/* Suggestions Area */}
                <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="px-6 pb-2"
                        >
                            <div className="flex gap-2 flex-wrap">
                                {suggestions.map((suggestion) => (
                                    <motion.button
                                        key={suggestion.id}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-full text-sm text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-border"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {suggestion.icon}
                                        <span>{suggestion.text}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-6 border-t border-border">
                    <div className="relative backdrop-blur-2xl bg-card/50 rounded-2xl border border-border shadow-2xl">
                        <div className="p-4">
                            <Textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                placeholder="Ask Daisy a question..."
                                containerClassName="w-full"
                                className={cn(
                                    "w-full px-4 py-3",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-foreground text-sm",
                                    "focus:outline-none",
                                    "placeholder:text-muted-foreground",
                                    "min-h-[60px]"
                                )}
                                style={{
                                    overflow: "hidden",
                                }}
                                showRing={false}
                                disabled={isTyping}
                            />
                        </div>

                        <div className="p-4 border-t border-border flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <motion.button
                                    type="button"
                                    onClick={handleAttachFile}
                                    whileTap={{ scale: 0.94 }}
                                    className="p-2 hover:text-foreground rounded-lg transition-colors relative group cursor-pointer bg-accent"
                                    disabled={isTyping}
                                >
                                    <Paperclip className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    type="button"
                                    data-command-button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCommandPalette(prev => !prev);
                                    }}
                                    whileTap={{ scale: 0.94 }}
                                    className={cn(
                                        "p-2 hover:text-foreground rounded-lg transition-colors relative group cursor-pointer bg-accent",
                                        showCommandPalette && "bg-accent text-accent-foreground"
                                    )}
                                    disabled={isTyping}
                                >
                                    <Command className="w-4 h-4" />
                                </motion.button>
                            </div>

                            <motion.button
                                type="button"
                                onClick={handleSendMessage}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isTyping || !value.trim()}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    "flex items-center gap-2",
                                    value.trim()
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                {isTyping ? (
                                    <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                ) : (
                                    <SendIcon className="w-4 h-4" />
                                )}
                                <span>Send</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-accent rounded-full border border-border text-muted-foreground hover:text-foreground transition-all relative overflow-hidden group"
        >
            <div className="relative z-10 flex items-center gap-2">
                <Paperclip />
                <span className="text-xs relative z-10">File</span>
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/50"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}

const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`;

function TypingDots() {
    return (
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-ripple" />
            <div className="w-2 h-2 rounded-full bg-primary animate-ripple animation-delay-200" />
            <div className="w-2 h-2 rounded-full bg-primary animate-ripple animation-delay-400" />
        </div>
    )
}

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = rippleKeyframes;
    document.head.appendChild(style);
}