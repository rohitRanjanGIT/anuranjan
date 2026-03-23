"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Folder01Icon, Image01Icon, MessageEdit01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { useRefresh } from "@/components/refresh-context"

interface DashboardStats {
  totalProjects: number
  ongoingProjects: number
  completedProjects: number
  totalImages: number
  heroImages: number
  totalTestimonials: number
  totalCareers: number
  totalCategories: number
  featuredProjects: number
  totalEnquiries: number
  unreadEnquiries: number
}

export function SectionCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const { refreshKey } = useRefresh()

  useEffect(() => {
    setStats(null)
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
  }, [refreshKey])

  if (!stats) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="@container/card animate-pulse">
            <CardHeader>
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-8 w-16 rounded bg-muted mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      detail: `${stats.ongoingProjects} ongoing · ${stats.completedProjects} completed`,
      badge: `${stats.featuredProjects}/7 featured`,
      icon: Folder01Icon,
    },
    {
      label: "Gallery Images",
      value: stats.totalImages,
      detail: `${stats.heroImages} in hero carousel`,
      badge: `${stats.totalCategories} categories`,
      icon: Image01Icon,
    },
    {
      label: "Testimonials",
      value: stats.totalTestimonials,
      detail: "Client reviews & feedback",
      badge: "Active",
      icon: MessageEdit01Icon,
    },
    {
      label: "Enquiries",
      value: stats.totalEnquiries,
      detail: `${stats.unreadEnquiries} unread`,
      badge: stats.unreadEnquiries > 0 ? "New" : "All read",
      icon: Mail01Icon,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <HugeiconsIcon icon={card.icon} strokeWidth={2} className="size-4" />
              {card.label}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.detail}
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              {card.badge}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
