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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon, PlusSignIcon, Upload04Icon, Image01Icon, StarIcon, SearchingIcon } from "@hugeicons/core-free-icons"

interface Category {
  id: number
  name: string
}

interface GalleryImage {
  id: number
  src: string
  width: number
  height: number
  title: string
  categoryId: number
  heroCarousel: boolean
  category: { name: string }
}

const emptyForm = {
  title: "",
  categoryId: "",
  heroCarousel: false,
  file: null as File | null,
}

export default function ImagesPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formState, setFormState] = useState(emptyForm)
  const [editItem, setEditItem] = useState<GalleryImage | null>(null)
  
  // For popping out / previewing images
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // For filtering
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [filterHero, setFilterHero] = useState("ALL")

  const fetchData = async () => {
    setLoading(true)
    
    const qs = new URLSearchParams()
    if (filterCategory !== "ALL") qs.set("categoryId", filterCategory)
    if (filterHero === "TRUE") qs.set("hero", "true")

    const [imgRes, catRes] = await Promise.all([
      fetch(`/api/images?${qs.toString()}`),
      fetch("/api/categories")
    ])
    setImages(await imgRes.json())
    setCategories(await catRes.json())
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [filterCategory, filterHero])

  const processUpload = async (): Promise<{ secure_url: string; width: number; height: number } | null> => {
    if (!formState.file) return null
    const formData = new FormData()
    formData.append("file", formState.file)
    formData.append("folder", "anuranjan/gallery")

    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData })
    const uploadData = await uploadRes.json()
    if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed")
    
    return {
      secure_url: uploadData.secure_url,
      width: uploadData.width,
      height: uploadData.height,
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.title || !formState.categoryId) return
    if (!editItem && !formState.file) {
      alert("An image file is required for new uploads.")
      return
    }

    setUploading(true)
    try {
      const uploadData = await processUpload()

      const payload = {
        title: formState.title,
        categoryId: Number(formState.categoryId),
        heroCarousel: formState.heroCarousel,
        ...(uploadData && { 
          src: uploadData.secure_url,
          width: uploadData.width,
          height: uploadData.height,
        }), 
      }

      const method = editItem ? "PUT" : "POST"
      const url = editItem ? `/api/images/${editItem.id}` : "/api/images"

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
      alert(error instanceof Error ? error.message : "Failed to save image")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image? Projects using it will lose this image reference.")) return
    await fetch(`/api/images/${id}`, { method: "DELETE" })
    fetchData()
  }

  const toggleHero = async (img: GalleryImage) => {
    await fetch(`/api/images/${img.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroCarousel: !img.heroCarousel }),
    })
    fetchData()
  }

  const openAdd = () => {
    setFormState(emptyForm)
    setEditItem(null)
    setIsAddOpen(true)
  }

  const openEdit = (img: GalleryImage) => {
    setFormState({
      title: img.title,
      categoryId: img.categoryId.toString(),
      heroCarousel: img.heroCarousel,
      file: null, 
    })
    setEditItem(img)
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
              <h1 className="text-2xl font-bold tracking-tight">Image Gallery</h1>
              <p className="text-muted-foreground">Manage gallery images in a table view.</p>
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
              
              <Select value={filterHero} onValueChange={setFilterHero}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Images</SelectItem>
                  <SelectItem value="TRUE">Hero Carousel</SelectItem>
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
                    Upload Image
                  </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editItem ? "Edit Image Properties" : "Upload New Image"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Image File {editItem && "(Leave empty to keep current)"}</Label>
                      {editItem && !formState.file && (
                        <div className="mb-2">
                          <img src={editItem.src} alt="Current image" className="h-32 object-contain rounded-md border bg-muted/20" />
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full border-dashed ${editItem ? 'h-12' : 'h-24'}`}
                        >
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            {!editItem && <HugeiconsIcon icon={Upload04Icon} className="size-6" />}
                            <span>{formState.file ? formState.file.name : (editItem ? "Click to replace file" : "Click to select a file")}</span>
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
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (Alt Text)</Label>
                      <Input
                        id="title"
                        value={formState.title}
                        onChange={(e) => setFormState(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Modern Office Interior"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        value={formState.categoryId} 
                        onValueChange={(val) => setFormState(p => ({ ...p, categoryId: val }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-xs">
                      <div className="space-y-0.5">
                        <Label>Homepage Hero Carousel</Label>
                        <p className="text-[0.8rem] text-muted-foreground">
                          Display this image prominently on the homepage hero section (Max 6 total).
                        </p>
                      </div>
                      <Switch
                        checked={formState.heroCarousel}
                        onCheckedChange={(checked) => setFormState(p => ({ ...p, heroCarousel: checked }))}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} disabled={uploading}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={( !editItem && !formState.file ) || !formState.title || !formState.categoryId || uploading}>
                        {uploading ? "Saving..." : "Save Image"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            </div>
          </div>

          <div className="rounded-md border flex-1">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-24">Thumbnail</TableHead>
                  <TableHead>Title (Alt-text)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Dimensions</TableHead>
                  <TableHead>Hero Flag</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">Loading images...</TableCell>
                  </TableRow>
                ) : images.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                         <HugeiconsIcon icon={Image01Icon} className="size-8 mb-2 opacity-50" />
                         <p>No images uploaded yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  images.map((img) => (
                    <TableRow key={img.id}>
                      <TableCell>
                        <div 
                          className="relative cursor-pointer group rounded-md border overflow-hidden w-16 h-16 bg-muted/20 flex items-center justify-center transition-all hover:ring-2 hover:ring-primary/50"
                          onClick={() => setPreviewImage(img.src)}
                        >
                          <img 
                            src={img.src} 
                            alt={img.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <HugeiconsIcon icon={SearchingIcon} className="text-white size-5" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate" title={img.title}>
                        {img.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{img.category?.name}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {img.width} × {img.height}
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={img.heroCarousel} 
                          onCheckedChange={() => toggleHero(img)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEdit(img)}
                            title="Edit properties"
                          >
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(img.id)}
                            title="Delete image"
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
          
        </div>
      </SidebarInset>

      {/* Full-screen Image Preview Popup */}
      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] p-1 pt-8 bg-transparent border-none shadow-none flex flex-col items-center justify-center">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          {previewImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={previewImage} 
                alt="Enlarged preview" 
                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl bg-black/50"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
