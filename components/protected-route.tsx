"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "ADMIN" | "CLIENTE" | "LOJISTA" | "ENTREGADOR"
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRole, fallbackPath = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath)
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        switch (user?.role) {
          case "ADMIN":
            router.push("/admin")
            break
          case "LOJISTA":
            router.push("/lojista")
            break
          case "ENTREGADOR":
            router.push("/entregador")
            break
          case "CLIENTE":
          default:
            router.push("/lojas")
            break
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#F28500]" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
