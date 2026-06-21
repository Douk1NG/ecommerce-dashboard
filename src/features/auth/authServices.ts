import type { User } from '@/src/shared/types/nav'
import { auth } from '@/auth'

export type LoginCredentials = {
  email: string
  password: string
}

export async function getSessionUser(): Promise<User | null> {
  const session = await auth()

  if (!session?.user?.email) {
    return null
  }

  return {
    username: session.user.name ?? session.user.email,
    email: session.user.email,
  }
}
