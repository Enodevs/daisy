import { Layout } from '~/components/Layout';
import { Calendar, MessageSquare, FileText, Zap, Check, Plus } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Integrations</h1>
          <p className="text-muted">Connect Daisy with your favorite tools to streamline your workflow</p>
        </div>

        {/* Connected Integrations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Connected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Google Calendar</h3>
                    <p className="text-sm text-muted">Sync action items as events</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary font-medium">Connected</span>
                <button className="text-sm text-muted hover:text-foreground">Configure</button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Integrations */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Available Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Slack */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Slack</h3>
                  <p className="text-sm text-muted">Send summaries to channels</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Automatically post meeting summaries and action items to your Slack channels.
              </p>
              <button className="btn btn-primary w-full">
                <Plus className="w-4 h-4" />
                Connect Slack
              </button>
            </div>

            {/* Notion */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Notion</h3>
                  <p className="text-sm text-muted">Save transcripts as pages</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Create Notion pages with meeting transcripts, summaries, and action items.
              </p>
              <button className="btn btn-primary w-full">
                <Plus className="w-4 h-4" />
                Connect Notion
              </button>
            </div>

            {/* Zapier */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Zapier</h3>
                  <p className="text-sm text-muted">Connect to 5000+ apps</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Use Zapier to connect Daisy with thousands of other applications.
              </p>
              <button className="btn btn-primary w-full">
                <Plus className="w-4 h-4" />
                Connect Zapier
              </button>
            </div>

            {/* Microsoft Teams */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Microsoft Teams</h3>
                  <p className="text-sm text-muted">Share to Teams channels</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Post meeting summaries and action items directly to Teams channels.
              </p>
              <button className="btn btn-secondary w-full">
                <Plus className="w-4 h-4" />
                Coming Soon
              </button>
            </div>

            {/* Trello */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trello</h3>
                  <p className="text-sm text-muted">Create cards from action items</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Automatically create Trello cards from meeting action items and deadlines.
              </p>
              <button className="btn btn-secondary w-full">
                <Plus className="w-4 h-4" />
                Coming Soon
              </button>
            </div>

            {/* Asana */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Asana</h3>
                  <p className="text-sm text-muted">Create tasks from meetings</p>
                </div>
              </div>
              <p className="text-sm text-muted mb-4">
                Turn action items into Asana tasks with due dates and assignees.
              </p>
              <button className="btn btn-secondary w-full">
                <Plus className="w-4 h-4" />
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="mt-12 card bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <h3 className="text-lg font-semibold text-foreground mb-3">Why integrate with Daisy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Automatic Sync</h4>
              <p className="text-sm text-muted">
                Action items and deadlines are automatically synced to your tools without manual work.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Real-time Updates</h4>
              <p className="text-sm text-muted">
                Get instant notifications and updates across all your connected platforms.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Centralized Workflow</h4>
              <p className="text-sm text-muted">
                Keep all your meeting insights in one place while working in your favorite tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}