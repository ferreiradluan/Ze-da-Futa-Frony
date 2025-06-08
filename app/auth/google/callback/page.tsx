"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GoogleCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Tenta capturar o token do JSON exibido na tela
    try {
      // Pega o texto da página (body)
      const pre = document.querySelector("pre")
      if (pre) {
        const json = JSON.parse(pre.textContent || "{}")
        if (json.token || json.access_token) {
          const token = json.token || json.access_token
          localStorage.setItem("authToken", token)
          // Redireciona para a loja
          router.replace("/lojas")
        }
      }
    } catch (e) {
      // Não conseguiu capturar token
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Processando login...</p>
      </div>
    </div>
  )
}
