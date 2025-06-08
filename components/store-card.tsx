import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface StoreCardProps {
  id: number | string
  name: string
  rating: number
  type: string
  deliveryTime: string
  image: string
}

export function StoreCard({ id, name, rating, type, deliveryTime, image }: StoreCardProps) {
  return (
    <Link href={`/lojas/${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="h-48 relative">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg text-gray-900">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm text-gray-700">{rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{type}</p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-700">{deliveryTime}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
