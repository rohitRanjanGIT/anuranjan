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
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, ArrowLeft01Icon, ArrowRight01Icon, ViewIcon, Mail01Icon, MailOpen01Icon } from "@hugeicons/core-free-icons"

interface Enquiry {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  const [viewItem, setViewItem] = useState<Enquiry | null>(null)

  const fetchEnquiries = async () => {
    setLoading(true)
    const res = await fetch(`/api/enquiries?page=${page}&limit=${limit}`)
    const data = await res.json()
    if (data.meta) {
      setEnquiries(data.data)
      setTotalPages(data.meta.totalPages || 1)
    } else {
      setEnquiries(Array.isArray(data) ? data : [])
      setTotalPages(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEnquiries()
  }, [page])

  const handleView = async (enquiry: Enquiry) => {
    setViewItem(enquiry)
    if (!enquiry.read) {
      await fetch(`/api/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, read: true } : e))
      )
    }
  }

  const handleToggleRead = async (enquiry: Enquiry) => {
    await fetch(`/api/enquiries/${enquiry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !enquiry.read }),
    })
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiry.id ? { ...e, read: !e.read } : e))
    )
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" })
    if (enquiries.length === 1 && page > 1) setPage(page - 1)
    else fetchEnquiries()
  }

  const subjectLabels: Record<string, string> = {
    general: "General Inquiry",
    project: "New Project",
    partnership: "Partnership",
    careers: "Careers",
    other: "Other",
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
              <h1 className="text-2xl font-bold tracking-tight">Enquiries</h1>
              <p className="text-muted-foreground">View and manage contact form submissions.</p>
            </div>
          </div>

          <div className="rounded-md border flex flex-col">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
                  </TableRow>
                ) : enquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">No enquiries found.</TableCell>
                  </TableRow>
                ) : (
                  enquiries.map((e) => (
                    <TableRow key={e.id} className={!e.read ? "bg-primary/5" : ""}>
                      <TableCell>
                        {!e.read && (
                          <span className="block w-2 h-2 rounded-full bg-primary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${!e.read ? "font-semibold" : ""}`}>{e.name}</div>
                        <div className="text-sm text-muted-foreground">{e.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subjectLabels[e.subject] || e.subject}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">{e.message}</TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleView(e)} title="View">
                            <HugeiconsIcon icon={ViewIcon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleRead(e)}
                            title={e.read ? "Mark as unread" : "Mark as read"}
                          >
                            <HugeiconsIcon icon={e.read ? MailOpen01Icon : Mail01Icon} className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDelete(e.id)}
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
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                >
                  Next
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* View Enquiry Dialog */}
          <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Enquiry Details</DialogTitle>
              </DialogHeader>
              {viewItem && (
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{viewItem.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{viewItem.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{viewItem.phone || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Subject</p>
                      <Badge variant="outline">{subjectLabels[viewItem.subject] || viewItem.subject}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Message</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/50 rounded-lg p-4">{viewItem.message}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Received</p>
                    <p className="text-sm">
                      {new Date(viewItem.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewItem(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
