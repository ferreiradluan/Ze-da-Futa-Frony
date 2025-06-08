"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Clock, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface StatusUpdate {
  status: string
  date: string
  time: string
  description: string
}

interface OrderDetails {
  id: string
  date: string
  time: string
  total: number
  deliveryFee: number
  status: string
  items: OrderItem[]
  statusHistory: StatusUpdate[]
  store: {
    name: string
    image: string
  }
}

export default function PedidoDetalhes({ params }: { params: { id: string } }) {
  // Simulando dados do pedido
  const orderDetails: OrderDetails = {
    id: params.id,
    date: "15/01/2024",
    time: "14:30",
    total: 47.96,
    deliveryFee: 4.99,
    status: "Entregue",
    store: {
      name: "Hortifrúti da Vovó",
      image: "/placeholder.svg?height=48&width=48&text=Loja",
    },
    items: [
      {
        id: "1",
        name: "Morango Bandeja",
        quantity: 2,
        price: 12.99,
        image: "/placeholder.svg?height=80&width=80&text=Morango",
      },
      {
        id: "2",
        name: "Laranja Pera",
        quantity: 1,
        price: 7.99,
        image: "/placeholder.svg?height=80&width=80&text=Laranja",
      },
      {
        id: "3",
        name: "Manga Palmer",
        quantity: 2,
        price: 6.99,
        image: "/placeholder.svg?height=80&width=80&text=Manga",
      },
    ],
    statusHistory: [
      {
        status: "Pedido Realizado",
        date: "15/01/2024",
        time: "14:00",
        description: "Seu pedido foi recebido com sucesso.",
      },
      {
        status: "Pagamento Aprovado",
        date: "15/01/2024",
        time: "14:02",
        description: "O pagamento foi processado e aprovado.",
      },
      {
        status: "Em Preparo",
        date: "15/01/2024",
        time: "14:10",
        description: "A loja está preparando seu pedido.",
      },
      {
        status: "Saiu para Entrega",
        date: "15/01/2024",
        time: "14:25",
        description: "Seu pedido está a caminho com o entregador.",
      },
      {
        status: "Entregue",
        date: "15/01/2024",
        time: "14:45",
        description: "Seu pedido foi entregue. Bom apetite!",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Saiu para Entrega":
      case "Em Transporte":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Em Preparo":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Pedido Realizado":
      case "Pagamento Aprovado":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregue":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "Saiu para Entrega":
      case "Em Transporte":
        return <Package className="h-5 w-5 text-blue-600" />
      case "Em Preparo":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <Clock className="h-5 w-5 text-purple-600" />
    }
  }

  const subtotal = orderDetails.total - orderDetails.deliveryFee

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/pedidos" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para meus pedidos
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Detalhes do Pedido #{orderDetails.id}</h1>

      {/* Resumo do Pedido */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Data e Hora</span>
              <span className="font-medium">
                {orderDetails.date} às {orderDetails.time}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Valor Total</span>
              <span className="font-medium text-[#F28500]">R$ {orderDetails.total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Status</span>
              <Badge className={getStatusColor(orderDetails.status)}>{orderDetails.status}</Badge>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={orderDetails.store.image || "/placeholder.svg"}
                  alt={orderDetails.store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">Loja</h3>
                <p className="text-gray-600">{orderDetails.store.name}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Itens do Pedido */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Itens do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#F28500]">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)} cada</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="text-gray-900">R$ {orderDetails.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-[#F28500]">R$ {orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Status */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
              {orderDetails.statusHistory.map((status, index) => (
                <div key={index} className="relative pl-10">
                  {/* Círculo na linha do tempo */}
                  <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-primary">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status.status)}
                      <h4 className="font-medium text-gray-900">{status.status}</h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {status.date} às {status.time}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{status.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline">Ajuda com este pedido</Button>
        <Button className="bg-[#F28500] hover:bg-[#E07600]">Comprar novamente</Button>
      </div>
      <Footer />
    </div>
  )
}
