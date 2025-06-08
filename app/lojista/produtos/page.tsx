"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { AddProductSheet } from "@/components/add-product-sheet"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  active: boolean
  image: string
  category: string
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Morango Bandeja",
      price: 12.99,
      stock: 25,
      active: true,
      image: "/placeholder.svg?height=60&width=60&text=Morango",
      category: "Frutas Vermelhas",
    },
    {
      id: 2,
      name: "Laranja Pera",
      price: 7.99,
      stock: 50,
      active: true,
      image: "/placeholder.svg?height=60&width=60&text=Laranja",
      category: "Frutas Cítricas",
    },
    {
      id: 3,
      name: "Manga Palmer",
      price: 6.99,
      stock: 0,
      active: false,
      image: "/placeholder.svg?height=60&width=60&text=Manga",
      category: "Frutas Tropicais",
    },
    {
      id: 4,
      name: "Limão Tahiti",
      price: 5.99,
      stock: 30,
      active: true,
      image: "/placeholder.svg?height=60&width=60&text=Limão",
      category: "Frutas Cítricas",
    },
    {
      id: 5,
      name: "Abacaxi Pérola",
      price: 9.99,
      stock: 15,
      active: true,
      image: "/placeholder.svg?height=60&width=60&text=Abacaxi",
      category: "Frutas Tropicais",
    },
  ])

  const [addProductSheetOpen, setAddProductSheetOpen] = useState(false)

  const toggleProductStatus = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, active: !product.active } : product)))
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Sem estoque", variant: "destructive" as const }
    if (stock < 10) return { label: "Estoque baixo", variant: "secondary" as const }
    return { label: "Em estoque", variant: "default" as const }
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Produtos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Gerenciar Produtos</h1>
          <Button className="bg-[#F28500] hover:bg-[#E07600]" onClick={() => setAddProductSheetOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-12 w-12">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-[#F28500] font-medium">R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{product.stock} unidades</span>
                        <Badge variant={stockStatus.variant} className="w-fit">
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={product.active} onCheckedChange={() => toggleProductStatus(product.id)} />
                        <span className="text-sm text-muted-foreground">{product.active ? "Ativo" : "Inativo"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddProductSheet
        isOpen={addProductSheetOpen}
        onOpenChange={setAddProductSheetOpen}
        onProductAdd={(product) => {
          console.log("Novo produto adicionado:", product)
          // Aqui você pode adicionar a lógica para atualizar a lista de produtos
        }}
      />
    </>
  )
}
