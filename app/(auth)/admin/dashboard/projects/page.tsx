"use client"

import { useEffect, useState, useRef } from "react"
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
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon, PlusSignIcon, Upload04Icon, CheckmarkCircle01Icon, Loading03Icon, ArrowLeft01Icon, ArrowRight01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { projectHref } from "@/lib/utils"

interface Category {
  id: number
  name: string
}

interface GalleryImage {
  id: number
  src: string
  title: string
}

interface Project {
  id: number
  title: string
  description: string | null
  content: string | null
  type: string
  status: string
  year: string | null
  location: string | null
  image: string
  homepagePortfolio: boolean
  category: { id: number; name: string }
  categoryId: number
  images: { id: number; src: string; title: string }[]
}

const emptyForm = {
  title: "",
  description: "",
  content: "",
  categoryId: "",
  type: "",
  year: "",
  location: "",
  status: "ONGOING",
  homepagePortfolio: false,
  file: null as File | null,
  selectedImageIds: [] as number[],
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  const [filterCategory, setFilterCategory] = useState("ALL")
  const [filterStatus, setFilterStatus] = useState("ALL")

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editItem, setEditItem] = useState<Project | null>(null)
  
  const [formState, setFormState] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchData = async () => {
    setLoading(true)
    const [projRes, catRes, imgRes] = await Promise.all([
      fetch(`/api/projects?page=${page}&limit=${limit}&categoryId=${filterCategory}&status=${filterStatus}`),
      fetch("/api/categories"),
      fetch("/api/images")
    ])
    
    const projData = await projRes.json()
    if (projData.meta) {
      setProjects(projData.data)
      setTotalPages(projData.meta.totalPages || 1)
    } else {
      setProjects(Array.isArray(projData) ? projData : [])
      setTotalPages(1) // Fallback
    }

    setCategories(await catRes.json())
    setGalleryImages(await imgRes.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [page, filterCategory, filterStatus]) // Refetch when dependencies change

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filterCategory, filterStatus])

  const [inlineUploading, setInlineUploading] = useState(false)
  const multipleFileInputRef = useRef<HTMLInputElement>(null)

  const handleInlineUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    if (!formState.categoryId) {
      alert("Please select a Category for the project first before uploading gallery images.")
      return
    }

    setInlineUploading(true)
    try {
      const newImageIds: number[] = []
      const uploadedImages: GalleryImage[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        // 1. Upload to Cloudinary
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "anuranjan/gallery")

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error || `Failed to upload ${file.name}`)

        // 2. Save to DB Images table
        const saveRes = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: uploadData.secure_url,
            width: uploadData.width,
            height: uploadData.height,
            title: file.name.replace(/\.[^/.]+$/, ""), // Use filename without extension as title
            categoryId: Number(formState.categoryId),
            heroCarousel: false,
          }),
        })

        if (!saveRes.ok) throw new Error(`Failed to save ${file.name} to database`)
        const newDbImg = await saveRes.json()

        uploadedImages.push({
          id: newDbImg.id,
          src: newDbImg.src,
          title: newDbImg.title,
        })
        newImageIds.push(newDbImg.id)
      }

      // Update UI state
      setGalleryImages(prev => [...uploadedImages, ...prev])
      setFormState(prev => ({
        ...prev,
        selectedImageIds: [...prev.selectedImageIds, ...newImageIds]
      }))

      // Reset file input
      if (multipleFileInputRef.current) multipleFileInputRef.current.value = ""

    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Error uploading multiple images")
    } finally {
      setInlineUploading(false)
    }
  }

  const processUpload = async (): Promise<string | null> => {
    if (!formState.file) return null
    const formData = new FormData()
    formData.append("file", formState.file)
    formData.append("folder", "anuranjan/projects")

    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData })
    const uploadData = await uploadRes.json()
    if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed")
    return uploadData.secure_url
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.title || !formState.categoryId || !formState.type) return
    if (!editItem && !formState.file) {
      alert("A thumbnail image is required for new projects.")
      return
    }

    setUploading(true)
    try {
      const newImageUrl = await processUpload()

      const payload = {
        title: formState.title,
        description: formState.description,
        content: formState.content,
        categoryId: formState.categoryId,
        type: formState.type,
        year: formState.year,
        location: formState.location,
        status: formState.status,
        homepagePortfolio: formState.homepagePortfolio,
        images: formState.selectedImageIds, 
        ...(newImageUrl && { image: newImageUrl }), 
      }

      const method = editItem ? "PUT" : "POST"
      const url = editItem ? `/api/projects/${editItem.id}` : "/api/projects"

      const saveRes = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!saveRes.ok) throw new Error("Database save failed")

      setIsAddOpen(false)
      setEditItem(null)
      setFormState(emptyForm)
      fetchData()
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Failed to save project")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    if (projects.length === 1 && page > 1) setPage(page - 1)
    else fetchData()
  }

  const toggleStatus = async (p: Project) => {
    const newStatus = p.status === "COMPLETED" ? "ONGOING" : "COMPLETED"
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchData()
  }

  const toggleFeatured = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homepagePortfolio: !p.homepagePortfolio }),
    })
    fetchData()
  }

  const openAdd = () => {
    setFormState(emptyForm)
    setEditItem(null)
    setIsAddOpen(true)
  }

  const openEdit = (p: Project) => {
    setFormState({
      title: p.title,
      description: p.description || "",
      content: p.content || "",
      categoryId: p.categoryId.toString(),
      type: p.type,
      year: p.year || "",
      location: p.location || "",
      status: p.status,
      homepagePortfolio: p.homepagePortfolio,
      file: null, 
      selectedImageIds: p.images ? p.images.map(img => img.id) : [],
    })
    setEditItem(p)
    setIsAddOpen(true)
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
              <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
              <p className="text-muted-foreground">Manage your portfolio items.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>

              {categories.length === 0 ? (
                <Button disabled variant="outline">Create a Category First</Button>
              ) : (
                <Dialog open={isAddOpen} onOpenChange={(open) => {
                  if (!open) { setEditItem(null); setFormState(emptyForm); }
                  setIsAddOpen(open)
                }}>
                  <Button onClick={openAdd}>
                    <HugeiconsIcon icon={PlusSignIcon} />
                    Create Project
                  </Button>
                <DialogContent className="flex flex-col gap-0 p-0 overflow-hidden w-[96vw] sm:max-w-5xl xl:max-w-6xl max-h-[92vh]">
                  <DialogHeader className="px-6 py-5 border-b shrink-0 text-left">
                    <DialogTitle className="text-lg">{editItem ? "Edit Project" : "Create New Project"}</DialogTitle>
                    <DialogDescription>
                      {editItem
                        ? "Update the media, details and visibility for this portfolio item."
                        : "Add a new portfolio item. Fields marked with * are required."}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSave} className="flex flex-col min-h-0 flex-1">
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">

                        {/* ─── LEFT: Media ───────────────────────────── */}
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold">Media</h3>
                            <p className="text-xs text-muted-foreground">
                              The thumbnail appears in listings; the gallery images appear on the project detail page.
                            </p>
                          </div>

                          {/* Thumbnail */}
                          <div className="space-y-2">
                            <Label>
                              Main Thumbnail Image{!editItem && " *"}
                              {editItem && <span className="ml-1 font-normal text-muted-foreground">(leave empty to keep current)</span>}
                            </Label>
                            {editItem && !formState.file && (
                              <img src={editItem.image} alt="Current thumbnail" className="h-28 w-full max-w-xs object-cover rounded-md border" />
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full h-20 border-dashed"
                            >
                              <div className="flex flex-col items-center gap-1 text-muted-foreground text-sm">
                                <HugeiconsIcon icon={Upload04Icon} className="size-5" />
                                <span>{formState.file ? formState.file.name : (editItem ? "Click to replace thumbnail" : "Click to select a file")}</span>
                              </div>
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => setFormState(p => ({ ...p, file: e.target.files?.[0] || null }))}
                            />
                          </div>

                          {/* Gallery */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <Label>Detail Gallery Images</Label>
                              <div>
                                <input
                                  ref={multipleFileInputRef}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={handleInlineUpload}
                                  disabled={!formState.categoryId || inlineUploading}
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  disabled={!formState.categoryId || inlineUploading}
                                  onClick={() => multipleFileInputRef.current?.click()}
                                  title={!formState.categoryId ? "Select a category first to upload images" : "Upload new images"}
                                >
                                  <HugeiconsIcon icon={Upload04Icon} className="size-4 mr-1" />
                                  {inlineUploading ? "Uploading..." : "Upload New Images"}
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Click an image to attach or detach it from this project.
                            </p>
                            {!formState.categoryId && (
                              <p className="text-xs text-orange-500">Select a Category first to upload new gallery images.</p>
                            )}
                            <div className="h-64 overflow-y-auto border rounded-md p-2 grid grid-cols-4 sm:grid-cols-5 gap-2 bg-muted/20">
                              {galleryImages.map((img) => {
                                const isSelected = formState.selectedImageIds.includes(img.id)
                                return (
                                  <div
                                    key={img.id}
                                    className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-primary/50'}`}
                                    onClick={() => {
                                      setFormState(prev => ({
                                        ...prev,
                                        selectedImageIds: isSelected
                                          ? prev.selectedImageIds.filter(id => id !== img.id)
                                          : [...prev.selectedImageIds, img.id]
                                      }))
                                    }}
                                  >
                                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                                    {isSelected && (
                                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                                        <HugeiconsIcon icon={CheckmarkCircle01Icon} className="size-6 text-primary" />
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                              {galleryImages.length === 0 && (
                                <div className="col-span-full flex items-center justify-center p-4 min-h-24 text-sm text-muted-foreground border-dashed border-2 rounded-md">
                                  No gallery images available yet. Upload new ones here to attach to this project.
                                </div>
                              )}
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">
                              Selected: {formState.selectedImageIds.length} image(s)
                            </p>
                          </div>
                        </div>

                        {/* ─── RIGHT: Project information ─────────────── */}
                        <div className="space-y-5">
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold">Project Information</h3>
                            <p className="text-xs text-muted-foreground">
                              Basic details and how this project appears on the website.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                              id="title"
                              value={formState.title}
                              onChange={(e) => setFormState(p => ({ ...p, title: e.target.value }))}
                              placeholder="e.g. Modern Villa"
                              required
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Category *</Label>
                              <Select
                                value={formState.categoryId}
                                onValueChange={(val) => setFormState(p => ({ ...p, categoryId: val }))}
                                required
                              >
                                <SelectTrigger className="w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
                                <SelectContent>
                                  {categories.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Status</Label>
                              <Select
                                value={formState.status}
                                onValueChange={(val) => setFormState(p => ({ ...p, status: val }))}
                              >
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                                  <SelectItem value="COMPLETED">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="type">Type *</Label>
                              <Input
                                id="type"
                                value={formState.type}
                                onChange={(e) => setFormState(p => ({ ...p, type: e.target.value }))}
                                placeholder="e.g. Residential Complex"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="year">Year</Label>
                              <Input
                                id="year"
                                value={formState.year}
                                onChange={(e) => setFormState(p => ({ ...p, year: e.target.value }))}
                                placeholder="e.g. 2024"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={formState.location}
                              onChange={(e) => setFormState(p => ({ ...p, location: e.target.value }))}
                              placeholder="e.g. Mumbai, Maharashtra"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                              id="description"
                              value={formState.description}
                              onChange={(e) => setFormState(p => ({ ...p, description: e.target.value }))}
                              rows={3}
                              placeholder="A brief one or two line summary. Shown on cards, listings and as the overview intro."
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                              General summary used in listings, cards and page metadata.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="content">Detail Page Content</Label>
                            <Textarea
                              id="content"
                              value={formState.content}
                              onChange={(e) => setFormState(p => ({ ...p, content: e.target.value }))}
                              rows={8}
                              placeholder="In-depth write-up shown on the dedicated project page — scope, engineering approach, materials, challenges, outcomes, etc. Line breaks are preserved."
                            />
                            <p className="text-[0.8rem] text-muted-foreground">
                              Long-form content dedicated to the project detail page. Leave the short description for summaries.
                            </p>
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-3 shadow-xs">
                            <div className="space-y-0.5 pr-4">
                              <Label>Feature on Homepage</Label>
                              <p className="text-[0.8rem] text-muted-foreground">
                                Display this project in the homepage primary portfolio grid.
                              </p>
                            </div>
                            <Switch
                              checked={formState.homepagePortfolio}
                              onCheckedChange={(checked) => setFormState(p => ({ ...p, homepagePortfolio: checked }))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="px-6 py-4 border-t bg-muted/30 shrink-0">
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} disabled={uploading}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={!formState.title || !formState.categoryId || (!editItem && !formState.file) || uploading}>
                        {uploading ? "Saving..." : "Save Project"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            </div>
          </div>

          <div className="rounded-md border flex-1 flex flex-col">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">No projects found.</TableCell>
                  </TableRow>
                ) : (
                  projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-10 h-10 rounded-md object-cover border bg-muted" 
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground">{p.location || "N/A"} • {p.year || "N/A"}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{p.category?.name}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className="gap-1 cursor-pointer hover:bg-muted" 
                          onClick={() => toggleStatus(p)}
                          title="Click to toggle status"
                        >
                          {p.status === "COMPLETED" ? (
                            <HugeiconsIcon icon={CheckmarkCircle01Icon} className="size-3 fill-green-500 text-green-500" />
                          ) : (
                            <HugeiconsIcon icon={Loading03Icon} className="size-3 text-orange-500" />
                          )}
                          {p.status === "COMPLETED" ? "Completed" : "Ongoing"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={p.homepagePortfolio} 
                          onCheckedChange={() => toggleFeatured(p)} 
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            title="View live page"
                          >
                            <a href={projectHref(p)} target="_blank" rel="noopener noreferrer">
                              <HugeiconsIcon icon={LinkSquare02Icon} className="size-4" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(p)}
                          >
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
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
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                >
                  Next
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
