"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Store, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ClientOnly from "@/components/client-only"

function HomePageContent() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleUserTypeSelection = (type: string) => {
    setSelectedType(type)
    if (typeof window !== 'undefined') {
      localStorage.setItem("userType", type)
    }
    router.push("/auth")
  }

  const userTypes = [
    {
      id: "comprador",
      title: "Comprar",
      description: "Encontre frutas e verduras frescas",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      id: "vendedor",
      title: "Vender",
      description: "Venda seus produtos frescos",
      icon: Store,
      color: "bg-blue-500",
    },
    {
      id: "entregador",
      title: "Entregar",
      description: "Faça entregas e ganhe dinheiro",
      icon: Truck,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <Image src="/logo.png" alt="Zé da Fruta" width={400} height={150} className="mx-auto" priority />
        </div>

        {/* Título e Descrição */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Bem-vindo ao <span className="text-[#FE9A04]">Zé da Fruta</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O maior marketplace de frutas e verduras frescas da região. Escolha como você quer participar:
          </p>
        </div>

        {/* Opções de Usuário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {userTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                  selectedType === type.id
                    ? "border-[#FE9A04] bg-orange-50"
                    : "border-gray-200 hover:border-[#FE9A04]"
                }`}
                onClick={() => handleUserTypeSelection(type.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <Button
                    className="w-full bg-[#FE9A04] hover:bg-[#E8890B] text-white"
                    size="lg"
                  >
                    Começar agora
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>Conectando produtores, consumidores e entregadores em uma plataforma única</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <ClientOnly>
      <HomePageContent />
    </ClientOnly>
  )
}