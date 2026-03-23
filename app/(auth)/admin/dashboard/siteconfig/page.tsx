"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // Since they are using sonner for notifications as per package.json

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    addresslink: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    phone: "",
    mobile: "",
  })

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/siteconfig")
        const data = await res.json()
        if (data && !data.error && Object.keys(data).length > 0) {
          setFormData({
            email: data.email || "",
            addresslink: data.addresslink || "",
            address1: data.address1 || "",
            address2: data.address2 || "",
            city: data.city || "",
            state: data.state || "",
            phone: data.phone || "",
            mobile: data.mobile || "",
          })
        }
      } catch (err) {
        toast.error("Failed to load site config")
      }
      setLoading(false)
    }
    fetchConfig()
  }, [])

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/siteconfig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to save")
      toast.success("Site configuration saved successfully!")
    } catch (err) {
      toast.error("Error saving site config")
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
            <h1 className="text-2xl font-bold tracking-tight">Site Configuration</h1>
            <p className="text-muted-foreground">Manage global contact and address settings.</p>
          </div>

          <div className="rounded-md border p-6 bg-card max-w-3xl">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addresslink">Map/Address Link</Label>
                  <Input
                    id="addresslink"
                    type="url"
                    value={formData.addresslink}
                    onChange={(e) => handleChange("addresslink", e.target.value)}
                    placeholder="https://maps.google.com/..."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input
                    id="address1"
                    value={formData.address1}
                    onChange={(e) => handleChange("address1", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={formData.address2}
                    onChange={(e) => handleChange("address2", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end mt-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
