import { getTranslations } from "next-intl/server";

import type { Metadata } from "next/types";
import type { GenerateMetadataProps, LayoutProps } from "@/types/layout";

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({
        locale,
        namespace: "filters"
    });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
    };
}

export default function FiltersLayout({
    children,
}: LayoutProps) {
    return <>{children}</>
}