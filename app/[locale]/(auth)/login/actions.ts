'use server'

import { login } from '@/services/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        redirect('/login?error=missing_credentials')
    }

    try {
        const response = await login({ email, password })

        // Store the token in an HTTP-only cookie
        const cookieStore = await cookies()
        cookieStore.set('auth_token', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        redirect('/')
    } catch (error) {
        redirect('/login?error=invalid_credentials')
    }
} 