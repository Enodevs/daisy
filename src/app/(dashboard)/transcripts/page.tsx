"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { FileText, Download, Search, Filter, Calendar, Clock, User, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface Transcript {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  wordCount: number;
  confidence: number;
  hasActions: boolean;
  hasSummary: boolean;
}

const transcripts: Transcript[] = [
  {
    id: "1",
    title: "Team Standup - Sprint Planning",
    date: "2024-01-15",
    duration: "45 min",
    participants: 6,
    wordCount: 3420,
    confidence: 98.5,
    hasActions: true,
    hasSummary: true,
  },
  {
    id: "2",
    title: "Client Presentation Review",
    date: "2024-01-14",
    duration: "1h 20min",
    participants: 4,
    wordCount: 5680,
    confidence: 97.2,
    hasActions: true,
    hasSummary: true,
  },
  {
    id: "3",
    title: "Product Strategy Discussion",
    date: "2024-01-12",
    duration: "2h 15min",
    participants: 8,
    wordCount: 8950,
    confidence: 96.8,
    hasActions: false,
    hasSummary: true,
  },
];

export default function TranscriptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 90) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Transcripts</h1>
          <p className="text-muted-foreground">View and manage your meeting transcriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search transcripts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{transcripts.length}</p>
              <p className="text-sm text-muted-foreground">Total Transcripts</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">12h 30m</p>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">18</p>
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">18,050</p>
              <p className="text-sm text-muted-foreground">Total Words</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transcripts List */}
      <div className="space-y-4">
        {transcripts.map((transcript, index) => (
          <motion.div
            key={transcript.id}
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedTranscript(transcript.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-foreground">{transcript.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(transcript.confidence)}`}>
                    {transcript.confidence}% accuracy
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(transcript.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {transcript.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {transcript.participants} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {transcript.wordCount.toLocaleString()} words
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {transcript.hasSummary && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                      Summary Available
                    </span>
                  )}
                  {transcript.hasActions && (
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                      Action Items
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}