"use client"

import { Input } from "@/components/ui/input"
import { Search, User, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"

interface HeaderProps {
  onCartClick: () => void
}

export function Header({ onCartClick }: HeaderProps) {
  const { totalItems } = useCart()

  return (
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
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 relative" onClick={onCartClick}>
              <ShoppingBag className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-[#F28500] rounded-full text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
