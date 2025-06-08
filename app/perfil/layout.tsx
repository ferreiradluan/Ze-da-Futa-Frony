'use client'
import type React from "react"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import { ProtectedRoute } from "@/components/protected-route"

// Importa o Header como client component dinamicamente para evitar problemas de serialização
const Header = dynamic(() => import("@/components/header").then(mod => mod.Header), { ssr: false })

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Header onCartClick={() => {}} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </ProtectedRoute>
  )
}
