"use client"

import * as React from "react"
import {
    Settings2,
    Frame,
    PieChart,
    Map as MapIcon,
    Waypoints,
    Presentation,
    Calendar1,
    FileAudio,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "~/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavProjects } from "./nav-projects"
import Image from "next/image"

// This is sample data.
const data = {
    user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Meetings",
            url: "/meetings",
            icon: Presentation,
        },
        {
            title: "Transcripts",
            url: "/transcripts",
            icon: FileAudio,
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: Calendar1,
        },
        {
            title: "Integrations",
            url: "/integrations",
            icon: Waypoints,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
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
            icon: MapIcon,
        },
    ],
}

function SidebarBrand() {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-2">
                <Image src="/daisy-logo.png" alt="Logo" width={32} height={32} />
                <span className="text-lg font-semibold text-foreground">Daisy</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <SidebarBrand />
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
