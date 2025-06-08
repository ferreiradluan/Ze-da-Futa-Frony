import type React from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fornece uma função dummy para onCartClick, pois o Header exige essa prop
  return (
    <ProtectedRoute>
      <Header onCartClick={() => {}} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </ProtectedRoute>
  )
}
