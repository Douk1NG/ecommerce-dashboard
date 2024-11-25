import '../globals.css'

import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import type { Metadata } from "next";
import type { GenerateMetadataProps } from "@/types/layout";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Nav from "@/components/nav";
import Header from "@/components/header";
import { Locale } from '@/i18n/routing';

type Props = {
    children: React.ReactNode;
    form: React.ReactNode;
    params: {
        locale: Locale;
    };
};

export async function generateMetadata({
    params: { locale },
}: GenerateMetadataProps): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "home" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

const RootLayout: React.FC<Props> = async ({
    children,
    params: { locale }
}: Props) => {
    const messages = await getMessages();

    // todo: desde aca se puede obtener el form, de esa manera reutilizarlo en las paginas
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <SidebarProvider>
                        <Nav />
                        <SidebarInset>
                            <Header />
                            <main className="col-span-full md:col-[2] row-[2] overflow-auto h-full px-4 py-6 lg:px-8">
                                {children}
                            </main>
                        </SidebarInset>
                    </SidebarProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
export default RootLayout;