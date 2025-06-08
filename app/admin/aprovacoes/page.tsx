"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Eye, FileText, MapPin, Phone, Mail } from "lucide-react"

export default function ApprovacoesPage() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const pendingStores = [
    {
      id: 1,
      storeName: "Frutas do Vale",
      email: "contato@frutasdovale.com",
      cnpj: "12.345.678/0001-90",
      requestDate: "2024-01-15",
      address: "Rua das Frutas, 123 - São Paulo, SP",
      phone: "(11) 99999-9999",
      documents: ["CNPJ", "Alvará", "Contrato Social"],
    },
    {
      id: 2,
      storeName: "Hortifrúti Central",
      email: "admin@hortifruticentral.com",
      cnpj: "98.765.432/0001-10",
      requestDate: "2024-01-14",
      address: "Av. Central, 456 - Rio de Janeiro, RJ",
      phone: "(21) 88888-8888",
      documents: ["CNPJ", "Alvará", "Contrato Social"],
    },
  ]

  const pendingDrivers = [
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos.silva@email.com",
      cpf: "123.456.789-00",
      requestDate: "2024-01-15",
      phone: "(11) 77777-7777",
      vehicle: "Moto Honda CG 160",
      documents: ["CNH", "CRLV", "Comprovante de Residência"],
    },
    {
      id: 2,
      name: "Ana Santos",
      email: "ana.santos@email.com",
      cpf: "987.654.321-00",
      requestDate: "2024-01-14",
      phone: "(11) 66666-6666",
      vehicle: "Bicicleta Elétrica",
      documents: ["RG", "CPF", "Comprovante de Residência"],
    },
  ]

  const openApplicationSheet = (application: any, type: "store" | "driver") => {
    setSelectedApplication({ ...application, type })
    setSheetOpen(true)
  }

  const approveApplication = () => {
    console.log("Aprovando solicitação:", selectedApplication)
    setSheetOpen(false)
    setSelectedApplication(null)
  }

  const rejectApplication = () => {
    console.log("Rejeitando solicitação:", selectedApplication)
    setSheetOpen(false)
    setSelectedApplication(null)
  }

  return (
    <>
      <AdminHeader title="Aprovações de Parceiros" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="lojistas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lojistas">Lojistas Pendentes</TabsTrigger>
            <TabsTrigger value="entregadores">Entregadores Pendentes</TabsTrigger>
          </TabsList>

          <TabsContent value="lojistas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Lojistas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Loja</TableHead>
                      <TableHead>E-mail de Contato</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Data da Solicitação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingStores.map((store) => (
                      <TableRow key={store.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{store.storeName}</TableCell>
                        <TableCell>{store.email}</TableCell>
                        <TableCell>{store.cnpj}</TableCell>
                        <TableCell>{new Date(store.requestDate).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => openApplicationSheet(store, "store")}>
                            <Eye className="h-4 w-4 mr-2" />
                            Analisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entregadores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Entregadores</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Veículo</TableHead>
                      <TableHead>Data da Solicitação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDrivers.map((driver) => (
                      <TableRow key={driver.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.email}</TableCell>
                        <TableCell>{driver.cpf}</TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell>{new Date(driver.requestDate).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => openApplicationSheet(driver, "driver")}>
                            <Eye className="h-4 w-4 mr-2" />
                            Analisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Application Review Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="w-[600px] sm:max-w-[600px]">
            <SheetHeader>
              <SheetTitle>
                {selectedApplication?.type === "store" ? "Análise de Lojista" : "Análise de Entregador"}
              </SheetTitle>
            </SheetHeader>

            {selectedApplication && (
              <div className="space-y-6 py-4">
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={approveApplication} className="flex-1 bg-green-600 hover:bg-green-700">
                    Aprovar Solicitação
                  </Button>
                  <Button onClick={rejectApplication} variant="destructive" className="flex-1">
                    Rejeitar
                  </Button>
                </div>

                {/* Application Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Informações Básicas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedApplication.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedApplication.phone}</span>
                      </div>
                      {selectedApplication.type === "store" && (
                        <>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedApplication.address}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">CNPJ: </span>
                            <span className="text-sm">{selectedApplication.cnpj}</span>
                          </div>
                        </>
                      )}
                      {selectedApplication.type === "driver" && (
                        <>
                          <div>
                            <span className="text-sm font-medium">CPF: </span>
                            <span className="text-sm">{selectedApplication.cpf}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Veículo: </span>
                            <span className="text-sm">{selectedApplication.vehicle}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Documentos Enviados</h3>
                    <div className="space-y-2">
                      {selectedApplication.documents?.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
