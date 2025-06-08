"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Store, Bike } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"
import { Footer } from "@/components/footer"

export default function OnboardingPage() {
  const { loginPartner, isLoading } = useAuth()
  const [selectedType, setSelectedType] = useState<"lojista" | "entregador" | null>(null)

  const handlePartnerSignup = async (type: "lojista" | "entregador") => {
    try {
      setSelectedType(type)
      await loginPartner(type)
    } catch (error) {
      console.error("Error signing up as partner:", error)
      setSelectedType(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/logo.png" alt="Zé da Fruta" width={120} height={60} className="h-12 w-auto cursor-pointer" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
            Já tenho conta
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-16 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">Faça parte da nossa família!</h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
            Escolha como você quer crescer com a gente.
          </p>
        </div>

        {/* Partner Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Lojista Card */}
          <Card
            className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-[#F28500]/20"
            onClick={() => !isLoading && handlePartnerSignup("lojista")}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6E9C45] to-[#5A8037] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Store className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quero ser um Lojista</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Cadastre sua frutaria ou hortifrúti e alcance milhares de clientes na sua região.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Benefits */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#6E9C45] rounded-full"></div>
                    <span>Aumente suas vendas online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#6E9C45] rounded-full"></div>
                    <span>Gerencie pedidos facilmente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#6E9C45] rounded-full"></div>
                    <span>Sem taxa de adesão</span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl py-4 px-6 text-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md mt-6"
                >
                  {isLoading && selectedType === "lojista" ? (
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
                  Cadastrar minha loja com Google
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Entregador Card */}
          <Card
            className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-[#F28500]/20"
            onClick={() => !isLoading && handlePartnerSignup("entregador")}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F28500] to-[#E07600] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bike className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quero ser um Entregador</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Tenha horários flexíveis e ótimos ganhos fazendo entregas na sua cidade.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Benefits */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F28500] rounded-full"></div>
                    <span>Horários 100% flexíveis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F28500] rounded-full"></div>
                    <span>Ganhos por entrega + gorjetas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F28500] rounded-full"></div>
                    <span>Saque diário disponível</span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl py-4 px-6 text-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md mt-6"
                >
                  {isLoading && selectedType === "entregador" ? (
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
                  Cadastrar como entregador com Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl">
          <p className="text-gray-600 text-lg leading-relaxed">
            Junte-se a centenas de parceiros que já fazem parte da família Zé da Fruta e transformam a forma como as
            pessoas compram frutas frescas.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
