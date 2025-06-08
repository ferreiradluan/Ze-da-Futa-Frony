"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, User, ShoppingBag, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "@/components/shopping-cart"
import { useState } from "react"
import { Footer } from "@/components/footer"

export default function StoresPage() {
  const [cartOpen, setCartOpen] = useState(false)
  // Mock data for stores
  const stores = [
    {
      id: 1,
      name: "Hortifrúti da Vovó",
      rating: 4.8,
      type: "Hortifrúti",
      deliveryTime: "25-35 min",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      name: "Frutas Premium",
      rating: 4.5,
      type: "Hortifrúti",
      deliveryTime: "30-45 min",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      name: "Feira Orgânica",
      rating: 4.7,
      type: "Hortifrúti",
      deliveryTime: "20-30 min",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      name: "Frutas & Cia",
      rating: 4.3,
      type: "Hortifrúti",
      deliveryTime: "35-50 min",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      name: "Sacolão Verde",
      rating: 4.6,
      type: "Hortifrúti",
      deliveryTime: "25-40 min",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      name: "Frutas Tropicais",
      rating: 4.4,
      type: "Hortifrúti",
      deliveryTime: "30-45 min",
      image: "/placeholder.svg?height=200&width=400",
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
                  placeholder="Buscar lojas ou frutas"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-6">Frutarias disponíveis</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link href={`/lojas/${store.id}`} key={store.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="h-48 relative">
                  <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg text-gray-900">{store.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-700">{store.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{store.type}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-700">{store.deliveryTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <ShoppingCart isOpen={cartOpen} onOpenChange={setCartOpen} />
    </div>
  )
}
