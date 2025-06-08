"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function GoogleCallbackLogic() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const redirect = searchParams.get("redirect")
    if (token) {
      localStorage.setItem("authToken", token)
      if (redirect) {
        // Garante que o redirect é seguro (evita open redirect)
        if (redirect.startsWith("/")) {
          router.replace(redirect)
        } else {
          router.replace("/lojas")
        }
      } else {
        router.replace("/lojas")
      }
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Processando login...</p>
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
