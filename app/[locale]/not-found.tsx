import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">404 — Page not found</h1>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                Go home
            </Link>
        </div>
    )
}
