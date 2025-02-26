import '../globals.css'

import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import type { Metadata } from "next";
import type { GenerateMetadataProps, BaseLayoutProps } from "@/types/layout";

import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";

import Nav from "@/components/nav";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster"

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

const RootLayout: React.FC<BaseLayoutProps> = async (props: BaseLayoutProps) => {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <SidebarProvider>
                        <Nav />
                        <SidebarInset>
                            <Header />
                            {children}
                            <Toaster />
                        </SidebarInset>
                    </SidebarProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
export default RootLayout;
