import { Layout } from '~/components/Layout';
import { Upload, Mic, FileText, Calendar, Zap } from 'lucide-react';

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Daisy
          </h1>
          <p className="text-muted">
            Your AI meeting assistant. Upload audio, get transcriptions, and extract insights.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upload Audio</h3>
                <p className="text-sm text-muted">Upload meeting recordings</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Live Recording</h3>
                <p className="text-sm text-muted">Record meetings in real-time</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">View Meetings</h3>
                <p className="text-sm text-muted">Browse past transcriptions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Meetings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Team Standup</h4>
                  <p className="text-sm text-muted">2 hours ago • 15 min</p>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Processed
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Client Call</h4>
                  <p className="text-sm text-muted">Yesterday • 45 min</p>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Processed
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted">Total Meetings</span>
                <span className="font-semibold text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Hours Transcribed</span>
                <span className="font-semibold text-foreground">8.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Action Items</span>
                <span className="font-semibold text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Plan</span>
                <span className="px-2 py-1 bg-secondary text-foreground text-xs rounded-full">
                  Free
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat with Daisy CTA */}
        <div className="mt-8 card bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Ask Daisy anything about your meetings
              </h3>
              <p className="text-sm text-muted">
                "What action items do I have from yesterday?" or "Summarize last week's client calls"
              </p>
            </div>
            <button className="btn btn-primary">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}