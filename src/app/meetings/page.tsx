"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Upload, Mic, FileText, Calendar, Clock, User, MoreVertical, Play, Download } from "lucide-react";
import { motion } from "framer-motion";

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: "completed" | "processing" | "failed";
  hasTranscript: boolean;
  hasSummary: boolean;
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Team Standup - Sprint Planning",
    date: "2024-01-15",
    duration: "45 min",
    participants: 6,
    status: "completed",
    hasTranscript: true,
    hasSummary: true,
  },
  {
    id: "2",
    title: "Client Presentation Review",
    date: "2024-01-14",
    duration: "1h 20min",
    participants: 4,
    status: "completed",
    hasTranscript: true,
    hasSummary: true,
  },
  {
    id: "3",
    title: "Product Strategy Discussion",
    date: "2024-01-12",
    duration: "2h 15min",
    participants: 8,
    status: "processing",
    hasTranscript: false,
    hasSummary: false,
  },
];

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  const getStatusColor = (status: Meeting["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "processing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

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
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Meetings</h1>
                <p className="text-sm text-muted-foreground">Manage your meeting recordings and transcripts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Mic className="w-4 h-4 mr-2" />
                Record Live
              </Button>
              <Button size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Audio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <motion.div 
          className="bg-card rounded-xl border border-border p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Upload Meeting Audio</h3>
              <p className="text-muted-foreground">
                Drag and drop your audio file or click to browse. Supports MP3, WAV, M4A formats.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <Button variant="outline">
                <Mic className="w-4 h-4 mr-2" />
                Record Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Meetings List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Meetings</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {meetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedMeeting(meeting.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">{meeting.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {meeting.participants} participants
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {meeting.hasTranscript && (
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Transcript
                      </Button>
                    )}
                    {meeting.hasSummary && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Summary
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}