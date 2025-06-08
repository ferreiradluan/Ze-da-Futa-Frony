import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin-header"
import { TrendingUp, TrendingDown, ShoppingCart, Users, UserCheck, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  // Mock data
  const metrics = [
    {
      title: "Vendas Totais (Hoje)",
      value: "R$ 12.847",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Novos Pedidos (Hoje)",
      value: "247",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Novos Usuários",
      value: "89",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Aprovações Pendentes",
      value: "12",
      change: "-2.1%",
      trend: "down",
      icon: UserCheck,
    },
  ]

  const recentActivity = [
    { type: "order", description: "Novo pedido #1247 - Maria Silva", time: "2 min atrás" },
    { type: "user", description: "Novo usuário cadastrado - João Santos", time: "5 min atrás" },
    { type: "store", description: "Loja aprovada - Frutas Premium", time: "12 min atrás" },
    { type: "order", description: "Pedido #1246 entregue", time: "18 min atrás" },
    { type: "user", description: "Novo entregador cadastrado - Carlos Lima", time: "25 min atrás" },
  ]

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Metrics Cards */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs">
                  {metric.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                  <span className="text-muted-foreground ml-1">em relação a ontem</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Faturamento dos Últimos 7 Dias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Gráfico de Barras - Faturamento</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "order"
                          ? "bg-green-500"
                          : activity.type === "user"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
