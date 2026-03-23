"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle01Icon, Loading03Icon, Edit02Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { useRefresh } from "@/components/refresh-context"

interface ProjectItem {
  id: number
  title: string
  type: string
  status: string
  year: string | null
  homepagePortfolio: boolean
  category: { name: string }
}

export function DashboardRecentItems() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const { refreshKey } = useRefresh()

  useEffect(() => {
    setLoading(true)
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data.slice(0, 10) : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [refreshKey])

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>
            {projects.length === 0 && !loading
              ? "No projects yet. Add your first project to get started."
              : "Latest projects in your portfolio"}
          </CardDescription>
        </CardHeader>
        <div className="overflow-hidden rounded-b-lg border-t">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No projects found. Use the Projects page to add new ones.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.category?.name || "—"}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {project.status === "COMPLETED" ? (
                          <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-3 fill-green-500" />
                        ) : (
                          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-3" />
                        )}
                        {project.status === "COMPLETED" ? "Completed" : "Ongoing"}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.year || "—"}</TableCell>
                    <TableCell>
                      {project.homepagePortfolio ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20">Homepage</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <a href="/admin/dashboard/projects">
                          <Button variant="ghost" size="icon" title="Edit in Projects section">
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                        </a>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={async () => {
                            if (!confirm("Are you sure you want to delete this project?")) return
                            await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
                            window.location.reload()
                          }}
                          title="Delete project"
                        >
                          <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
