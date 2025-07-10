"use client"

import * as React from "react"
import {
    Bot,
    MessageSquare,
    Mic,
    Calendar,
    FileText,
    Zap,
    Users,
    Settings2,
    CreditCard,
    HelpCircle,
    Plus,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "~/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Chat",
            url: "/chat",
            icon: MessageSquare,
            isActive: true,
        },
        {
            title: "Meetings",
            url: "/meetings",
            icon: Mic,
            items: [
                {
                    title: "Recent",
                    url: "/meetings",
                },
                {
                    title: "Upload Audio",
                    url: "/meetings/upload",
                },
                {
                    title: "Live Recording",
                    url: "/meetings/record",
                },
            ],
        },
        {
            title: "Transcripts",
            url: "/transcripts",
            icon: FileText,
            items: [
                {
                    title: "All Transcripts",
                    url: "/transcripts",
                },
                {
                    title: "Summaries",
                    url: "/transcripts/summaries",
                },
                {
                    title: "Action Items",
                    url: "/transcripts/actions",
                },
            ],
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: Calendar,
            items: [
                {
                    title: "Upcoming Meetings",
                    url: "/calendar",
                },
                {
                    title: "Schedule Meeting",
                    url: "/calendar/schedule",
                },
                {
                    title: "Sync Settings",
                    url: "/calendar/sync",
                },
            ],
        },
        {
            title: "Integrations",
            url: "/integrations",
            icon: Zap,
            items: [
                {
                    title: "Connected Apps",
                    url: "/integrations",
                },
                {
                    title: "Browse All",
                    url: "/integrations/browse",
                },
                {
                    title: "API Keys",
                    url: "/integrations/api",
                },
            ],
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "Agent Config",
                    url: "/settings",
                },
                {
                    title: "Account",
                    url: "/settings/account",
                },
                {
                    title: "Billing",
                    url: "/settings/billing",
                },
            ],
        },
    ],
    quickActions: [
        {
            name: "New Chat",
            url: "/chat",
            icon: Plus,
        },
        {
            name: "Upload Audio",
            url: "/meetings/upload",
            icon: Mic,
        },
        {
            name: "Help & Support",
            url: "/help",
            icon: HelpCircle,
        },
    ],
    teams: [
        {
            name: "Personal",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Settings",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

function SidebarBrand() {
    return (
        <div className="flex items-center gap-3 px-2 py-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg">🌸</span>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">Daisy</span>
                <span className="text-xs text-muted-foreground">AI Meeting Assistant</span>
            </div>
        </div>
    )
}

function QuickActions({ actions }: { actions: typeof data.quickActions }) {
    return (
        <div className="px-2 py-4 border-t border-border">
            <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground px-2 mb-2">Quick Actions</h4>
                {actions.map((action) => (
                    <a
                        key={action.name}
                        href={action.url}
                        className="flex items-center gap-3 px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                        <action.icon className="w-4 h-4" />
                        <span>{action.name}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

function UsageStats() {
    return (
        <div className="px-2 py-4 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">Free Plan</span>
                    <span className="text-xs text-muted-foreground">3/5 meetings</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">2 meetings left</span>
                    <a href="/settings/billing" className="text-xs text-primary hover:underline">
                        Upgrade
                    </a>
                </div>
            </div>
        </div>
    )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
