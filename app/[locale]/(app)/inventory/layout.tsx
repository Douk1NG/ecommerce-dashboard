import { getTranslations } from "next-intl/server";
import CONSTANTS from "@/constants/inventory";

import type { Metadata } from "next/types";
import type { BaseLayoutProps } from "@/types/layout";

export async function generateMetadata(
    props: BaseLayoutProps
): Promise<Metadata> {
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

export default async function Layout({
    children
}: BaseLayoutProps) {
    return children
}