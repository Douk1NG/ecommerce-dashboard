import { getTranslations } from "next-intl/server";

import type { Metadata } from "next/types";
import type { BaseLayoutProps } from "@/types/layout";

export async function generateMetadata(props: BaseLayoutProps): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({ locale, namespace: "orders" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function Layout({
    children,
}: BaseLayoutProps) {
    return children
}