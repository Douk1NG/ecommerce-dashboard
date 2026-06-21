import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { auth } from '@/auth'
import { routing } from './i18n/routing'

const protectedPaths = [
  '/dashboard',
  '/products',
  '/categories',
  '/filters',
  '/inventory',
  '/inflow',
  '/outflow',
]

const intlMiddleware = createIntlMiddleware(routing)

function getPathWithoutLocale(pathname: string) {
  return pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
}

function getLocaleFromPath(pathname: string) {
  const match = pathname.match(/^\/(en|es)(?=\/|$)/)
  return match?.[1] ?? routing.defaultLocale
}

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl
  const pathWithoutLocale = getPathWithoutLocale(pathname)
  const locale = getLocaleFromPath(pathname)

  const isLoginPage = pathWithoutLocale === '/login' || pathWithoutLocale.startsWith('/login/')
  const isProtectedPath = protectedPaths.some((path) => pathWithoutLocale.startsWith(path))

  if (isProtectedPath && !session?.user) {
    const loginUrl = new URL(`/${locale}/login`, request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && session?.user) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
    '/(es|en)/:path*',
  ],
}
