import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - Zé da Fruta",
  description: "Acesso administrativo - Área restrita",
  robots: "noindex, nofollow", // Prevent search engine indexing
}

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
