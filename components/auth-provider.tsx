'use client'

import { useState } from 'react'
import { AuthContext, authenticate } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = async (username: string, password: string) => {
    const isAuthenticated = await authenticate(username, password)
    if (isAuthenticated) {
      setUser({ id: '1', username })
      router.push('/dashboard')
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
