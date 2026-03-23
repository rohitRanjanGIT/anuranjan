"use client"

import { useEffect, useState, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, Delete02Icon, PlusSignIcon, Upload04Icon } from "@hugeicons/core-free-icons"

interface Logo {
  id: number
  name: string
  src: string
  href: string | null
}

const emptyForm = {
  name: "",
  href: "",
  file: null as File | null,
}

export default function LogosPage() {
  const [logos, setLogos] = useState<Logo[]>([])
  const [loading, setLoading] = useState(true)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editItem, setEditItem] = useState<Logo | null>(null)
  const [formState, setFormState] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchLogos = async () => {
    setLoading(true)
    const res = await fetch("/api/logos")
    const data = await res.json()
    setLogos(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    fetchLogos()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name) return
    if (!editItem && !formState.file) {
      alert("A logo image is required.")
      return
    }

    setUploading(true)
    try {
      let imageUrl: string | null = null
      if (formState.file) {
        const formData = new FormData()
        formData.append("file", formState.file)
        formData.append("folder", "anuranjan/logos")
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed")
        imageUrl = uploadData.secure_url
      }

      const payload = {
        name: formState.name,
        href: formState.href || null,
        ...(imageUrl && { src: imageUrl }),
      }

      const method = editItem ? "PUT" : "POST"
      const url = editItem ? `/api/logos/${editItem.id}` : "/api/logos"

      const saveRes = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!saveRes.ok) throw new Error("Failed to save logo")

      setIsAddOpen(false)
      setEditItem(null)
      setFormState(emptyForm)
      fetchLogos()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error saving logo")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this logo?")) return
    await fetch(`/api/logos/${id}`, { method: "DELETE" })
    fetchLogos()
  }

  const openAdd = () => {
    setFormState(emptyForm)
    setEditItem(null)
    setIsAddOpen(true)
  }

  const openEdit = (logo: Logo) => {
    setFormState({ name: logo.name, href: logo.href || "", file: null })
    setEditItem(logo)
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
              <h1 className="text-2xl font-bold tracking-tight">Client Logos</h1>
              <p className="text-muted-foreground">Manage logos shown in the homepage clients section.</p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={(open) => {
              if (!open) { setEditItem(null); setFormState(emptyForm) }
              setIsAddOpen(open)
            }}>
              <Button onClick={openAdd}>
                <HugeiconsIcon icon={PlusSignIcon} />
                Add Logo
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editItem ? "Edit Logo" : "Add Client Logo"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSave} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Logo Image {editItem && "(Leave empty to keep current)"}</Label>
                    {editItem && !formState.file && (
                      <div className="mb-2">
                        <img src={editItem.src} alt={editItem.name} className="h-16 object-contain rounded-md border bg-muted/20 p-2" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full border-dashed ${editItem ? "h-12" : "h-20"}`}
                    >
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        {!editItem && <HugeiconsIcon icon={Upload04Icon} className="size-5" />}
                        <span>{formState.file ? formState.file.name : (editItem ? "Click to replace" : "Click to select logo image")}</span>
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

                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Tata Projects"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="href">Website URL (optional)</Label>
                    <Input
                      id="href"
                      value={formState.href}
                      onChange={(e) => setFormState(p => ({ ...p, href: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} disabled={uploading}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!formState.name || (!editItem && !formState.file) || uploading}>
                      {uploading ? "Saving..." : "Save Logo"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-20">Logo</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : logos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No client logos yet. Add your first one above.
                    </TableCell>
                  </TableRow>
                ) : (
                  logos.map((logo) => (
                    <TableRow key={logo.id}>
                      <TableCell>
                        <img src={logo.src} alt={logo.name} className="h-10 w-16 object-contain rounded border bg-muted/20 p-1" />
                      </TableCell>
                      <TableCell className="font-medium">{logo.name}</TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[200px]">
                        {logo.href || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(logo)}>
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(logo.id)}
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
    </SidebarProvider>
  )
}
