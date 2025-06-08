"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Car,
  Wallet,
  User,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Package,
  Phone,
  MessageCircle,
  ChevronRight,
  CreditCard,
  Settings,
  HelpCircle,
  Truck,
} from "lucide-react"

export default function EntregadorDashboard() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [isOnline, setIsOnline] = useState(false)
  const [ridesTab, setRidesTab] = useState("disponiveis")
  const [currentRide, setCurrentRide] = useState<any>(null)
  const [rideStatus, setRideStatus] = useState<"accepted" | "collecting" | "delivering" | null>(null)

  // Mock data
  const todayEarnings = 85.5
  const todayDeliveries = 6
  const rating = 4.9
  const availableBalance = 247.8

  const availableRides = [
    {
      id: 1,
      pickup: "Hortifrúti da Vovó",
      pickupAddress: "Rua das Frutas, 123",
      delivery: "Maria Silva",
      deliveryAddress: "Av. Principal, 456, Apto 303",
      distance: "3.2 km",
      earnings: 15.0,
      items: ["2x Morango", "1x Laranja"],
    },
    {
      id: 2,
      pickup: "Frutas Premium",
      pickupAddress: "Av. das Árvores, 789",
      delivery: "João Santos",
      deliveryAddress: "Rua Secundária, 101",
      distance: "4.5 km",
      earnings: 18.5,
      items: ["1x Manga", "3x Banana"],
    },
  ]

  const transactions = [
    { id: 1, type: "delivery", description: "Entrega #1234", amount: 15.0, date: "Hoje, 14:30" },
    { id: 2, type: "delivery", description: "Entrega #1233", amount: 12.5, date: "Hoje, 13:15" },
    { id: 3, type: "withdrawal", description: "Saque solicitado", amount: -100.0, date: "Ontem, 18:00" },
    { id: 4, type: "bonus", description: "Bônus de produtividade", amount: 25.0, date: "Ontem, 12:00" },
  ]

  const acceptRide = (ride: any) => {
    setCurrentRide(ride)
    setRideStatus("accepted")
    setRidesTab("andamento")
  }

  const updateRideStatus = () => {
    switch (rideStatus) {
      case "accepted":
        setRideStatus("collecting")
        break
      case "collecting":
        setRideStatus("delivering")
        break
      case "delivering":
        setCurrentRide(null)
        setRideStatus(null)
        setRidesTab("disponiveis")
        break
    }
  }

  const getActionButtonText = () => {
    switch (rideStatus) {
      case "accepted":
        return "Cheguei na Loja"
      case "collecting":
        return "Coletar Pedido"
      case "delivering":
        return "Finalizar Entrega"
      default:
        return ""
    }
  }

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around py-2">
        {[
          { id: "inicio", icon: Home, label: "Início" },
          { id: "corridas", icon: Car, label: "Corridas" },
          { id: "carteira", icon: Wallet, label: "Carteira" },
          { id: "perfil", icon: User, label: "Perfil" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === tab.id ? "text-[#F28500]" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Início Tab */}
      {activeTab === "inicio" && (
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Olá, Luan!</h1>
              <p className="text-gray-600 dark:text-gray-400">Como está seu dia?</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>LU</AvatarFallback>
            </Avatar>
          </div>

          {/* Online/Offline Toggle */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Status de Trabalho</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isOnline ? "Você está online e pode receber corridas" : "Você está offline"}
                  </p>
                </div>
                <Button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`${
                    isOnline ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  } text-white px-6 py-3`}
                >
                  {isOnline ? "Ficar Offline" : "Ficar Online"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ganhos de Hoje</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">R$ {todayEarnings.toFixed(2)}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">+12% em relação a ontem</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Entregas Hoje</CardTitle>
                  <Package className="h-4 w-4 text-[#F28500]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayDeliveries}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">corridas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sua Avaliação</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-1">
                    {rating}
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">excelente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Corridas Tab */}
      {activeTab === "corridas" && (
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Corridas</h1>
          <Tabs value={ridesTab} onValueChange={setRidesTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
              <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
            </TabsList>

            <TabsContent value="disponiveis" className="space-y-4 mt-4">
              {availableRides.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#F28500] mt-0.5" />
                        <div>
                          <p className="font-medium">{ride.pickup}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{ride.pickupAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Navigation className="h-5 w-5 text-[#6E9C45] mt-0.5" />
                        <div>
                          <p className="font-medium">{ride.delivery}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{ride.deliveryAddress}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{ride.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-500">R$ {ride.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => acceptRide(ride)}
                      >
                        Aceitar Corrida
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="andamento" className="mt-4">
              {currentRide ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">Entrega em Andamento</h3>
                        <Badge variant="secondary">
                          {rideStatus === "accepted" && "Aceita"}
                          {rideStatus === "collecting" && "Coletando"}
                          {rideStatus === "delivering" && "Entregando"}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-[#F28500] mt-0.5" />
                          <div>
                            <p className="font-medium">{currentRide.pickup}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{currentRide.pickupAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Navigation className="h-5 w-5 text-[#6E9C45] mt-0.5" />
                          <div>
                            <p className="font-medium">{currentRide.delivery}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{currentRide.deliveryAddress}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Rota
                        </Button>
                      </div>

                      <Button className="w-full bg-[#F28500] hover:bg-[#E07600] text-white" onClick={updateRideStatus}>
                        {getActionButtonText()}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8">
                  <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Nenhuma corrida em andamento</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Carteira Tab */}
      {activeTab === "carteira" && (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Carteira</h1>

          {/* Available Balance */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Saldo Disponível para Saque</p>
                <div className="text-3xl font-bold text-green-500 mb-4">R$ {availableBalance.toFixed(2)}</div>
                <Button className="bg-[#F28500] hover:bg-[#E07600] text-white px-8">Solicitar Saque</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Transações Recentes</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "delivery"
                              ? "bg-green-100 dark:bg-green-900"
                              : transaction.type === "withdrawal"
                                ? "bg-red-100 dark:bg-red-900"
                                : "bg-blue-100 dark:bg-blue-900"
                          }`}
                        >
                          {transaction.type === "delivery" && <Package className="h-4 w-4 text-green-600" />}
                          {transaction.type === "withdrawal" && <CreditCard className="h-4 w-4 text-red-600" />}
                          {transaction.type === "bonus" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                        {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Perfil Tab */}
      {activeTab === "perfil" && (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Perfil</h1>

          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>LU</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">Luan Silva</h2>
                  <p className="text-gray-600 dark:text-gray-400">Entregador desde 2023</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{rating}</span>
                    <span className="text-gray-600 dark:text-gray-400">(247 avaliações)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entregas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">R$ 12,5k</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ganhos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">98%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aprovação</p>
              </CardContent>
            </Card>
          </div>

          {/* Menu Options */}
          <div className="space-y-2">
            {[
              { icon: User, label: "Editar Dados Cadastrais", href: "#" },
              { icon: Truck, label: "Meus Veículos", href: "#" },
              { icon: Settings, label: "Configurações", href: "#" },
              { icon: HelpCircle, label: "Central de Ajuda", href: "#" },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
