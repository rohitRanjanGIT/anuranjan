"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Folder01Icon,
  Camera01Icon,
  Settings05Icon,
  HelpCircleIcon,
  Image01Icon,
  UserGroupIcon,
  MessageEdit01Icon,
  Briefcase01Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "Admin",
    email: "admin@anuranjaninfra.com",
    avatar: "/AnuranjanLogo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: (
        <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Projects",
      url: "/admin/dashboard/projects",
      icon: (
        <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Images",
      url: "/admin/dashboard/images",
      icon: (
        <HugeiconsIcon icon={Image01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Categories",
      url: "/admin/dashboard/categories",
      icon: (
        <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Testimonials",
      url: "/admin/dashboard/testimonials",
      icon: (
        <HugeiconsIcon icon={MessageEdit01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Careers",
      url: "/admin/dashboard/careers",
      icon: (
        <HugeiconsIcon icon={Briefcase01Icon} strokeWidth={2} />
      ),
    },
  ],
  navSecondary: [
    {
      title: "View Website",
      url: "/",
      icon: (
        <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />
      ),
    },
    {
      title: "Help",
      url: "#",
      icon: (
        <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/admin/dashboard">
                <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} className="size-5!" />
                <span className="text-base font-semibold">Anuranjan Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
