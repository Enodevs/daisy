"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus, 
  Video, 
  Mic,
  FileText,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

interface Meeting {
  id: string;
  title: string;
  time: string;
  duration: string;
  participants: string[];
  type: "upcoming" | "recorded" | "live";
  hasTranscript?: boolean;
  hasSummary?: boolean;
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Team Standup",
    time: "09:00 AM",
    duration: "30 min",
    participants: ["John Doe", "Jane Smith", "Mike Johnson"],
    type: "upcoming",
  },
  {
    id: "2",
    title: "Client Presentation",
    time: "02:00 PM",
    duration: "1 hour",
    participants: ["Sarah Wilson", "Tom Brown"],
    type: "upcoming",
  },
  {
    id: "3",
    title: "Product Review",
    time: "04:30 PM",
    duration: "45 min",
    participants: ["Alex Chen", "Lisa Park", "David Kim"],
    type: "recorded",
    hasTranscript: true,
    hasSummary: true,
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-border/50"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      const isSelected = day === selectedDate.getDate();
      
      days.push(
        <motion.div
          key={day}
          className={`h-24 border border-border/50 p-2 cursor-pointer transition-colors ${
            isToday ? "bg-primary/10 border-primary/30" : ""
          } ${isSelected ? "bg-primary/20" : ""} hover:bg-accent`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
            {day}
          </div>
          {day === 15 && (
            <div className="mt-1">
              <div className="text-xs bg-primary text-primary-foreground px-1 rounded">
                Team Standup
              </div>
            </div>
          )}
          {day === 20 && (
            <div className="mt-1">
              <div className="text-xs bg-blue-500 text-white px-1 rounded">
                Client Call
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your meetings and schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Sync Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Today's Meetings</p>
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
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">4h 15m</p>
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
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">12</p>
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
              <p className="text-2xl font-semibold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Action Items</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {["month", "week", "day"].map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode as any)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {meetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    meeting.type === "upcoming" ? "bg-blue-500" :
                    meeting.type === "live" ? "bg-green-500" : "bg-gray-500"
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{meeting.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {meeting.time} • {meeting.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Users className="w-3 h-3" />
                      {meeting.participants.length} participants
                    </div>
                    {(meeting.hasTranscript || meeting.hasSummary) && (
                      <div className="flex items-center gap-2 mt-2">
                        {meeting.hasTranscript && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200">
                            Transcript
                          </span>
                        )}
                        {meeting.hasSummary && (
                          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200">
                            Summary
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {meeting.type === "upcoming" && (
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                    )}
                    {meeting.type === "recorded" && (
                      <Button variant="ghost" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Schedule New Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View All Transcripts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}