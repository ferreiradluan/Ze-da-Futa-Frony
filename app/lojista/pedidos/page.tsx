"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Clock, User, Package } from "lucide-react"
import { useState } from "react"

interface Order {
  id: string
  customerName: string
  items: string[]
  total: number
  time: string
  status: "new" | "preparing" | "ready"
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#001",
      customerName: "Maria Silva",
      items: ["2x Morango", "1x Laranja"],
      total: 32.97,
      time: "10:30",
      status: "new",
    },
    {
      id: "#002",
      customerName: "João Santos",
      items: ["1x Manga", "3x Banana"],
      total: 18.5,
      time: "10:45",
      status: "new",
    },
    {
      id: "#003",
      customerName: "Ana Costa",
      items: ["1x Abacaxi", "2x Limão"],
      total: 15.98,
      time: "09:15",
      status: "preparing",
    },
    {
      id: "#004",
      customerName: "Carlos Lima",
      items: ["4x Maçã", "1x Uva"],
      total: 28.75,
      time: "08:30",
      status: "ready",
    },
  ])

  const moveOrder = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "preparing":
        return "bg-yellow-500"
      case "ready":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getNextStatus = (status: Order["status"]): Order["status"] | null => {
    switch (status) {
      case "new":
        return "preparing"
      case "preparing":
        return "ready"
      case "ready":
        return null
      default:
        return null
    }
  }

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{order.customerName}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{order.time}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{order.items.join(", ")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#F28500]">R$ {order.total.toFixed(2)}</span>
            {getNextStatus(order.status) && (
              <Button
                size="sm"
                onClick={() => moveOrder(order.id, getNextStatus(order.status)!)}
                className="bg-[#F28500] hover:bg-[#E07600]"
              >
                {order.status === "new" ? "Iniciar" : "Finalizar"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Pedidos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Novos Pedidos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor("new")}`} />
              <h2 className="font-semibold">Novos Pedidos</h2>
              <Badge variant="secondary">{getOrdersByStatus("new").length}</Badge>
            </div>
            <div className="space-y-3">
              {getOrdersByStatus("new").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* Em Preparo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor("preparing")}`} />
              <h2 className="font-semibold">Em Preparo</h2>
              <Badge variant="secondary">{getOrdersByStatus("preparing").length}</Badge>
            </div>
            <div className="space-y-3">
              {getOrdersByStatus("preparing").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* Prontos para Retirada */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor("ready")}`} />
              <h2 className="font-semibold">Prontos para Retirada</h2>
              <Badge variant="secondary">{getOrdersByStatus("ready").length}</Badge>
            </div>
            <div className="space-y-3">
              {getOrdersByStatus("ready").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
