'use server'

import { AuthError } from 'next-auth'
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { signIn } from '@/auth'

export async function handleLogin(formData: FormData) {
  const locale = await getLocale()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect(`/${locale}/login?error=missing_credentials`)
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/${locale}/login?error=invalid_credentials`)
    }

    throw error
  }

  redirect(`/${locale}/dashboard`)
}
