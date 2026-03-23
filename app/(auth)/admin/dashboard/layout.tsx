import { RefreshProvider } from "@/components/refresh-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RefreshProvider>{children}</RefreshProvider>
}
