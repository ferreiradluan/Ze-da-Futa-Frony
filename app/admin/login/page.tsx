"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Mail, Lock, Shield } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function AdminLoginPage() {
  const { loginAdmin, isLoading } = useAuth()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      await loginAdmin(credentials.email, credentials.password)
    } catch (error) {
      setError("Credenciais inválidas. Verifique seu email e senha.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link href="/">
                <Image src="/logo.png" alt="Zé da Fruta" width={140} height={70} className="h-14 w-auto cursor-pointer" />
              </Link>
            </div>

            {/* Title with Shield Icon */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-xl font-semibold text-slate-800">Acesso Administrativo</CardTitle>
            </div>
            <p className="text-sm text-slate-500">Área restrita para administradores</p>
          </CardHeader>

          <CardContent>
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@zedafruta.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6E9C45] hover:bg-[#5A8037] text-white font-medium py-2.5 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                Acesso monitorado e registrado para fins de segurança
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Warning */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Esta área é destinada exclusivamente para administradores do sistema.
            <br />
            Acesso não autorizado é proibido e será reportado.
          </p>
        </div>
      </div>
    </div>
  )
}
