"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import {
  Search,
  Mic,
  ArrowUp,
  Plus,
  FileText,
  Presentation,
  MessageSquare,
  Zap,
  BrainCircuit,
  Sparkles,
  X,
  Upload,
  Calendar,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  type: 'audio' | 'document';
  size?: string;
}

export function AIAssistantInterfaceV2() {
  const [inputValue, setInputValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(false);
  const [smartInsightsEnabled, setSmartInsightsEnabled] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);
  const [activeCommandCategory, setActiveCommandCategory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandSuggestions = {
    meetings: [
      "Upload my team standup recording",
      "Transcribe the client presentation from yesterday",
      "Generate summary for the product review meeting",
      "Extract action items from the board meeting",
      "Create meeting notes for the quarterly review",
    ],
    transcribe: [
      "Convert audio to searchable text",
      "Identify speakers in the recording",
      "Generate timestamps for key topics",
      "Create a transcript with speaker labels",
      "Extract quotes and important statements",
    ],
    integrate: [
      "Sync action items to Google Calendar",
      "Send summary to Slack channel",
      "Save transcript to Notion workspace",
      "Create Zapier automation workflow",
      "Schedule follow-up meetings in Teams",
    ],
  };

  const handleUploadFile = useCallback(() => {
    setShowUploadAnimation(true);

    // Simulate file upload with timeout
    setTimeout(() => {
      const fileTypes = ['audio', 'document'] as const;
      const fileNames = [
        'team-standup-recording.mp3',
        'client-presentation.m4a',
        'board-meeting-notes.pdf',
        'quarterly-review.wav',
        'product-demo.mp3'
      ];
      
      const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
      
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: randomName,
        type: randomType,
        size: randomType === 'audio' ? '12.5 MB' : '2.1 MB'
      };
      
      setUploadedFiles((prev) => [...prev, newFile]);
      setShowUploadAnimation(false);
    }, 1500);
  }, []);

  const handleRemoveFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter(file => file.id !== fileId));
  }, []);

  const handleCommandSelect = useCallback((command: string) => {
    setInputValue(command);
    setActiveCommandCategory(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      setIsProcessing(true);
      console.log("Processing request:", inputValue);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setInputValue("");
      }, 2000);
    }
  }, [inputValue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Mic className="w-3 h-3 text-primary" />;
      case 'document':
        return <FileText className="w-3 h-3 text-primary" />;
      default:
        return <FileText className="w-3 h-3 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Daisy Logo */}
        <motion.div 
          className="mb-8 w-20 h-20 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-4xl shadow-lg">
            🌸
          </div>
        </motion.div>

        {/* Welcome message */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
              Ready to assist with your meetings
            </h1>
            <p className="text-muted-foreground max-w-md">
              Upload recordings, get transcripts, summaries, and action items
            </p>
          </motion.div>
        </div>

        {/* Input area with integrated functions and file upload */}
        <motion.div 
          className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="p-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Daisy about your meetings..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isProcessing}
              className="w-full text-foreground text-base outline-none placeholder:text-muted-foreground bg-transparent disabled:opacity-50"
            />
          </div>

          {/* Uploaded files */}
          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div 
                className="px-4 pb-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file) => (
                    <motion.div
                      key={file.id}
                      className="flex items-center gap-2 bg-muted py-2 px-3 rounded-lg border border-border"
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
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Features and actions */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <FeatureButton
                icon={<Search className="w-4 h-4" />}
                label="Search"
                isActive={searchEnabled}
                onClick={() => setSearchEnabled(!searchEnabled)}
              />
              <FeatureButton
                icon={<BrainCircuit className="w-4 h-4" />}
                label="AI Analysis"
                isActive={aiAnalysisEnabled}
                onClick={() => setAiAnalysisEnabled(!aiAnalysisEnabled)}
              />
              <FeatureButton
                icon={<Sparkles className="w-4 h-4" />}
                label="Smart Insights"
                isActive={smartInsightsEnabled}
                onClick={() => setSmartInsightsEnabled(!smartInsightsEnabled)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                  inputValue.trim() && !isProcessing
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Upload files */}
          <div className="px-4 py-3 border-t border-border">
            <button
              onClick={handleUploadFile}
              disabled={showUploadAnimation}
              className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors disabled:opacity-50"
            >
              {showUploadAnimation ? (
                <motion.div
                  className="flex space-x-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: i * 0.1,
                          },
                        },
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload Meeting Recording</span>
            </button>
          </div>
        </motion.div>

        {/* Command categories */}
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <CommandButton
            icon={<Presentation className="w-5 h-5" />}
            label="Meetings"
            description="Upload & analyze recordings"
            isActive={activeCommandCategory === "meetings"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "meetings" ? null : "meetings"
              )
            }
          />
          <CommandButton
            icon={<MessageSquare className="w-5 h-5" />}
            label="Transcribe"
            description="Convert speech to text"
            isActive={activeCommandCategory === "transcribe"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "transcribe" ? null : "transcribe"
              )
            }
          />
          <CommandButton
            icon={<Zap className="w-5 h-5" />}
            label="Integrate"
            description="Connect with your tools"
            isActive={activeCommandCategory === "integrate"}
            onClick={() =>
              setActiveCommandCategory(
                activeCommandCategory === "integrate" ? null : "integrate"
              )
            }
          />
        </motion.div>

        {/* Command suggestions */}
        <AnimatePresence>
          {activeCommandCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mb-6 overflow-hidden"
            >
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-medium text-foreground">
                    {activeCommandCategory === "meetings"
                      ? "Meeting suggestions"
                      : activeCommandCategory === "transcribe"
                      ? "Transcription suggestions"
                      : "Integration suggestions"}
                  </h3>
                </div>
                <ul className="divide-y divide-border">
                  {commandSuggestions[
                    activeCommandCategory as keyof typeof commandSuggestions
                  ].map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCommandSelect(suggestion)}
                      className="p-4 hover:bg-accent cursor-pointer transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        {activeCommandCategory === "meetings" ? (
                          <Presentation className="w-4 h-4 text-primary" />
                        ) : activeCommandCategory === "transcribe" ? (
                          <MessageSquare className="w-4 h-4 text-primary" />
                        ) : (
                          <Zap className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-sm text-foreground">
                          {suggestion}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick stats or status */}
        <motion.div 
          className="flex items-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>AI Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>3/5 meetings this month</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>2 integrations active</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FeatureButton({ icon, label, isActive, onClick }: FeatureButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function CommandButton({ icon, label, description, isActive, onClick }: CommandButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-all text-center",
        isActive
          ? "bg-primary/5 border-primary/20 shadow-sm"
          : "bg-card border-border hover:border-border/60 hover:shadow-md"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(
        "transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {icon}
      </div>
      <div>
        <span className={cn(
          "text-sm font-medium block",
          isActive ? "text-primary" : "text-foreground"
        )}>
          {label}
        </span>
        <span className="text-xs text-muted-foreground mt-1 block">
          {description}
        </span>
      </div>
    </motion.button>
  );
}