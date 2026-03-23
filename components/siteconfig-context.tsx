"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface SiteConfigData {
  email: string
  addresslink: string
  address1: string
  address2: string
  city: string
  state: string
  phone: string
  mobile: string
}

const defaultConfig: SiteConfigData = {
  email: "",
  addresslink: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  phone: "",
  mobile: "",
}

const SiteConfigContext = createContext<SiteConfigData>(defaultConfig)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfigData>(defaultConfig)

  useEffect(() => {
    fetch("/api/siteconfig")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setConfig({ ...defaultConfig, ...data })
      })
      .catch(() => {})
  }, [])

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  return useContext(SiteConfigContext)
}
