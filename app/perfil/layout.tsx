'use client'
import type React from "react"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import { ProtectedRoute } from "@/components/protected-route"
import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

// Importa o Header como client component dinamicamente para evitar problemas de serialização
const Header = dynamic(() => import("@/components/header").then(mod => mod.Header), { ssr: false })

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, user } = useAuth()

  useEffect(() => {
    // Se não estiver autenticado e não estiver carregando, redireciona para login
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login"
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header onCartClick={() => {}} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  )
}
