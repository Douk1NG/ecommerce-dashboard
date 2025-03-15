import { getTranslations } from "next-intl/server";
import CONSTANTS from "@/constants/login";
import { default as LIB_CONSTANTS } from "@/constants/layout";

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
        title: t(LIB_CONSTANTS.METADATA.TITLE),
        description: t(LIB_CONSTANTS.METADATA.DESCRIPTION)
    };
}

export default async function Layout({ children }: BaseLayoutProps) {
    return children
}