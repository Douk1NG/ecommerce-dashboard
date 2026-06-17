import { getTranslations } from "next-intl/server";

import type { Metadata } from "next/types";
import type { BaseLayoutProps } from "@/src/shared/types/layout";

export async function generateMetadata(
    props: BaseLayoutProps
): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({
        locale
    });

    return {
        title: t('inventory.metadata.title'),
        description: t('inventory.metadata.description')
    };
}

export default async function Layout({
    children
}: BaseLayoutProps) {
    return children
}