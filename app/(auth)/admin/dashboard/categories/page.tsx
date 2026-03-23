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
import { Edit02Icon, Delete02Icon, PlusSignIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface Category {
  id: number
  name: string
  _count: { projects: number; images: number }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addName, setAddName] = useState("")

  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [editName, setEditName] = useState("")

  const fetchCategories = async () => {
    setLoading(true)
    const res = await fetch(`/api/categories?page=${page}&limit=${limit}`)
    const data = await res.json()
    if (data.meta) {
      setCategories(data.data)
      setTotalPages(data.meta.totalPages || 1)
    } else {
      setCategories(Array.isArray(data) ? data : [])
      setTotalPages(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [page])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addName.trim()) return
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: addName }),
    })
    setIsAddOpen(false)
    setAddName("")
    fetchCategories()
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editName.trim() || !editCategory) return
    await fetch(`/api/categories/${editCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    })
    setEditCategory(null)
    fetchCategories()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    if (categories.length === 1 && page > 1) setPage(page - 1)
    else fetchCategories()
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
              <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
              <p className="text-muted-foreground">
                Manage categories for your projects and gallery images.
              </p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <HugeiconsIcon icon={PlusSignIcon} />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      placeholder="e.g. Commercial"
                      autoFocus
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Category</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border flex flex-col">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Projects count</TableHead>
                  <TableHead>Images count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">No categories found.</TableCell>
                  </TableRow>
                ) : (
                  categories.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c._count?.projects || 0}</TableCell>
                      <TableCell>{c._count?.images || 0}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditCategory(c)
                              setEditName(c.name)
                            }}
                          >
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(c.id)}
                            disabled={(c._count?.projects || 0) > 0 || (c._count?.images || 0) > 0}
                            title={
                              (c._count?.projects || 0) > 0 || (c._count?.images || 0) > 0
                                ? "Cannot delete category with associated projects or images"
                                : "Delete category"
                            }
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

          <Dialog open={!!editCategory} onOpenChange={(open) => !open && setEditCategory(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEdit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditCategory(null)}>
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
