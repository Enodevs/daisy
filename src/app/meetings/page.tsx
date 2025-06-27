import { Layout } from '~/components/Layout';
import { Upload, Mic, Search, Filter, Calendar, Clock, Users } from 'lucide-react';

export default function MeetingsPage() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meetings</h1>
            <p className="text-muted">Manage your meeting recordings and transcriptions</p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-secondary">
              <Upload className="w-5 h-5" />
              Upload Audio
            </button>
            <button className="btn btn-primary">
              <Mic className="w-5 h-5" />
              Start Recording
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="btn btn-secondary">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {/* Meeting Item */}
          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Team Standup</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Processed
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Today, 9:00 AM
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    15 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    5 participants
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">3 action items</p>
                <p className="text-xs text-muted">2 decisions made</p>
              </div>
            </div>
          </div>

          {/* Meeting Item */}
          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Client Discovery Call</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Processed
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Yesterday, 2:00 PM
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    45 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    3 participants
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">7 action items</p>
                <p className="text-xs text-muted">5 decisions made</p>
              </div>
            </div>
          </div>

          {/* Meeting Item */}
          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Product Planning Session</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Processing
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Tuesday, 10:00 AM
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    1 hour 20 minutes
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    8 participants
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">Analyzing...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State (when no meetings) */}
        {/* <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No meetings yet</h3>
          <p className="text-muted mb-6">Upload your first meeting recording or start a live recording</p>
          <div className="flex gap-3 justify-center">
            <button className="btn btn-secondary">
              <Upload className="w-5 h-5" />
              Upload Audio
            </button>
            <button className="btn btn-primary">
              <Mic className="w-5 h-5" />
              Start Recording
            </button>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}