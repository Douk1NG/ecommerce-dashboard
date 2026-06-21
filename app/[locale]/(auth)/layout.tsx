import { Toaster } from '@/components/ui/toaster'
import type { BaseLayoutProps } from '@/src/shared/types/layout'

export default function AuthLayout({ children }: BaseLayoutProps) {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}
