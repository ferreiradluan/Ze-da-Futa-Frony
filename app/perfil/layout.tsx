import type React from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Header onCartClick={() => { /* TODO: implement cart click handler */ }} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </ProtectedRoute>
  )
}
