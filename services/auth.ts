import { User } from "@/types/nav"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export type LoginCredentials = {
    email: string
    password: string
}

export type AuthResponse = {
    user: User
    token: string
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        // const response = await fetch(`${API_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify(credentials),
        // })

        // if (!response.ok) {
        //     throw new Error('Invalid credentials')
        // }

        // const data = await response.json()
        // return data
        return {
            user: {
                username: 'John Doe',
                email: 'john.doe@example.com',
            },
            token: '1234567890',
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const logout = async (token: string): Promise<void> => {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })
    } catch (error) {
        throw error
    }
}

export const getCurrentUser = async (token: string): Promise<User | null> => {
    try {
        const response = await fetch(`${API_URL}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
} 