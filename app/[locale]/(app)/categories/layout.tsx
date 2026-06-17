import { getTranslations } from "next-intl/server";

import type { Metadata } from "next/types";
import type { LayoutProps } from "@/src/shared/types/layout";

export async function generateMetadata(
    props: LayoutProps
): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({
        locale
    });

    return {
        title: t('categories.metadata.title'),
        description: t('categories.metadata.description')
    };
}

export default async function Layout({
    children,
    sidebar
}: LayoutProps) {
    return (
        <>
            {children}
            {sidebar}
        </>
    )
}