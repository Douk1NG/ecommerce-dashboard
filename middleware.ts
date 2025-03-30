import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

// Add paths that should be protected
const protectedPaths = [
    '/dashboard',
    '/products',
    '/categories',
    '/orders',
    '/settings'
]

const intlMiddleware = createIntlMiddleware(routing)

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')
    const { pathname } = request.nextUrl

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

    // If it's a protected path and there's no token, redirect to login
    if (isProtectedPath && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // If it's the login page and there's a token, redirect to dashboard
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Handle internationalization
    return intlMiddleware(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/(es|en)/:path*'
    ],
}