import { getTranslations } from "next-intl/server";
import type { GenerateMetadataProps, LayoutProps } from "@/types/layout";
import type { Metadata } from "next/types";

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({ locale, namespace: "products" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function Layout({
    children,
}: LayoutProps) {
    return children
}