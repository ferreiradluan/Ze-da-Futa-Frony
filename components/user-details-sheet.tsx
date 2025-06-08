"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { User, Phone, Calendar, MapPin, ShoppingBag, UserX, Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface UserAddress {
  id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isMain: boolean
}

interface UserOrder {
  id: string
  date: string
  total: number
  status: string
}

interface UserDetails {
  id: string
  name: string
  email: string
  avatar?: string
  roles: string[]
  status: "Ativo" | "Suspenso"
  cpfCnpj: string
  phone: string
  registrationDate: string
  addresses: UserAddress[]
  recentOrders: UserOrder[]
}

interface UserDetailsSheetProps {
  user: UserDetails | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUserUpdate?: (userId: string, action: "suspend" | "activate" | "delete") => void
}

export function UserDetailsSheet({ user, isOpen, onOpenChange, onUserUpdate }: UserDetailsSheetProps) {
  const { toast } = useToast()
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "CLIENTE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "LOJISTA":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "ENTREGADOR":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "ADMIN":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Ativo"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handleSuspendUser = () => {
    const action = user.status === "Ativo" ? "suspend" : "activate"
    const actionText = user.status === "Ativo" ? "suspensa" : "reativada"

    if (onUserUpdate) {
      onUserUpdate(user.id, action)
    }

    toast({
      title: `Conta ${actionText}`,
      description: `A conta de ${user.name} foi ${actionText} com sucesso.`,
    })

    setSuspendDialogOpen(false)
  }

  const handleDeleteUser = () => {
    if (onUserUpdate) {
      onUserUpdate(user.id, "delete")
    }

    toast({
      title: "Conta excluída",
      description: `A conta de ${user.name} foi excluída permanentemente.`,
      variant: "destructive",
    })

    setDeleteDialogOpen(false)
    onOpenChange(false)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="space-y-4">
            <SheetTitle>Detalhes do Usuário</SheetTitle>

            {/* Avatar e informações principais */}
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>

                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {user.roles.map((role) => (
                    <Badge key={role} className={getRoleColor(role)}>
                      {role}
                    </Badge>
                  ))}
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className="space-y-6 py-4">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      {user.roles.includes("LOJISTA") ? "CNPJ" : "CPF"}
                    </label>
                    <p className="font-medium">{user.cpfCnpj}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Cadastro</label>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(user.registrationDate)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Endereços Salvos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereços Salvos ({user.addresses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.addresses.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Nenhum endereço cadastrado</p>
                ) : (
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{address.name}</h4>
                          {address.isMain && (
                            <Badge variant="outline" className="text-xs">
                              Principal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}, {address.number}
                          {address.complement && `, ${address.complement}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.neighborhood} - {address.city}/{address.state}
                        </p>
                        <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Histórico de Pedidos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Histórico de Pedidos (Últimos 5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.recentOrders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Nenhum pedido encontrado</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID do Pedido</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(order.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Ações Administrativas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Ações Administrativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Ações irreversíveis que afetam diretamente a conta do usuário.
                  </p>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                      onClick={() => setSuspendDialogOpen(true)}
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      {user.status === "Ativo" ? "Suspender Conta" : "Reativar Conta"}
                    </Button>

                    <Button variant="destructive" className="flex-1" onClick={() => setDeleteDialogOpen(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      {/* Diálogo de confirmação para suspender/reativar */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {user.status === "Ativo" ? "Suspender" : "Reativar"} conta de {user.name}
            </DialogTitle>
            <DialogDescription>
              {user.status === "Ativo"
                ? "Você tem certeza que deseja suspender esta conta? O usuário não poderá mais acessar a plataforma."
                : "Você tem certeza que deseja reativar esta conta? O usuário voltará a ter acesso à plataforma."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setSuspendDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant={user.status === "Ativo" ? "destructive" : "default"}
              onClick={handleSuspendUser}
              className={user.status === "Suspenso" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <UserX className="h-4 w-4 mr-2" />
              {user.status === "Ativo" ? "Suspender" : "Reativar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação para deletar */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar conta de {user.name}</DialogTitle>
            <DialogDescription>
              <strong>Esta ação é irreversível!</strong> Você tem certeza que deseja deletar permanentemente a conta de{" "}
              {user.name}? Todos os dados do usuário serão perdidos.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash2 className="h-4 w-4 mr-2" />
              Deletar Permanentemente
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
