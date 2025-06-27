import { Layout } from '~/components/Layout';
import { Send, Bot, User } from 'lucide-react';

export default function ChatPage() {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Chat with Daisy</h1>
              <p className="text-sm text-muted">Ask about your meetings, action items, and insights</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Welcome Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-foreground">
                    Hi! I'm Daisy, your AI meeting assistant. I can help you with:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    <li>• Summarizing your meetings</li>
                    <li>• Finding action items and deadlines</li>
                    <li>• Searching through transcriptions</li>
                    <li>• Analyzing meeting trends</li>
                  </ul>
                  <p className="mt-3 text-foreground">
                    What would you like to know about your meetings?
                  </p>
                </div>
              </div>
            </div>

            {/* Example User Message */}
            <div className="flex gap-4 justify-end">
              <div className="flex-1 max-w-lg">
                <div className="bg-primary rounded-lg p-4">
                  <p className="text-white">
                    What action items do I have from this week's meetings?
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Example AI Response */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-foreground mb-3">
                    Based on your meetings this week, here are your action items:
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded border-l-4 border-primary">
                      <p className="font-medium text-foreground">Follow up with client on proposal</p>
                      <p className="text-sm text-muted">Due: Friday • From: Client Call (Yesterday)</p>
                    </div>
                    <div className="p-3 bg-white rounded border-l-4 border-primary">
                      <p className="font-medium text-foreground">Prepare Q4 budget review</p>
                      <p className="text-sm text-muted">Due: Next Monday • From: Team Standup (Today)</p>
                    </div>
                    <div className="p-3 bg-white rounded border-l-4 border-primary">
                      <p className="font-medium text-foreground">Schedule design review meeting</p>
                      <p className="text-sm text-muted">Due: This week • From: Product Sync (Tuesday)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Ask Daisy about your meetings..."
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="btn btn-primary px-4">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted mt-2 text-center">
              Try: "Summarize yesterday's standup" or "What decisions were made in the client call?"
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}