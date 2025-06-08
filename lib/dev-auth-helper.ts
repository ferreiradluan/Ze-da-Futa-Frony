// Development helper for testing authentication
// This file should NOT be used in production

"use client"

import type { User } from "./auth"

export const DEV_MODE = process.env.NODE_ENV === "development"

// Mock user data for development testing
export const MOCK_USER: User = {
  id: "dev-user-123",
  email: "usuario.teste@exemplo.com",
  name: "Usuário de Teste",
  role: "CLIENTE",
  phone: "(11) 99999-9999",
  document: "123.456.789-00",
  createdAt: new Date().toISOString(),
  avatar: "/placeholder-user.jpg",
}

// Mock JWT token for development
export const MOCK_TOKEN = "mock-jwt-token-for-development-only"

// Helper functions for development testing
export const devAuthHelpers = {
  // Simulate successful login
  simulateLogin: () => {
    if (!DEV_MODE) {
      console.warn("Development auth helpers should only be used in development mode")
      return
    }
    
    localStorage.setItem("authToken", MOCK_TOKEN)
    localStorage.setItem("userData", JSON.stringify(MOCK_USER))
    
    console.log("✅ Simulated login successful")
    console.log("User:", MOCK_USER)
    
    // Trigger a storage event to update other tabs/components
    window.dispatchEvent(new StorageEvent("storage", {
      key: "authToken",
      newValue: MOCK_TOKEN,
    }))
  },

  // Simulate logout
  simulateLogout: () => {
    if (!DEV_MODE) {
      console.warn("Development auth helpers should only be used in development mode")
      return
    }
    
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    
    console.log("✅ Simulated logout successful")
    
    // Trigger a storage event to update other tabs/components
    window.dispatchEvent(new StorageEvent("storage", {
      key: "authToken",
      newValue: null,
    }))
  },

  // Check current auth state
  checkAuthState: () => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")
    
    console.log("🔍 Current auth state:")
    console.log("Token:", token ? "Present" : "Not found")
    console.log("User data:", userData ? JSON.parse(userData) : "Not found")
    
    return {
      hasToken: !!token,
      hasUserData: !!userData,
      userData: userData ? JSON.parse(userData) : null,
    }
  },

  // Clear all auth data
  clearAuth: () => {
    if (!DEV_MODE) {
      console.warn("Development auth helpers should only be used in development mode")
      return
    }
    
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    console.log("🧹 Cleared all auth data")
  },
}

// Global helpers for browser console
if (DEV_MODE && typeof window !== "undefined") {
  (window as any).devAuth = devAuthHelpers
  console.log("🛠️ Development auth helpers available as window.devAuth")
  console.log("Available methods: simulateLogin, simulateLogout, checkAuthState, clearAuth")
}
