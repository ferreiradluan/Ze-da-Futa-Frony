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
  refreshUser: () => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<void>
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
      return freshUserData
    } catch (error) {
      console.error("Error fetching user:", error)
      // Only clear auth if it's a 401 or authentication error
      if (error instanceof Error && (error.message.includes("401") || error.message.includes("authentication"))) {
        authService.logout()
        setUser(null)
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // On mount, and whenever token changes, fetch user
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken()
      if (token) {
        try {
          await fetchAndSetUser()
        } catch (error) {
          // User will be set to null in fetchAndSetUser on auth errors
          setIsLoading(false)
        }
      } else {
        // Try to get user from localStorage as fallback
        const storedUserData = localStorage.getItem("userData")
        if (storedUserData) {
          try {
            const userData = JSON.parse(storedUserData)
            setUser(userData)
          } catch (error) {
            console.error("Error parsing stored user data:", error)
            localStorage.removeItem("userData")
          }
        }
        setUser(null)
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for token changes in other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          fetchAndSetUser().catch(() => {
            // Handle error silently, user state will be updated in fetchAndSetUser
          })
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

  // Método para atualizar perfil do usuário
  const updateProfile = async (profileData: Partial<User>) => {
    setIsLoading(true)
    try {
      const updatedUser = await authService.updateUserProfile(profileData)
      setUser(updatedUser)
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
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
        refreshUser,
        updateProfile,
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
