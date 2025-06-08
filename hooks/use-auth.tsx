"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => Promise<void>
  loginPartner: (userType: "lojista" | "entregador") => Promise<void>
  loginAdmin: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: User["role"]) => boolean
  refreshUser: () => Promise<void> // novo método
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Helper to fetch and set user from backend
  const fetchAndSetUser = async () => {
    setIsLoading(true)
    try {
      const freshUserData = await authService.fetchUserProfile()
      setUser(freshUserData)
      localStorage.setItem("userData", JSON.stringify(freshUserData))
    } catch (error) {
      authService.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // On mount, and whenever token changes, fetch user
  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      fetchAndSetUser()
    } else {
      setUser(null)
      setIsLoading(false)
    }
    // Listen for token changes in other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          fetchAndSetUser()
        } else {
          setUser(null)
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const login = async () => {
    setIsLoading(true)
    await authService.loginWithGoogle()
    // Redirecionamento ocorre fora
  }

  const loginPartner = async (userType: "lojista" | "entregador") => {
    try {
      setIsLoading(true)
      await authService.loginPartner(userType)
    } catch (error) {
      console.error("Partner login error:", error)
      setIsLoading(false)
      throw error
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const userData = await authService.loginAdmin(email, password)
      setUser(userData)
      redirectAfterLogin(userData.role)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken")

    // Clear auth service state
    authService.logout()
    setUser(null)

    // Redirect to login
    router.push("/login")
  }

  const hasRole = (role: User["role"]): boolean => {
    return authService.hasRole(role)
  }

  const redirectAfterLogin = (role: User["role"]) => {
    switch (role) {
      case "ADMIN":
        router.push("/admin")
        break
      case "LOJISTA":
        router.push("/lojista")
        break
      case "ENTREGADOR":
        router.push("/entregador")
        break
      case "CLIENTE":
      default:
        router.push("/lojas")
        break
    }
  }

  // Expor método para forçar refresh do usuário
  const refreshUser = async () => {
    await fetchAndSetUser()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginPartner,
        loginAdmin,
        logout,
        hasRole,
        refreshUser, // novo método
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
