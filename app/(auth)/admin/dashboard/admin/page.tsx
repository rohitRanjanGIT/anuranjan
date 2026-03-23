"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" 

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save")
      }
      toast.success("Admin credentials updated safely!")
      setFormData({ username: "", password: "" })
    } catch (err: any) {
      toast.error(err.message || "Error saving admin credentials")
    }
    setSaving(false)
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
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Accounts</h1>
            <p className="text-muted-foreground">Manage dashboard logins and set new passwords.</p>
          </div>

          <div className="rounded-md border p-6 bg-card max-w-xl">
             <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Enter the username"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <p className="text-xs text-muted-foreground">This will update the password if the username already belongs to an admin.</p>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Updating..." : "Update Credentials"}
                  </Button>
                </div>
              </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
