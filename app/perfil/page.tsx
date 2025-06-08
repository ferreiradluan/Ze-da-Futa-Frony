"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  ChevronRight,
  CreditCard,
  Edit,
  Key,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldAlert,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function PerfilPage() {
  const { logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          router.push("/login")
          return
        }
        const res = await fetch("https://meu-ze-da-fruta-backend-8c4976f28553.herokuapp.com/account/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          logout()
          router.push("/login")
          return
        }
        const data = await res.json()
        setUser(data)
        setFormData({ nome: data.nome, email: data.email })
      } catch (e) {
        logout()
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [router, logout])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Carregando perfil...</p></div>
  }
  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrador"
      case "LOJISTA":
        return "Lojista"
      case "ENTREGADOR":
        return "Entregador"
      case "CLIENTE":
      default:
        return "Cliente"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-500"
      case "LOJISTA":
        return "bg-blue-500"
      case "ENTREGADOR":
        return "bg-green-500"
      case "CLIENTE":
      default:
        return "bg-orange-500"
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de atualização de dados
    toast({
      title: "Perfil atualizado",
      description: "Seus dados foram atualizados com sucesso.",
      variant: "default",
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna da esquerda - Informações do usuário */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Gerencie seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-4 pb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.fotoPerfil || "/placeholder.svg"} alt={user.nome} />
                  <AvatarFallback className="text-xl">{getInitials(user.nome)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.nome}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className={`mt-2 ${getRoleColor(user.roles[0])}`}>{getRoleName(user.roles[0])}</Badge>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Menu Rápido</CardTitle>
                <CardDescription>Acesso rápido às suas informações</CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <nav className="space-y-1">
                  <Link
                    href="/perfil/enderecos"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Meus Endereços</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="/pedidos" className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center">
                      <ShoppingBag className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Meus Pedidos</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/configuracoes"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                  >
                    <div className="flex items-center">
                      <Settings className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Configurações</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link href="/pagamentos" className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Métodos de Pagamento</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da direita - Conteúdo principal */}
          <div className="md:col-span-2">
            <Tabs defaultValue="dados">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                <TabsTrigger value="pedidos">Últimos Pedidos</TabsTrigger>
              </TabsList>

              {/* Tab de Dados Pessoais */}
              <TabsContent value="dados" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Pessoais</CardTitle>
                    <CardDescription>
                      {isEditing ? "Edite seus dados pessoais abaixo" : "Visualize e gerencie seus dados pessoais"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Nome completo</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              name="name"
                              value={formData.nome}
                              onChange={handleChange}
                              placeholder="Seu nome completo"
                            />
                          ) : (
                            <div className="p-2 bg-muted rounded-md">{user.nome}</div>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="seu.email@exemplo.com"
                            />
                          ) : (
                            <div className="p-2 bg-muted rounded-md">{user.email}</div>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <div className="p-2 bg-muted rounded-md">Não informado</div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cpf">CPF/CNPJ</Label>
                          <div className="p-2 bg-muted rounded-md">Não informado</div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Data de cadastro</Label>
                          <div className="p-2 bg-muted rounded-md">Não informado</div>
                        </div>
                      </div>
                      {isEditing && (
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">Salvar Alterações</Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab de Segurança */}
              <TabsContent value="seguranca" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>Gerencie a segurança da sua conta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-md border">
                        <div className="flex items-center">
                          <Key className="mr-2 h-5 w-5 text-orange-500" />
                          <div>
                            <h3 className="font-medium">Senha</h3>
                            <p className="text-sm text-muted-foreground">Última alteração: Nunca</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Alterar
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md border">
                        <div className="flex items-center">
                          <ShieldAlert className="mr-2 h-5 w-5 text-orange-500" />
                          <div>
                            <h3 className="font-medium">Autenticação de dois fatores</h3>
                            <p className="text-sm text-muted-foreground">Não ativado</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-md border">
                        <div className="flex items-center">
                          <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
                          <div>
                            <h3 className="font-medium">Excluir conta</h3>
                            <p className="text-sm text-muted-foreground">Remover permanentemente sua conta</p>
                          </div>
                        </div>
                        <Button variant="destructive" size="sm">
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab de Pedidos */}
              <TabsContent value="pedidos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Últimos Pedidos</CardTitle>
                    <CardDescription>Seus pedidos mais recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
                        <p className="text-sm text-muted-foreground">Você ainda não realizou nenhum pedido.</p>
                        <Link href="/lojas">
                          <Button className="mt-4">Explorar Lojas</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t pt-4">
                    <Link href="/pedidos">
                      <Button variant="outline">Ver Todos os Pedidos</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
