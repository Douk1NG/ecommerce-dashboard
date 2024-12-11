import { getTranslations } from "next-intl/server";
import Layout from "@/features/filters"
import CONSTANTS from "@/features/filters/resources/constants";

import type { Metadata } from "next/types";
import type { GenerateMetadataProps, LayoutProps } from "@/types/layout";

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({
        locale,
        namespace: CONSTANTS.NAMESPACE
    });

    return {
        title: t(CONSTANTS.METADATA.TITLE),
        description: t(CONSTANTS.METADATA.DESCRIPTION)
    };
}

export default function FiltersLayout({
    children,
}: LayoutProps) {
    return (
        <Layout>
            {children}
        </Layout>
    )
}