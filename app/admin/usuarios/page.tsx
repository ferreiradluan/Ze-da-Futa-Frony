"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Eye, UserX, Edit, Filter } from "lucide-react"
// Import the new component at the top
import { UserDetailsSheet } from "@/components/user-details-sheet"

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Add state for the user details sheet after the existing state
  const [selectedUserForDetails, setSelectedUserForDetails] = useState<any>(null)
  const [userDetailsSheetOpen, setUserDetailsSheetOpen] = useState(false)

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      roles: ["CLIENTE"],
      status: "Ativo",
      registrationDate: "2024-01-10",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      roles: ["CLIENTE", "LOJISTA"],
      status: "Ativo",
      registrationDate: "2024-01-08",
    },
    {
      id: 3,
      name: "Carlos Lima",
      email: "carlos.lima@email.com",
      roles: ["ENTREGADOR"],
      status: "Suspenso",
      registrationDate: "2024-01-05",
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      roles: ["CLIENTE"],
      status: "Ativo",
      registrationDate: "2024-01-03",
    },
    {
      id: 5,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      roles: ["LOJISTA"],
      status: "Ativo",
      registrationDate: "2024-01-02",
    },
    {
      id: 6,
      name: "Lucia Fernandes",
      email: "lucia.fernandes@email.com",
      roles: ["CLIENTE", "ENTREGADOR"],
      status: "Ativo",
      registrationDate: "2024-01-01",
    },
    {
      id: 7,
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      roles: ["ADMIN"],
      status: "Ativo",
      registrationDate: "2023-12-15",
    },
    {
      id: 8,
      name: "Fernanda Costa",
      email: "fernanda.costa@email.com",
      roles: ["CLIENTE"],
      status: "Suspenso",
      registrationDate: "2023-12-10",
    },
  ])

  // Add mock detailed user data after the users array
  const getUserDetails = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return null

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      avatar: "/placeholder.svg?height=96&width=96",
      roles: user.roles,
      status: user.status,
      cpfCnpj: user.roles.includes("LOJISTA") ? "12.345.678/0001-90" : "123.456.789-00",
      phone: "(11) 99999-9999",
      registrationDate: user.registrationDate,
      addresses: [
        {
          id: "1",
          name: "Casa",
          street: "Rua das Flores",
          number: "123",
          complement: "Apto 101",
          neighborhood: "Jardim Primavera",
          city: "São Paulo",
          state: "SP",
          zipCode: "01234-567",
          isMain: true,
        },
        {
          id: "2",
          name: "Trabalho",
          street: "Avenida Paulista",
          number: "1000",
          neighborhood: "Bela Vista",
          city: "São Paulo",
          state: "SP",
          zipCode: "01310-100",
          isMain: false,
        },
      ],
      recentOrders: [
        { id: "1247", date: "2024-01-15", total: 32.97, status: "Entregue" },
        { id: "1246", date: "2024-01-14", total: 18.5, status: "Entregue" },
        { id: "1245", date: "2024-01-13", total: 45.8, status: "Cancelado" },
        { id: "1244", date: "2024-01-12", total: 28.75, status: "Entregue" },
        { id: "1243", date: "2024-01-11", total: 15.99, status: "Entregue" },
      ],
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter)

    return matchesSearch && matchesStatus && matchesRole
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

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

  // Update the handleUserAction function
  const handleUserAction = (action: string, userId: number) => {
    if (action === "view") {
      const userDetails = getUserDetails(userId)
      setSelectedUserForDetails(userDetails)
      setUserDetailsSheetOpen(true)
    } else {
      console.log(`${action} user ${userId}`)
      // Implementar outras ações aqui
    }
  }

  // Add the handleUserUpdate function
  const handleUserUpdate = (userId: string, action: "suspend" | "activate" | "delete") => {
    const userIdNum = Number.parseInt(userId)

    if (action === "delete") {
      setUsers(users.filter((user) => user.id !== userIdNum))
    } else if (action === "suspend" || action === "activate") {
      setUsers(
        users.map((user) =>
          user.id === userIdNum ? { ...user, status: action === "suspend" ? "Suspenso" : "Ativo" } : user,
        ),
      )
    }
  }

  return (
    <>
      <AdminHeader title="Usuários" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Buscar e Filtrar Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Papéis</SelectItem>
                  <SelectItem value="CLIENTE">Cliente</SelectItem>
                  <SelectItem value="LOJISTA">Lojista</SelectItem>
                  <SelectItem value="ENTREGADOR">Entregador</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} de{" "}
            {filteredUsers.length} usuários
          </p>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Usuário</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Papéis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="w-[70px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {user.roles.map((role) => (
                          <Badge key={role} className={getRoleColor(role)}>
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.registrationDate).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("view", user.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Papéis
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleUserAction(user.status === "Ativo" ? "suspend" : "activate", user.id)}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            {user.status === "Ativo" ? "Suspender Conta" : "Reativar Conta"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
      </div>
      {/* Add the UserDetailsSheet component at the end of the JSX, before the closing fragment */}
      <UserDetailsSheet
        user={selectedUserForDetails}
        isOpen={userDetailsSheetOpen}
        onOpenChange={setUserDetailsSheetOpen}
        onUserUpdate={handleUserUpdate}
      />
    </>
  )
}
