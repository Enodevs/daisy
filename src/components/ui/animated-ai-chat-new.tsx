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
    Check,
    Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import { processChat, transcribeAudio, generateSummary } from "~/lib/openai";

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
    isProcessing?: boolean;
}

interface UploadedFile {
    id: string;
    name: string;
    type: 'audio' | 'document' | 'image';
    size?: string;
    file?: File;
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
                        className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-primary/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

// Initial welcome message
const initialMessages: Message[] = [
    {
        id: "welcome",
        content: "Hello! I'm Daisy, your AI meeting assistant. I can help you transcribe audio, generate summaries, extract action items, and sync with your favorite tools. What would you like to do today? ✨",
        sender: 'ai',
        timestamp: new Date(),
        isRead: true
    }
];

export function AnimatedAIChatNew() {
    const [value, setValue] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [recentCommand, setRecentCommand] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputFocused, setInputFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isProcessingFile, setIsProcessingFile] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const commandPaletteRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const commandSuggestions: CommandSuggestion[] = [
        {
            icon: <Upload className="w-4 h-4" />,
            label: "Upload Audio",
            description: "Upload meeting recording for transcription",
            prefix: "/upload"
        },
        {
            icon: <Mic className="w-4 h-4" />,
            label: "Transcribe",
            description: "Start transcription process",
            prefix: "/transcribe"
        },
        {
            icon: <Calendar className="w-4 h-4" />,
            label: "Schedule",
            description: "Schedule a new meeting",
            prefix: "/schedule"
        },
        {
            icon: <Zap className="w-4 h-4" />,
            label: "Integrations",
            description: "View available integrations",
            prefix: "/integrations"
        },
    ];

    // Smart suggestions based on conversation context
    const getSmartSuggestions = (lastMessage: string): string[] => {
        const message = lastMessage.toLowerCase();
        
        if (message.includes('upload') || message.includes('audio') || message.includes('recording')) {
            return [
                "Generate a summary from this recording",
                "Extract action items",
                "Identify speakers in the audio"
            ];
        }
        
        if (message.includes('transcrib') || message.includes('transcript')) {
            return [
                "Create meeting summary",
                "Find action items",
                "Export transcript as PDF"
            ];
        }
        
        if (message.includes('summary') || message.includes('action')) {
            return [
                "Sync to Google Calendar",
                "Send to Slack channel",
                "Save to Notion"
            ];
        }
        
        if (message.includes('integrat')) {
            return [
                "Connect Google Calendar",
                "Set up Slack notifications",
                "Configure Notion sync"
            ];
        }
        
        return [
            "Upload a meeting recording",
            "How does transcription work?",
            "Show me integrations",
            "What are your features?"
        ];
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (messages.length > 1) {
            const lastAIMessage = messages.filter(m => m.sender === 'ai').pop();
            if (lastAIMessage) {
                setSuggestions(getSmartSuggestions(lastAIMessage.content));
            }
        } else {
            setSuggestions([
                "Upload a meeting recording",
                "How does transcription work?",
                "Show me integrations",
                "What are your features?"
            ]);
        }
    }, [messages]);

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

    const handleFileUpload = async (file: File) => {
        const fileId = Date.now().toString();
        const uploadedFile: UploadedFile = {
            id: fileId,
            name: file.name,
            type: file.type.startsWith('audio/') ? 'audio' : 
                  file.type.startsWith('image/') ? 'image' : 'document',
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            file: file
        };

        setUploadedFiles(prev => [...prev, uploadedFile]);

        // Add user message about file upload
        const userMessage: Message = {
            id: Date.now().toString(),
            content: `I've uploaded ${file.name}`,
            sender: 'user',
            timestamp: new Date(),
            hasAttachment: true,
            attachmentType: uploadedFile.type,
            attachmentName: file.name,
            isRead: true
        };

        setMessages(prev => [...prev, userMessage]);

        // Process audio files
        if (file.type.startsWith('audio/')) {
            setIsProcessingFile(true);
            setIsTyping(true);

            try {
                // Add processing message
                const processingMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: "I'm processing your audio file. This may take a moment...",
                    sender: 'ai',
                    timestamp: new Date(),
                    isProcessing: true
                };

                setMessages(prev => [...prev, processingMessage]);

                // Transcribe audio
                const transcription = await transcribeAudio(file);
                
                // Generate summary
                const summary = await generateSummary(transcription);

                // Remove processing message and add results
                setMessages(prev => prev.filter(m => !m.isProcessing));

                const transcriptMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    content: `**Transcription Complete!** ✅\n\n**Summary:**\n${summary.summary}\n\n**Key Points:**\n${summary.keyPoints.map(point => `• ${point}`).join('\n')}\n\n**Decisions Made:**\n${summary.decisions.map(decision => `• ${decision}`).join('\n')}\n\n**Action Items:**\n${summary.actionItems.map(item => `• ${item.title}${item.assignee ? ` (${item.assignee})` : ''}${item.dueDate ? ` - Due: ${item.dueDate}` : ''}`).join('\n')}`,
                    sender: 'ai',
                    timestamp: new Date(),
                    isRead: false
                };

                setMessages(prev => [...prev, transcriptMessage]);

            } catch (error) {
                console.error('Error processing audio:', error);
                
                setMessages(prev => prev.filter(m => !m.isProcessing));
                
                const errorMessage: Message = {
                    id: (Date.now() + 3).toString(),
                    content: "I encountered an error processing your audio file. This might be due to the file format or size. Please try again with a different file or check that your API keys are configured correctly.",
                    sender: 'ai',
                    timestamp: new Date(),
                    isRead: false
                };

                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsProcessingFile(false);
                setIsTyping(false);
            }
        } else {
            // Handle non-audio files
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `I've received your ${uploadedFile.type} file "${file.name}". While I specialize in audio transcription, I can help you with questions about this file or guide you on how to work with meeting-related documents.`,
                sender: 'ai',
                timestamp: new Date(),
                isRead: false
            };

            setMessages(prev => [...prev, responseMessage]);
        }
    };

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

    const handleSendMessage = async () => {
        if (!value.trim() || isTyping) return;

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

        try {
            // Process the message with OpenAI
            const response = await processChat(userMessage.content);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response,
                sender: 'ai',
                timestamp: new Date(),
                isRead: false
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error processing chat:', error);
            
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I'm having trouble processing your request right now. Please make sure your API keys are configured correctly in the environment variables.",
                sender: 'ai',
                timestamp: new Date(),
                isRead: false
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleAttachFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
        // Reset the input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeUploadedFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index];
        setValue(selectedCommand.prefix + ' ');
        setShowCommandPalette(false);

        setRecentCommand(selectedCommand.label);
        setTimeout(() => setRecentCommand(null), 2000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setValue(suggestion);
        // Auto-send simple suggestions
        setTimeout(() => {
            handleSendMessage();
        }, 100);
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

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'audio':
                return <Mic className="w-3 h-3 text-primary" />;
            case 'document':
                return <FileText className="w-3 h-3 text-primary" />;
            case 'image':
                return <ImageIcon className="w-3 h-3 text-primary" />;
            default:
                return <FileText className="w-3 h-3 text-primary" />;
        }
    };

    // Show welcome screen if no messages (except initial)
    const showWelcomeScreen = messages.length <= 1 && !isTyping;

    if (showWelcomeScreen) {
        return (
            <div className="min-h-screen flex flex-col w-full items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
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
                                Upload audio, ask questions, or type a command
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
                                        className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-popover rounded-lg z-50 shadow-lg border border-border overflow-hidden"
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
                                {uploadedFiles.length > 0 && (
                                    <motion.div
                                        className="px-4 pb-3 flex gap-2 flex-wrap"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {uploadedFiles.map((file, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-2 text-xs bg-muted py-1.5 px-3 rounded-lg border border-border"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                            >
                                                {getFileIcon(file.type)}
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-foreground">{file.name}</span>
                                                    {file.size && (
                                                        <span className="text-xs text-muted-foreground">{file.size}</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeUploadedFile(index)}
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
                                        className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors relative group"
                                        disabled={isProcessingFile}
                                    >
                                        <Paperclip className="w-4 h-4" />
                                        <motion.span
                                            className="absolute inset-0 bg-accent/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
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
                                            "p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors relative group",
                                            showCommandPalette && "bg-accent text-foreground"
                                        )}
                                    >
                                        <Command className="w-4 h-4" />
                                        <motion.span
                                            className="absolute inset-0 bg-accent/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="button-highlight"
                                        />
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
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {isTyping ? (
                                        <LoaderIcon className="w-4 h-4 animate-spin" />
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
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {inputFocused && (
                    <motion.div
                        className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-primary via-primary/50 to-primary/30 blur-[96px]"
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
        );
    }

    // Chat interface
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

                                    {/* Processing indicator */}
                                    {message.isProcessing && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <LoaderIcon className="w-4 h-4 animate-spin" />
                                            <span className="text-xs opacity-70">Processing...</span>
                                        </div>
                                    )}

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

            {/* Suggestions Area */}
            <AnimatePresence>
                {suggestions.length > 0 && !isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="px-6 pb-2"
                    >
                        <div className="flex gap-2 flex-wrap">
                            {suggestions.slice(0, 4).map((suggestion, index) => (
                                <motion.button
                                    key={suggestion}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-full text-sm text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-border"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <span>{suggestion}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-6 border-t border-border">
                <div className="relative backdrop-blur-2xl bg-card/50 rounded-2xl border border-border shadow-lg">
                    <AnimatePresence>
                        {showCommandPalette && (
                            <motion.div
                                ref={commandPaletteRef}
                                className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-popover rounded-lg z-50 shadow-lg border border-border overflow-hidden"
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
                            disabled={isTyping || isProcessingFile}
                        />
                    </div>

                    <AnimatePresence>
                        {uploadedFiles.length > 0 && (
                            <motion.div
                                className="px-4 pb-3 flex gap-2 flex-wrap"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {uploadedFiles.map((file, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center gap-2 text-xs bg-muted py-1.5 px-3 rounded-lg border border-border"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        {getFileIcon(file.type)}
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-foreground">{file.name}</span>
                                            {file.size && (
                                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeUploadedFile(index)}
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
                                className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors relative group"
                                disabled={isProcessingFile}
                            >
                                <Paperclip className="w-4 h-4" />
                                <motion.span
                                    className="absolute inset-0 bg-accent/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    layoutId="button-highlight"
                                />
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
                                    "p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors relative group",
                                    showCommandPalette && "bg-accent text-foreground"
                                )}
                            >
                                <Command className="w-4 h-4" />
                                <motion.span
                                    className="absolute inset-0 bg-accent/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    layoutId="button-highlight"
                                />
                            </motion.button>
                        </div>

                        <motion.button
                            type="button"
                            onClick={handleSendMessage}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isTyping || !value.trim() || isProcessingFile}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                "flex items-center gap-2",
                                value.trim() && !isTyping && !isProcessingFile
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {isTyping || isProcessingFile ? (
                                <LoaderIcon className="w-4 h-4 animate-spin" />
                            ) : (
                                <SendIcon className="w-4 h-4" />
                            )}
                            <span>Send</span>
                        </motion.button>
                    </div>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
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