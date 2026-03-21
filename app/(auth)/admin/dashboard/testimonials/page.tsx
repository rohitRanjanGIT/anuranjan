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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon, PlusSignIcon, StarIcon } from "@hugeicons/core-free-icons"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
  rating: number | null
  source: string | null
}

const emptyTestimonial = {
  name: "",
  role: "",
  content: "",
  avatar: "",
  rating: 5,
  source: "manual",
}

const TestimonialForm = ({
  data,
  onChange,
}: {
  data: typeof emptyTestimonial | Testimonial
  onChange: (key: string, value: any) => void
}) => (
  <div className="grid gap-4 py-4">
    <div className="grid gap-2">
      <Label htmlFor="name">Reviewer Name</Label>
      <Input
        id="name"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
        required
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="role">Role / Company</Label>
      <Input
        id="role"
        value={data.role}
        onChange={(e) => onChange("role", e.target.value)}
        required
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="avatar">Avatar URL</Label>
      <Input
        id="avatar"
        value={data.avatar}
        onChange={(e) => onChange("avatar", e.target.value)}
        placeholder="https://..."
        required
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="content">Review Content</Label>
      <Textarea
        id="content"
        value={data.content}
        onChange={(e) => onChange("content", e.target.value)}
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={data.rating || 5}
          onChange={(e) => onChange("rating", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="source">Source</Label>
        <Select value={data.source || "manual"} onValueChange={(val) => onChange("source", val)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="google">Google Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addForm, setAddForm] = useState(emptyTestimonial)

  const [editItem, setEditItem] = useState<Testimonial | null>(null)

  const fetchTestimonials = async () => {
    setLoading(true)
    const res = await fetch("/api/testimonials")
    const data = await res.json()
    setTestimonials(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    })
    setIsAddOpen(false)
    setAddForm(emptyTestimonial)
    fetchTestimonials()
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editItem) return
    await fetch(`/api/testimonials/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    })
    setEditItem(null)
    fetchTestimonials()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
    fetchTestimonials()
  }

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
              <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
              <p className="text-muted-foreground">Manage client reviews and feedback.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <HugeiconsIcon icon={PlusSignIcon} />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Testimonial</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd}>
                  <TestimonialForm
                    data={addForm}
                    onChange={(k, v) => setAddForm((prev) => ({ ...prev, [k]: v }))}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">No testimonials found.</TableCell>
                  </TableRow>
                ) : (
                  testimonials.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{t.content}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {t.rating} <HugeiconsIcon icon={StarIcon} className="size-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{t.source}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEditItem(t)}>
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(t.id)}
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEdit}>
                {editItem && (
                  <TestimonialForm
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
