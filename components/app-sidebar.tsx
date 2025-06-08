"use client"

import { Home, ShoppingCart, Package, DollarSign, Settings, Store } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items for the store owner dashboard
const items = [
  {
    title: "Início",
    url: "/lojista",
    icon: Home,
  },
  {
    title: "Pedidos",
    url: "/lojista/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Produtos",
    url: "/lojista/produtos",
    icon: Package,
  },
  {
    title: "Finanças",
    url: "/lojista/financas",
    icon: DollarSign,
  },
  {
    title: "Configurações",
    url: "/lojista/configuracoes",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-[#F28500]" />
          <div>
            <h2 className="font-semibold text-lg">Painel do Lojista</h2>
            <p className="text-sm text-muted-foreground">Hortifrúti da Vovó</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
