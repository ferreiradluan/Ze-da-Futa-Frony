"use client"

import { BarChart3, Users, Store, ShoppingCart, UserCheck, Megaphone, Shield } from "lucide-react"

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

// Menu items for the admin panel
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Aprovações",
    url: "/admin/aprovacoes",
    icon: UserCheck,
  },
  {
    title: "Usuários",
    url: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Lojas",
    url: "/admin/lojas",
    icon: Store,
  },
  {
    title: "Pedidos",
    url: "/admin/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Marketing",
    url: "/admin/marketing",
    icon: Megaphone,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#F28500]" />
          <div>
            <h2 className="font-semibold text-lg">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Zé da Fruta</p>
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
