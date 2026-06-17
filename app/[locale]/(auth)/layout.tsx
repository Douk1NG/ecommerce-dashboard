import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Toaster } from "@/components/ui/toaster"
import type { BaseLayoutProps } from "@/src/shared/types/layout"

const AuthLayout: React.FC<BaseLayoutProps> = async (props: BaseLayoutProps) => {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

export default AuthLayout;