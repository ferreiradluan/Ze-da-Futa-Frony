"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface ShoppingCartProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ShoppingCart({ isOpen, onOpenChange }: ShoppingCartProps) {
  // Mock cart items - in a real app, this would come from a global state or context
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 101,
      name: "Morango Bandeja",
      price: 12.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80&text=Morango",
    },
    {
      id: 102,
      name: "Laranja Pera",
      price: 7.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Laranja",
    },
    {
      id: 103,
      name: "Manga Palmer",
      price: 6.99,
      quantity: 3,
      image: "/placeholder.svg?height=80&width=80&text=Manga",
    },
  ])

  const deliveryFee = 4.99
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + deliveryFee

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Minha Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Sua sacola está vazia</p>
                <p className="text-gray-400 text-sm mt-2">Adicione produtos para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-[#F28500] font-medium">R$ {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">R$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="text-gray-900">R$ {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span className="text-[#F28500]">R$ {total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-[#F28500] hover:bg-[#E07600] text-white py-3 text-lg font-medium"
                onClick={() => {
                  // Handle checkout
                  console.log("Proceeding to checkout...")
                }}
              >
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
