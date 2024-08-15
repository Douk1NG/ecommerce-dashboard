import { Locale } from "@/i18n";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next/types";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "orders" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function OrdersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}