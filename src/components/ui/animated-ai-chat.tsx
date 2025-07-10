"use client";

import { useEffect, useRef, useCallback, useTransition } from "react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    SendIcon,
    XIcon,
    LoaderIcon,
    Sparkles,
    Command,
    Bot,
    User,
    Mic,
    FileText,
    Zap,
    Calendar,
    CheckCheck,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import ChatInputBox from "../ChatInputBox";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    hasAttachment?: boolean;
    attachmentType?: 'audio' | 'image' | 'document';
    attachmentName?: string;
    isRead?: boolean;
    emoji?: string;
}

interface Suggestion {
    id: string;
    text: string;
    icon?: React.ReactNode;
    category: 'greeting' | 'feature' | 'help' | 'action' | 'followup';
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
                        className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {props.onChange && (
                    <div
                        className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-violet-500 rounded-full"
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

// Mock conversation data
const mockConversations: Message[] = [];

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

    // Real-time features
    if (message.includes('real-time') || message.includes('live') || message.includes('record')) {
        return "Yes! I can transcribe meetings in real-time as they happen! 🔴\n\n⚡ Live captions during meetings\n📝 Automatic note-taking\n🎯 Real-time action item detection\n📊 Live participant insights\n💾 Auto-save transcripts\n\nJust click 'Record Live' and I'll provide live captions while automatically generating summaries when the meeting ends. Perfect for staying focused on the conversation!";
    }

    // Languages
    if (message.includes('language') || message.includes('spanish') || message.includes('french') || message.includes('multilingual')) {
        return "I support transcription in 50+ languages! 🌍\n\n🇺🇸 English • 🇪🇸 Spanish • 🇫🇷 French • 🇩🇪 German\n🇮🇹 Italian • 🇵🇹 Portuguese • 🇳🇱 Dutch • 🇷🇺 Russian\n🇨🇳 Chinese • 🇯🇵 Japanese • 🇰🇷 Korean • And many more!\n\nThe AI automatically detects the language being spoken for seamless transcription. Mixed-language meetings are supported too!";
    }

    // Security/Privacy
    if (message.includes('secure') || message.includes('privacy') || message.includes('safe') || message.includes('data')) {
        return "Your privacy and security are my top priorities! 🔒\n\n🛡️ Enterprise-grade encryption\n🗑️ Audio files deleted after processing\n✅ SOC 2 compliant\n🚫 Never used for AI training\n🔐 GDPR compliant\n🏢 On-premise options available\n\nYour meeting data stays private and secure. I only process what's needed to provide transcription and summaries.";
    }

    // Positive responses
    if (message.includes('thank') || message.includes('perfect') || message.includes('great') || message.includes('awesome')) {
        return "You're very welcome! I'm here to make your meetings more productive. 😊\n\nIs there anything else I can help you with today? I can:\n\n🎵 Process another meeting recording\n🔗 Set up additional integrations\n📊 Show you advanced features\n💡 Answer any other questions\n\nJust let me know how I can assist!";
    }

    // Setup/getting started
    if (message.includes('setup') || message.includes('start') || message.includes('begin') || message.includes('get started')) {
        return "Let's get you started! Here's the quickest way to begin: 🚀\n\n1️⃣ **Upload Audio** - Click the attachment button below\n2️⃣ **Choose Format** - MP3, WAV, M4A all work great\n3️⃣ **Wait for Magic** - I'll transcribe and analyze automatically\n4️⃣ **Review Results** - Get summaries, action items, and insights\n5️⃣ **Sync & Share** - Connect your tools for seamless workflow\n\nReady to upload your first meeting?";
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

export function AnimatedAIChat() {
    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [recentCommand, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [messages, setMessages] = useState<Message[]>(mockConversations);
    const [inputFocused, setInputFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const commandSuggestions: CommandSuggestion[] = [
        {
            icon: <ImageIcon className="w-4 h-4" />,
            label: "Clone UI",
            description: "Generate a UI from a screenshot",
            prefix: "/clone"
        },
        {
            icon: <Figma className="w-4 h-4" />,
            label: "Import Figma",
            description: "Import a design from Figma",
            prefix: "/figma"
        },
        {
            icon: <MonitorIcon className="w-4 h-4" />,
            label: "Create Page",
            description: "Generate a new web page",
            prefix: "/page"
        },
        {
            icon: <Sparkles className="w-4 h-4" />,
            label: "Improve",
            description: "Improve existing UI design",
            prefix: "/improve"
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
        if (!value.trim()) return;

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
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: getAIResponse(userMessage.content, [...messages, userMessage]),
                sender: 'ai',
                timestamp: new Date(),
                isRead: false
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, thinkingTime);
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

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    // Always show chat interface since we have mock data
    return (
        <div className="flex flex-col h-full bg-background">

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
                                    {/* Attachment display */}
                                    {message.hasAttachment && (
                                        <div className="flex items-center gap-2 p-2 bg-background/10 rounded-lg mb-2">
                                            <div className="w-8 h-8 bg-background/20 rounded-lg flex items-center justify-center">
                                                {message.attachmentType === 'audio' && <Mic className="w-4 h-4" />}
                                                {message.attachmentType === 'image' && <ImageIcon className="w-4 h-4" />}
                                                {message.attachmentType === 'document' && <FileText className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{message.attachmentName}</p>
                                                <p className="text-xs opacity-70">
                                                    {message.attachmentType === 'audio' ? 'Audio file' : 'Document'}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {message.content}
                                    </p>

                                    {/* Emoji reaction */}
                                    {message.emoji && (
                                        <span className="absolute -bottom-2 -right-2 text-lg bg-background rounded-full p-1 shadow-sm border border-border">
                                            {message.emoji}
                                        </span>
                                    )}
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

                <div ref={messagesEndRef} />
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

            <ChatInputBox
                placeholder="Ask Daisy a question..."
                value={value}
                onChange={setValue}
                onSend={handleSendMessage}
                disabled={isTyping}
            />
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