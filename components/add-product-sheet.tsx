"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface Product {
  name: string
  description: string
  price: string
  unit: string
  stock: string
  available: boolean
  image: File | null
}

interface AddProductSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onProductAdd?: (product: Product) => void
}

export function AddProductSheet({ isOpen, onOpenChange, onProductAdd }: AddProductSheetProps) {
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: "",
    unit: "",
    stock: "",
    available: true,
    image: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }))
  }

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setFormData((prev) => ({ ...prev, image: file }))
    } else {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      })
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, image: null }))
  }

  const handleSubmit = () => {
    // Validação básica
    if (!formData.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome do produto.",
        variant: "destructive",
      })
      return
    }

    if (!formData.price.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o preço do produto.",
        variant: "destructive",
      })
      return
    }

    if (!formData.unit.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha a unidade de medida.",
        variant: "destructive",
      })
      return
    }

    if (!formData.stock.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha a quantidade em estoque.",
        variant: "destructive",
      })
      return
    }

    // Validação de preço
    const priceValue = Number.parseFloat(formData.price.replace(",", "."))
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Preço inválido",
        description: "Por favor, insira um preço válido.",
        variant: "destructive",
      })
      return
    }

    // Validação de estoque
    const stockValue = Number.parseInt(formData.stock)
    if (isNaN(stockValue) || stockValue < 0) {
      toast({
        title: "Estoque inválido",
        description: "Por favor, insira uma quantidade válida.",
        variant: "destructive",
      })
      return
    }

    // Simular salvamento do produto
    console.log("Produto a ser salvo:", formData)

    if (onProductAdd) {
      onProductAdd(formData)
    }

    toast({
      title: "Produto adicionado",
      description: "O produto foi adicionado com sucesso ao seu catálogo.",
    })

    // Resetar formulário
    setFormData({
      name: "",
      description: "",
      price: "",
      unit: "",
      stock: "",
      available: true,
      image: null,
    })
    setImagePreview(null)
    onOpenChange(false)
  }

  const formatPrice = (value: string) => {
    // Remove caracteres não numéricos exceto vírgula e ponto
    const numericValue = value.replace(/[^\d,.]/g, "")
    return numericValue
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPrice(e.target.value)
    setFormData((prev) => ({ ...prev, price: formattedValue }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Adicionar Novo Produto</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Imagem do Produto</Label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-gray-200">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview do produto"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`relative h-48 w-full border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                    isDragOver ? "border-[#F28500] bg-orange-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="h-12 w-12 mb-4" />
                    <p className="text-sm font-medium mb-1">Clique para fazer upload</p>
                    <p className="text-xs">ou arraste e solte uma imagem aqui</p>
                    <p className="text-xs mt-2">PNG, JPG até 5MB</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Nome do Produto */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome do Produto *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Morango Bandeja"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descreva seu produto, suas características e benefícios..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full min-h-[100px] resize-none"
            />
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Preço *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">R$</span>
              <Input
                id="price"
                name="price"
                placeholder="0,00"
                value={formData.price}
                onChange={handlePriceChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Unidade de Medida */}
          <div className="space-y-2">
            <Label htmlFor="unit" className="text-sm font-medium">
              Unidade de Medida *
            </Label>
            <Input
              id="unit"
              name="unit"
              placeholder="Ex: Kg, Unidade, Bandeja, Maço"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Quantidade em Estoque */}
          <div className="space-y-2">
            <Label htmlFor="stock" className="text-sm font-medium">
              Quantidade em Estoque *
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {/* Produto Disponível */}
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="available" className="text-sm font-medium">
                Produto Disponível?
              </Label>
              <p className="text-xs text-gray-500">Desative para ocultar o produto da loja</p>
            </div>
            <Switch id="available" checked={formData.available} onCheckedChange={handleSwitchChange} />
          </div>
        </div>

        <SheetFooter className="border-t pt-6">
          <div className="flex gap-3 w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-[#F28500] hover:bg-[#E07600] text-white font-medium">
              Salvar Produto
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
