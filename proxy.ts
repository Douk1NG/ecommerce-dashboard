import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Add paths that should be protected
const protectedPaths = [
    '/dashboard',
    '/products',
    '/categories',
    '/orders',
    '/settings'
];

const intlMiddleware = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
    // console.log('Middleware triggered for path:', request.nextUrl.pathname);
    // const token = request.cookies.get('auth_token');
    // const { pathname } = request.nextUrl;

    // // Remove locale prefix for path checking
    // const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    // console.log('Path without locale:', pathWithoutLocale);

    // // Check if the path is protected
    // const isProtectedPath = protectedPaths.some(path => pathWithoutLocale.startsWith(path));
    // console.log('Is protected path:', isProtectedPath);
    // console.log('Token exists:', !!token);

    // // If there's no token and it's not the login page, redirect to login
    // if (!token && pathWithoutLocale !== '/login') {
    //     console.log('No token found, redirecting to login');
    //     const loginUrl = new URL('/login', request.url);
    //     loginUrl.searchParams.set('from', pathname);
    //     return NextResponse.redirect(loginUrl);
    // }

    // // If there's a token and it's the login page, redirect to dashboard
    // if (token && pathWithoutLocale === '/login') {
    //     console.log('Token found, redirecting to dashboard');
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // // Handle internationalization
    // console.log('Proceeding with intl middleware');
    return intlMiddleware(request);
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
    ]
};
