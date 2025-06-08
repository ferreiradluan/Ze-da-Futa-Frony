"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, User, ShoppingBag, Star, Plus, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "@/components/shopping-cart"
import { useState } from "react"
import { Footer } from "@/components/footer"

export default function StorePage({ params }: { params: { id: string } }) {
  const [cartOpen, setCartOpen] = useState(false)
  // Mock data for store
  const store = {
    id: params.id,
    name: "Hortifrúti da Vovó",
    rating: 4.8,
    type: "Hortifrúti",
    deliveryTime: "25-35 min",
    image: "/placeholder.svg?height=300&width=1200",
  }

  // Mock data for product categories
  const categories = [
    {
      id: 1,
      name: "Frutas Cítricas",
      products: [
        {
          id: 101,
          name: "Laranja Pera",
          description: "Laranja doce e suculenta, perfeita para suco.",
          price: 7.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 102,
          name: "Limão Tahiti",
          description: "Limão fresco e azedo, ideal para temperos e bebidas.",
          price: 5.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 103,
          name: "Tangerina Ponkan",
          description: "Tangerina doce e fácil de descascar.",
          price: 8.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Frutas Vermelhas",
      products: [
        {
          id: 201,
          name: "Morango Bandeja",
          description: "Morangos frescos e doces, selecionados a dedo.",
          price: 12.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 202,
          name: "Framboesa Premium",
          description: "Framboesas suculentas e aromáticas.",
          price: 15.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 203,
          name: "Amora Fresca",
          description: "Amoras maduras e doces, colhidas no ponto certo.",
          price: 14.99,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: 3,
      name: "Frutas Tropicais",
      products: [
        {
          id: 301,
          name: "Manga Palmer",
          description: "Manga doce e carnuda, com pouca fibra.",
          price: 6.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 302,
          name: "Abacaxi Pérola",
          description: "Abacaxi doce e suculento, ideal para sobremesas.",
          price: 9.99,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 303,
          name: "Mamão Formosa",
          description: "Mamão maduro e doce, rico em vitaminas.",
          price: 8.49,
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="Zé da Fruta" width={100} height={50} className="h-10 w-auto cursor-pointer" />
            </Link>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar produtos"
                  className="pl-10 pr-4 py-2 rounded-full border-gray-200"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </Link>
              <button className="p-2 rounded-full hover:bg-gray-100 relative" onClick={() => setCartOpen(true)}>
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#F28500] rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Store Banner */}
      <div className="relative h-64 w-full">
        <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/lojas" className="flex items-center text-white mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Voltar para lojas</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">{store.name}</h1>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm text-white">{store.rating}</span>
              <span className="mx-2 text-white">•</span>
              <span className="text-sm text-white">{store.type}</span>
              <span className="mx-2 text-white">•</span>
              <span className="text-sm text-white">{store.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map((category) => (
          <div key={category.id} className="mb-10">
            <h2 className="text-xl font-medium text-gray-900 mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="h-48 relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                      </div>
                      <Button size="icon" className="bg-[#F28500] hover:bg-[#E07600] h-8 w-8 rounded-full">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-[#F28500] font-medium mt-3">R$ {product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
      <ShoppingCart isOpen={cartOpen} onOpenChange={setCartOpen} />
    </div>
  )
}
