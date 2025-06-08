"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  id: number | string
  name: string
  description: string
  price: number
  image: string
  onAddToCart?: () => void
}

export function ProductCard({ id, name, description, price, image, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="h-48 relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          </div>
          <Button size="icon" className="bg-[#F28500] hover:bg-[#E07600] h-8 w-8 rounded-full" onClick={onAddToCart}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-[#F28500] font-medium mt-3">R$ {price.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}
