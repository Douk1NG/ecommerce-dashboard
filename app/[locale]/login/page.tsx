import { PageProps } from "@/types/layout"
import Layout from "@/modules/components/filters"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Page(props: PageProps) {
    const { locale } = await props.params

    const submitUser = async (formData: FormData) => {
        'use server'
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
                </div>
                <form className="space-y-4" action={submitUser}>
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
                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                        Sign in
                    </Button>
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
