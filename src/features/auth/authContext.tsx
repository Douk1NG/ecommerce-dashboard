'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/src/shared/types/nav'
import { getCurrentUser } from '@/src/features/auth/authServices'

type AuthContextType = {
    user: User | null
    token: string | null
    setAuth: (user: User, token: string) => void
    clearAuth: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
            setToken(storedToken)
            getCurrentUser(storedToken).then(user => {
                setUser(user)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const setAuth = (user: User, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('auth_token', token)
    }

    const clearAuth = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('auth_token')
    }

    return (
        <AuthContext.Provider value={{ user, token, setAuth, clearAuth, isLoading }}>
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