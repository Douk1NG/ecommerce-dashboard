import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
