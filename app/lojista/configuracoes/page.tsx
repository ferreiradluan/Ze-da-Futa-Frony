import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function ConfiguracoesPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Configurações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-semibold">Configurações</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Loja</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nome da Loja</Label>
                  <Input id="store-name" defaultValue="Hortifrúti da Vovó" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Telefone</Label>
                  <Input id="store-phone" defaultValue="(11) 99999-9999" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">Endereço</Label>
                <Input id="store-address" defaultValue="Rua das Frutas, 123 - São Paulo, SP" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aceitar Pedidos</Label>
                  <p className="text-sm text-muted-foreground">Ativar ou desativar o recebimento de novos pedidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Tempo de Preparo (min)</Label>
                  <Input id="delivery-time" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Taxa de Entrega (R$)</Label>
                  <Input id="delivery-fee" type="number" step="0.01" defaultValue="4.99" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#F28500] hover:bg-[#E07600]">Salvar Configurações</Button>
          </div>
        </div>
      </div>
    </>
  )
}
