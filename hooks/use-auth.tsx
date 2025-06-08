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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser()
        const token = authService.getToken()

        if (currentUser && token) {
          // Verify token is still valid by fetching fresh user data
          try {
            const freshUserData = await authService.fetchUserProfile()
            setUser(freshUserData)
          } catch (error) {
            // Token is invalid, clear auth
            authService.logout()
            setUser(null)
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Handle OAuth callback if present in URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const error = urlParams.get("error")

    if (error) {
      console.error("OAuth error:", error)
      setIsLoading(false)
      return
    }

    if (code) {
      handleOAuthCallback(code)
    }
  }, [])

  const handleOAuthCallback = async (code: string) => {
    try {
      setIsLoading(true)
      const userData = await authService.handleOAuthCallback(code)
      setUser(userData)

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)

      // Redirect based on user role
      redirectAfterLogin(userData.role)
    } catch (error) {
      console.error("OAuth callback error:", error)
      router.push("/login?error=auth_failed")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async () => {
    try {
      setIsLoading(true)
      await authService.loginWithGoogle()
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      throw error
    }
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
