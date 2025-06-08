"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Filter, Eye, MapPin, User, Clock } from "lucide-react"

export default function PedidosPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [storeFilter, setStoreFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [customerFilter, setCustomerFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const orders = [
    {
      id: "#1247",
      customer: "Maria Silva",
      customerPhone: "(11) 99999-1234",
      store: "Hortifrúti da Vovó",
      total: 32.97,
      status: "Entregue",
      date: "2024-01-15",
      time: "14:30",
      items: [
        { name: "Morango Bandeja", quantity: 2, price: 12.99 },
        { name: "Laranja Pera", quantity: 1, price: 7.99 },
      ],
      driver: "Carlos Lima",
      driverPhone: "(11) 88888-5678",
      address: "Av. Principal, 456, Apto 303",
      deliveryFee: 4.99,
      paymentMethod: "Cartão de Crédito",
      statusHistory: [
        { status: "Pedido Confirmado", time: "14:00", date: "2024-01-15" },
        { status: "Em Preparo", time: "14:05", date: "2024-01-15" },
        { status: "Saiu para Entrega", time: "14:20", date: "2024-01-15" },
        { status: "Entregue", time: "14:30", date: "2024-01-15" },
      ],
    },
    {
      id: "#1246",
      customer: "João Santos",
      customerPhone: "(11) 77777-9876",
      store: "Frutas Premium",
      total: 18.5,
      status: "Em Preparo",
      date: "2024-01-15",
      time: "13:45",
      items: [
        { name: "Manga Palmer", quantity: 1, price: 6.99 },
        { name: "Banana Prata", quantity: 3, price: 3.84 },
      ],
      driver: "Ana Costa",
      driverPhone: "(11) 66666-4321",
      address: "Rua Secundária, 101",
      deliveryFee: 4.99,
      paymentMethod: "PIX",
      statusHistory: [
        { status: "Pedido Confirmado", time: "13:30", date: "2024-01-15" },
        { status: "Em Preparo", time: "13:45", date: "2024-01-15" },
      ],
    },
    {
      id: "#1245",
      customer: "Ana Costa",
      customerPhone: "(11) 55555-1111",
      store: "Feira Orgânica",
      total: 45.8,
      status: "Cancelado",
      date: "2024-01-14",
      time: "16:20",
      items: [
        { name: "Abacaxi Pérola", quantity: 1, price: 9.99 },
        { name: "Mamão Formosa", quantity: 2, price: 17.98 },
      ],
      driver: null,
      driverPhone: null,
      address: "Rua das Flores, 789",
      deliveryFee: 4.99,
      paymentMethod: "Cartão de Débito",
      statusHistory: [
        { status: "Pedido Confirmado", time: "16:00", date: "2024-01-14" },
        { status: "Cancelado", time: "16:20", date: "2024-01-14" },
      ],
    },
    {
      id: "#1244",
      customer: "Pedro Oliveira",
      customerPhone: "(11) 44444-2222",
      store: "Hortifrúti da Vovó",
      total: 28.75,
      status: "A Caminho",
      date: "2024-01-15",
      time: "15:10",
      items: [
        { name: "Maçã Gala", quantity: 4, price: 15.96 },
        { name: "Uva Itália", quantity: 1, price: 8.8 },
      ],
      driver: "Roberto Silva",
      driverPhone: "(11) 33333-7777",
      address: "Rua das Palmeiras, 234",
      deliveryFee: 3.99,
      paymentMethod: "Dinheiro",
      statusHistory: [
        { status: "Pedido Confirmado", time: "14:50", date: "2024-01-15" },
        { status: "Em Preparo", time: "14:55", date: "2024-01-15" },
        { status: "Saiu para Entrega", time: "15:10", date: "2024-01-15" },
      ],
    },
  ]

  const stores = ["Hortifrúti da Vovó", "Frutas Premium", "Feira Orgânica"]

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesStore = storeFilter === "all" || order.store === storeFilter
    const matchesDate = !dateFilter || order.date.includes(dateFilter)
    const matchesCustomer = !customerFilter || order.customer.toLowerCase().includes(customerFilter.toLowerCase())

    return matchesStatus && matchesStore && matchesDate && matchesCustomer
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Em Preparo":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Cancelado":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "A Caminho":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setDialogOpen(true)
  }

  const initiateRefund = () => {
    console.log("Iniciando reembolso para pedido:", selectedOrder.id)
    setDialogOpen(false)
  }

  return (
    <>
      <AdminHeader title="Pedidos" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Advanced Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros Avançados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Status do Pedido</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Em Preparo">Em Preparo</SelectItem>
                    <SelectItem value="A Caminho">A Caminho</SelectItem>
                    <SelectItem value="Entregue">Entregue</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data</Label>
                <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Loja</Label>
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as lojas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as lojas</SelectItem>
                    {stores.map((store) => (
                      <SelectItem key={store} value={store}>
                        {store}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cliente</Label>
                <Input
                  placeholder="Nome do cliente"
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="invisible">Ações</Label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter("all")
                    setStoreFilter("all")
                    setDateFilter("")
                    setCustomerFilter("")
                  }}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)} de{" "}
            {filteredOrders.length} pedidos
          </p>
        </div>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Loja</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.store}</TableCell>
                    <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openOrderDetails(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Detalhes do Pedido {selectedOrder?.id}
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Informações do Cliente
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <strong>Nome:</strong> {selectedOrder.customer}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {selectedOrder.customerPhone}
                      </p>
                      <p>
                        <strong>Endereço:</strong> {selectedOrder.address}
                      </p>
                      <p>
                        <strong>Pagamento:</strong> {selectedOrder.paymentMethod}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Informações da Entrega
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <strong>Loja:</strong> {selectedOrder.store}
                      </p>
                      <p>
                        <strong>Entregador:</strong> {selectedOrder.driver || "Não atribuído"}
                      </p>
                      {selectedOrder.driverPhone && (
                        <p>
                          <strong>Tel. Entregador:</strong> {selectedOrder.driverPhone}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Itens do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Preço Unitário</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                            <TableCell>R$ {(item.quantity * item.price).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-4 space-y-2 text-right">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>R$ {(selectedOrder.total - selectedOrder.deliveryFee).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa de Entrega:</span>
                        <span>R$ {selectedOrder.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>R$ {selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Histórico do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.statusHistory.map((history: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">{history.status}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(history.date).toLocaleDateString("pt-BR")} às {history.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                {(selectedOrder.status === "Entregue" || selectedOrder.status === "Cancelado") && (
                  <div className="flex justify-end gap-3">
                    <Button onClick={initiateRefund} variant="destructive">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Iniciar Reembolso
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
