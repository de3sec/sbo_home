"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication - in production, this should call your backend
    if (username === 'admin' && password === 'sbo2025') {
      localStorage.setItem('admin_token', 'authenticated')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 