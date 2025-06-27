import { Layout } from '~/components/Layout';
import { User, Bell, Shield, CreditCard, Mic, Bot } from 'lucide-react';

export default function SettingsPage() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <a href="#profile" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white">
                <User className="w-5 h-5" />
                Profile
              </a>
              <a href="#notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-secondary hover:text-foreground">
                <Bell className="w-5 h-5" />
                Notifications
              </a>
              <a href="#recording" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-secondary hover:text-foreground">
                <Mic className="w-5 h-5" />
                Recording
              </a>
              <a href="#ai" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-secondary hover:text-foreground">
                <Bot className="w-5 h-5" />
                AI Settings
              </a>
              <a href="#billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-secondary hover:text-foreground">
                <CreditCard className="w-5 h-5" />
                Billing
              </a>
              <a href="#security" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted hover:bg-secondary hover:text-foreground">
                <Shield className="w-5 h-5" />
                Security
              </a>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <div id="profile" className="card">
              <h2 className="text-xl font-semibold text-foreground mb-6">Profile</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-muted" />
                  </div>
                  <div>
                    <button className="btn btn-secondary">Change Photo</button>
                    <p className="text-sm text-muted mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="Acme Inc."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>

            {/* AI Settings */}
            <div id="ai" className="card">
              <h2 className="text-xl font-semibold text-foreground mb-6">AI Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Summary Style</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Detailed</option>
                    <option>Concise</option>
                    <option>Bullet Points</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Action Item Detection</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-foreground">Detect deadlines automatically</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-foreground">Extract assignees from context</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-foreground">Suggest follow-up meetings</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Billing */}
            <div id="billing" className="card">
              <h2 className="text-xl font-semibold text-foreground mb-6">Billing</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">Current Plan</h3>
                    <p className="text-sm text-muted">Free Plan - 5 hours/month</p>
                  </div>
                  <button className="btn btn-primary">Upgrade</button>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-3">Usage This Month</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Transcription Hours</span>
                      <span className="text-foreground">2.5 / 5 hours</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-3">Available Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground">Pro</h4>
                      <p className="text-2xl font-bold text-foreground">$19<span className="text-sm text-muted">/month</span></p>
                      <ul className="text-sm text-muted mt-2 space-y-1">
                        <li>• 50 hours/month</li>
                        <li>• Priority processing</li>
                        <li>• Advanced integrations</li>
                      </ul>
                    </div>
                    <div className="border border-primary rounded-lg p-4 bg-primary/5">
                      <h4 className="font-medium text-foreground">Business</h4>
                      <p className="text-2xl font-bold text-foreground">$49<span className="text-sm text-muted">/month</span></p>
                      <ul className="text-sm text-muted mt-2 space-y-1">
                        <li>• Unlimited hours</li>
                        <li>• Team collaboration</li>
                        <li>• Custom integrations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}