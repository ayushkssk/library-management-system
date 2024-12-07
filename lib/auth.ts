import { createContext, useContext } from 'react'

interface User {
  id: string
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export async function authenticate(username: string, password: string): Promise<boolean> {
  // In a real app, this would be an API call
  if (username === 'ayush' && password === 'ayush') {
    return true
  }
  return false
}

