import { getTranslations } from "next-intl/server";

import type { GenerateMetadataProps, LayoutProps } from "@/types/layout";
import type { Metadata } from "next/types";

export async function generateMetadata({
    params: { locale }
}: GenerateMetadataProps): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "orders" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function OrdersLayout({
    children,
}: LayoutProps) {
    return <>{children}</>
}