"use client"

// Types for authentication
export interface User {
  id: string
  email: string
  name: string
  role: "ADMIN" | "CLIENTE" | "LOJISTA" | "ENTREGADOR"
  avatar?: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

// API Base URL
const API_BASE_URL = "https://meu-ze-da-fruta-backend-8c4976f28553.herokuapp.com"

// Google OAuth URLs
const GOOGLE_OAUTH_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount"
const GOOGLE_CLIENT_ID = "287729540374-eq0mt4hrca6lb13i8s2u11t3kqejpvhq.apps.googleusercontent.com"

const buildGoogleOAuthURL = (userType?: "lojista" | "entregador") => {
  const baseParams = {
    response_type: "code",
    redirect_uri: `${API_BASE_URL}/auth/google/callback`,
    scope: "email profile",
    client_id: GOOGLE_CLIENT_ID,
    service: "lso",
    o2v: "2",
    flowName: "GeneralOAuthFlow",
  }

  // Add state parameter to identify user type for partner registration
  if (userType) {
    baseParams["state"] = userType
  }

  const params = new URLSearchParams(baseParams)
  return `${GOOGLE_OAUTH_BASE_URL}?${params.toString()}`
}

// Auth service class
export class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private user: User | null = null

  private constructor() {
    // Initialize from localStorage on client side
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("authToken")
      const userData = localStorage.getItem("userData")
      if (userData) {
        try {
          this.user = JSON.parse(userData)
        } catch (error) {
          console.error("Error parsing user data:", error)
          this.clearAuth()
        }
      }
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // Google OAuth login for customers
  async loginWithGoogle(): Promise<void> {
    try {
      window.location.href = buildGoogleOAuthURL()
    } catch (error) {
      console.error("Error initiating Google login:", error)
      throw new Error("Falha ao iniciar login com Google")
    }
  }

  // Google OAuth login for partners (lojista/entregador)
  async loginPartner(userType: "lojista" | "entregador"): Promise<void> {
    try {
      window.location.href = buildGoogleOAuthURL(userType)
    } catch (error) {
      console.error("Error initiating partner login:", error)
      throw new Error("Falha ao iniciar cadastro de parceiro")
    }
  }

  // Handle OAuth callback (called when user returns from Google)
  async handleOAuthCallback(code: string): Promise<User> {
    try {
      // Send the authorization code to our backend
      const response = await fetch(`${API_BASE_URL}/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("Failed to authenticate with Google")
      }

      const data: AuthResponse = await response.json()

      // Store token and user data
      this.token = data.access_token
      this.user = data.user
      localStorage.setItem("authToken", data.access_token)
      localStorage.setItem("userData", JSON.stringify(data.user))

      return data.user
    } catch (error) {
      console.error("Error handling OAuth callback:", error)
      this.clearAuth()
      throw new Error("Falha ao processar login")
    }
  }

  // Fetch user profile
  async fetchUserProfile(): Promise<User> {
    if (!this.token) {
      throw new Error("No authentication token")
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user profile")
    }

    return response.json()
  }

  // Admin login with email/password
  async loginAdmin(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Credenciais inválidas")
      }

      const data: AuthResponse = await response.json()

      // Store token and user data
      this.token = data.access_token
      this.user = data.user
      localStorage.setItem("authToken", data.access_token)
      localStorage.setItem("userData", JSON.stringify(data.user))

      return data.user
    } catch (error) {
      console.error("Error in admin login:", error)
      throw error
    }
  }

  // Logout
  logout(): void {
    // Simple logout - just remove the token
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
    }
    this.token = null
    this.user = null
  }

  // Clear authentication data
  private clearAuth(): void {
    this.token = null
    this.user = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken")
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.user
  }

  // Get auth token
  getToken(): string | null {
    return this.token
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token && !!this.user
  }

  // Check if user has specific role
  hasRole(role: User["role"]): boolean {
    return this.user?.role === role
  }

  // Make authenticated API request
  async apiRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()
