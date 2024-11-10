import { Locale } from "@/i18n";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next/types";
import Layout from "@/features/products"

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "products" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout>
            {children}
        </Layout>
    )
}