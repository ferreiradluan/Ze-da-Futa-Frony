"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { authService } from "@/lib/auth"

function GoogleCallbackLogic() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const processCallback = async () => {      const token = searchParams.get("token")
      const redirect = searchParams.get("redirect")
      
      if (token) {
        try {
          // Store token using auth service
          authService.setToken(token)
          
          // Fetch complete user profile from backend
          const userProfile = await authService.fetchUserProfile()
          
          // Redirect to appropriate page
          if (redirect && redirect.startsWith("/")) {
            router.replace(redirect)
          } else {
            // Redirect based on user role
            switch (userProfile.role) {
              case "ADMIN":
                router.replace("/admin")
                break
              case "LOJISTA":
                router.replace("/lojista")
                break
              case "ENTREGADOR":
                router.replace("/entregador")
                break
              case "CLIENTE":
              default:
                router.replace("/lojas")
                break
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
          // Fallback to basic redirect
          router.replace("/lojas")
        }
      } else {
        // No token, redirect to login
        router.replace("/login")
      }
    }
    
    processCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F28500] mx-auto"></div>
        <p className="mt-2">Processando login...</p>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Processando login...</p></div>}>
      <GoogleCallbackLogic />
    </Suspense>
  )
}
