"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon, PlusSignIcon } from "@hugeicons/core-free-icons"

interface Career {
  id: number
  title: string
  department: string
  location: string
  type: string
  experience: string
}

const emptyCareer = {
  title: "",
  department: "",
  location: "",
  type: "Full-Time",
  experience: "",
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addForm, setAddForm] = useState(emptyCareer)

  const [editItem, setEditItem] = useState<Career | null>(null)

  const fetchCareers = async () => {
    setLoading(true)
    const res = await fetch("/api/careers")
    const data = await res.json()
    setCareers(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCareers()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    })
    setIsAddOpen(false)
    setAddForm(emptyCareer)
    fetchCareers()
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editItem) return
    await fetch(`/api/careers/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    })
    setEditItem(null)
    fetchCareers()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this career position?")) return
    await fetch(`/api/careers/${id}`, { method: "DELETE" })
    fetchCareers()
  }

  const CareerForm = ({
    data,
    onChange,
  }: {
    data: typeof emptyCareer | Career
    onChange: (key: string, value: any) => void
  }) => (
    <div className="grid gap-4 py-4 sm:grid-cols-2">
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="department">Department</Label>
        <Input
          id="department"
          value={data.department}
          onChange={(e) => onChange("department", e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onChange("location", e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Employment Type</Label>
        <Input
          id="type"
          value={data.type}
          onChange={(e) => onChange("type", e.target.value)}
          placeholder="e.g. Full-Time, Contract"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="experience">Experience Required</Label>
        <Input
          id="experience"
          value={data.experience}
          onChange={(e) => onChange("experience", e.target.value)}
          placeholder="e.g. 2-5 Years"
          required
        />
      </div>
    </div>
  )

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-6 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Careers</h1>
              <p className="text-muted-foreground">Manage open job positions.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <HugeiconsIcon icon={PlusSignIcon} />
                  Add Position
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Add New Position</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd}>
                  <CareerForm
                    data={addForm}
                    onChange={(k, v) => setAddForm((prev) => ({ ...prev, [k]: v }))}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Publish</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : careers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">No open positions.</TableCell>
                  </TableRow>
                ) : (
                  careers.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-sm text-muted-foreground">{c.type}</div>
                      </TableCell>
                      <TableCell>{c.department}</TableCell>
                      <TableCell>{c.location}</TableCell>
                      <TableCell>{c.experience}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditItem(c)}>
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(c.id)}
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

          <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Edit Position</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEdit}>
                {editItem && (
                  <CareerForm
                    data={editItem}
                    onChange={(k, v) => setEditItem((prev) => prev ? { ...prev, [k]: v } : null)}
                  />
                )}
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditItem(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
