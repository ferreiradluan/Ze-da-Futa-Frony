"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useSearchParams } from "next/navigation"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [error, setError] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for error in URL params
    const urlError = searchParams.get("error")
    if (urlError === "auth_failed") {
      setError("Falha na autenticação. Tente novamente.")
    }
  }, [searchParams])

  const handleGoogleLogin = async () => {
    try {
      setError("")
      await login()
    } catch (error) {
      setError("Falha ao iniciar login com Google. Tente novamente.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#F28500]" />
          <p className="text-gray-600">Processando login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image src="/logo.png" alt="Zé da Fruta" width={200} height={100} className="h-20 w-auto cursor-pointer" />
            </Link>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Main Content */}
          <div className="text-center space-y-6">
            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                Frutas frescas a um clique de distância
              </h1>
              <h3 className="text-lg md:text-xl text-gray-600 font-light">
                Faça login com sua conta Google para começar
              </h3>
            </div>

            {/* Google Login Button */}
            <div className="pt-4">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl py-4 px-6 text-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Entrar com Google
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500 mt-6">
              <p>
                Ao continuar, você concorda com nossos{" "}
                <Link href="/termos" className="text-[#F28500] hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-[#F28500] hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
