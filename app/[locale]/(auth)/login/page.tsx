'use client'

import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/modules/login/SubmitButton'
import { handleLogin } from './actions'

export default function Page() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error') ?? ''

    const errorMessage = error === 'missing_credentials'
        ? 'Email and password are required'
        : error === 'invalid_credentials'
            ? 'Invalid email or password'
            : null

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
                </div>
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                        {errorMessage}
                    </div>
                )}
                <form className="space-y-4" action={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1"
                        />
                    </div>
                    <SubmitButton />
                </form>
                <div className="text-center text-sm">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    )
}
