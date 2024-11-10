import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Layout from "@/templates/home"
import './globals.css'

import type { Locale } from "@/i18n";
import type { Metadata } from "next";
import type { GenerateMetadataProps } from "@/types/layout";

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
    form,
    params: { locale }
}: Props) => {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="layout">
                <NextIntlClientProvider messages={messages}>
                    <Layout>
                        {children}
                    </Layout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};


export default RootLayout;