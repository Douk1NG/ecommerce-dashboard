import '../globals.css'

import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import type { Metadata } from "next";
import type { GenerateMetadataProps } from "@/types/layout";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Nav from "@/components/nav";
import Header from "@/components/header";
import { Locale } from '@/i18n/routing';
import { cookies } from 'next/headers';

type Props = {
    children: React.ReactNode;
    form: React.ReactNode;
    params: Promise<{
        locale: Locale;
    }>;
};

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({ locale, namespace: "layout" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

const RootLayout: React.FC<Props> = async (props: Props) => {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    const messages = await getMessages();
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
    // todo: desde aca se puede obtener el form, de esa manera reutilizarlo en las paginas
    return (
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <Nav />
                    <SidebarInset>
                        <Header />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </NextIntlClientProvider>
        </html>
    );
};
export default RootLayout;
