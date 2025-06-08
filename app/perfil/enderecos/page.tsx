"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, MoreVertical, MapPin, Home, Building2, Briefcase, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"

interface Address {
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
  icon: "home" | "building" | "briefcase"
}

export default function MeusEnderecos() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([
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
      icon: "home",
    },
    {
      id: "2",
      name: "Trabalho",
      street: "Avenida Paulista",
      number: "1000",
      complement: "Sala 1010",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      isMain: false,
      icon: "briefcase",
    },
    {
      id: "3",
      name: "Apartamento da Mãe",
      street: "Rua dos Girassóis",
      number: "456",
      neighborhood: "Vila Mariana",
      city: "São Paulo",
      state: "SP",
      zipCode: "04567-890",
      isMain: false,
      icon: "building",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<Partial<Address>>({
    name: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    isMain: false,
    icon: "home",
  })

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address)
      setFormData({ ...address })
    } else {
      setEditingAddress(null)
      setFormData({
        name: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
        isMain: false,
        icon: "home",
      })
    }
    setIsDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (icon: "home" | "building" | "briefcase") => {
    setFormData((prev) => ({ ...prev, icon }))
  }

  const handleMainChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isMain: checked }))
  }

  const handleSaveAddress = () => {
    if (
      !formData.name ||
      !formData.street ||
      !formData.number ||
      !formData.neighborhood ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    let updatedAddresses = [...addresses]

    // If setting as main address, update other addresses
    if (formData.isMain) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isMain: false,
      }))
    }

    if (editingAddress) {
      // Edit existing address
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === editingAddress.id ? ({ ...formData, id: addr.id } as Address) : addr,
      )
      toast({
        title: "Endereço atualizado",
        description: "Seu endereço foi atualizado com sucesso.",
      })
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
      } as Address
      updatedAddresses.push(newAddress)
      toast({
        title: "Endereço adicionado",
        description: "Seu novo endereço foi adicionado com sucesso.",
      })
    }

    // If no main address is set, set the first one as main
    if (!updatedAddresses.some((addr) => addr.isMain)) {
      updatedAddresses[0].isMain = true
    }

    setAddresses(updatedAddresses)
    setIsDialogOpen(false)
  }

  const handleRemoveAddress = (id: string) => {
    const addressToRemove = addresses.find((addr) => addr.id === id)
    const isMainAddress = addressToRemove?.isMain

    const updatedAddresses = addresses.filter((addr) => addr.id !== id)

    // If removed address was main, set the first remaining address as main
    if (isMainAddress && updatedAddresses.length > 0) {
      updatedAddresses[0].isMain = true
    }

    setAddresses(updatedAddresses)
    toast({
      title: "Endereço removido",
      description: "O endereço foi removido com sucesso.",
    })
  }

  const getAddressIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <Home className="h-5 w-5" />
      case "building":
        return <Building2 className="h-5 w-5" />
      case "briefcase":
        return <Briefcase className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meus Endereços</h2>
        <Button onClick={() => handleOpenDialog()} className="bg-[#F28500] hover:bg-[#E07600]">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Novo Endereço
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
          <p className="text-gray-500 mb-4">Adicione seu primeiro endereço para facilitar suas compras.</p>
          <Button onClick={() => handleOpenDialog()} className="bg-[#F28500] hover:bg-[#E07600]">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Endereço
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">{getAddressIcon(address.icon)}</div>
                    <div>
                      <h3 className="font-medium text-lg">{address.name}</h3>
                      {address.isMain && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Principal</Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(address)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemoveAddress(address.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 text-gray-700">
                  <p>
                    {address.street}, {address.number}
                    {address.complement && `, ${address.complement}`}
                  </p>
                  <p>
                    {address.neighborhood} - {address.city}/{address.state}
                  </p>
                  <p>CEP: {address.zipCode}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog para adicionar/editar endereço */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Editar Endereço" : "Adicionar Novo Endereço"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Nome do endereço</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Casa, Trabalho"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-4 items-center">
              <Label>Ícone</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.icon === "home" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleIconChange("home")}
                >
                  <Home className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant={formData.icon === "building" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleIconChange("building")}
                >
                  <Building2 className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant={formData.icon === "briefcase" ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => handleIconChange("briefcase")}
                >
                  <Briefcase className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="00000-000"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="UF"
                  maxLength={2}
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                name="city"
                placeholder="Sua cidade"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                name="street"
                placeholder="Nome da rua"
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="123"
                  value={formData.number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  placeholder="Apto, Bloco, etc (opcional)"
                  value={formData.complement}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                placeholder="Seu bairro"
                value={formData.neighborhood}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="isMain" checked={formData.isMain} onCheckedChange={handleMainChange} />
              <Label htmlFor="isMain" className="cursor-pointer">
                Definir como endereço principal
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveAddress} className="bg-[#F28500] hover:bg-[#E07600]">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  )
}
