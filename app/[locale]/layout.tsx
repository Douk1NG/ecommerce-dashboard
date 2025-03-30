import '../globals.css'
import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { AuthProvider } from "@/context/auth"
import type { BaseLayoutProps } from "@/types/layout"

const RootLayout: React.FC<BaseLayoutProps> = async (props: BaseLayoutProps) => {
    const params = await props.params
    const { locale } = params
    const { children } = props
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default RootLayout
