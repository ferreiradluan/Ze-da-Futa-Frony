"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, MoreHorizontal, Edit, Power, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  expiryDate: string
  status: "active" | "inactive"
  minPurchase?: number
  maxUses?: number
  usedCount: number
  description?: string
}

export default function CuponsPage() {
  const { toast } = useToast()
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "BEMVINDO15",
      type: "percentage",
      value: 15,
      expiryDate: "2024-12-31",
      status: "active",
      minPurchase: 30,
      maxUses: 1000,
      usedCount: 342,
      description: "Cupom de boas-vindas para novos usuários",
    },
    {
      id: "2",
      code: "FRETE10",
      type: "fixed",
      value: 10,
      expiryDate: "2024-06-30",
      status: "active",
      minPurchase: 50,
      maxUses: 500,
      usedCount: 123,
      description: "Desconto no frete para compras acima de R$ 50",
    },
    {
      id: "3",
      code: "VERAO2024",
      type: "percentage",
      value: 20,
      expiryDate: "2024-03-20",
      status: "active",
      minPurchase: 40,
      maxUses: 2000,
      usedCount: 876,
      description: "Promoção especial de verão",
    },
    {
      id: "4",
      code: "FRUTAS5",
      type: "fixed",
      value: 5,
      expiryDate: "2024-05-15",
      status: "active",
      minPurchase: 25,
      maxUses: 1500,
      usedCount: 432,
      description: "Desconto para compras de frutas",
    },
    {
      id: "5",
      code: "PROMO25",
      type: "percentage",
      value: 25,
      expiryDate: "2024-02-28",
      status: "inactive",
      minPurchase: 100,
      maxUses: 300,
      usedCount: 300,
      description: "Promoção especial limitada (encerrada)",
    },
    {
      id: "6",
      code: "BLACKFRIDAY",
      type: "percentage",
      value: 30,
      expiryDate: "2023-11-30",
      status: "inactive",
      minPurchase: 0,
      maxUses: 5000,
      usedCount: 4328,
      description: "Promoção de Black Friday (encerrada)",
    },
    {
      id: "7",
      code: "ANIVERSARIO",
      type: "percentage",
      value: 10,
      expiryDate: "2024-08-15",
      status: "active",
      minPurchase: 0,
      maxUses: null,
      usedCount: 56,
      description: "Cupom de aniversário da loja",
    },
    {
      id: "8",
      code: "FIDELIDADE20",
      type: "fixed",
      value: 20,
      expiryDate: "2024-12-31",
      status: "active",
      minPurchase: 100,
      maxUses: null,
      usedCount: 89,
      description: "Cupom para clientes fiéis",
    },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const itemsPerPage = 5
  const totalPages = Math.ceil(coupons.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCoupons = coupons.slice(startIndex, startIndex + itemsPerPage)

  const handleStatusToggle = (id: string) => {
    setCoupons(
      coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, status: coupon.status === "active" ? "inactive" : "active" } : coupon,
      ),
    )

    const coupon = coupons.find((c) => c.id === id)
    const newStatus = coupon?.status === "active" ? "desativado" : "ativado"

    toast({
      title: `Cupom ${newStatus}`,
      description: `O cupom ${coupon?.code} foi ${newStatus} com sucesso.`,
    })
  }

  const handleDeleteClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedCoupon) {
      setCoupons(coupons.filter((coupon) => coupon.id !== selectedCoupon.id))

      toast({
        title: "Cupom excluído",
        description: `O cupom ${selectedCoupon.code} foi excluído permanentemente.`,
      })

      setDeleteDialogOpen(false)
      setSelectedCoupon(null)
    }
  }

  const formatValue = (coupon: Coupon) => {
    return coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  return (
    <>
      <AdminHeader title="Cupons" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Gerenciar Cupons</h1>
          <Button className="bg-[#F28500] hover:bg-[#E07600]">
            <Plus className="h-4 w-4 mr-2" />
            Criar Novo Cupom
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data de Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.type === "percentage" ? "Percentual" : "Fixo"}</TableCell>
                  <TableCell>{formatValue(coupon)}</TableCell>
                  <TableCell>{formatDate(coupon.expiryDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={coupon.status === "active" ? "default" : "secondary"}
                      className={
                        coupon.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
                      }
                    >
                      {coupon.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleStatusToggle(coupon.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          <span>{coupon.status === "active" ? "Desativar" : "Ativar"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => handleDeleteClick(coupon)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Deletar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-6 py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1
                  // Show first page, current page, last page, and pages around current
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }

                  // Show ellipsis for gaps
                  if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Diálogo de confirmação para exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir o cupom <strong>{selectedCoupon?.code}</strong>? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
