import { getTranslations } from "next-intl/server";
import PRODUCTS_CONSTANTS from "@/constants/products";
import LAYOUT_CONSTANTS from "@/constants/layout";
import type { Metadata } from "next/types";
import type { LayoutProps } from "@/types/layout";

export async function generateMetadata(
    props: LayoutProps
): Promise<Metadata> {
    const params = await props.params;
    const namespace = LAYOUT_CONSTANTS.METADATA.NAMESPACE
    const title = `${namespace}.${LAYOUT_CONSTANTS.METADATA.TITLE}`
    const description = `${namespace}.${LAYOUT_CONSTANTS.METADATA.DESCRIPTION}`

    const {
        locale
    } = params;

    const t = await getTranslations({
        locale,
        namespace: PRODUCTS_CONSTANTS.NAMESPACE
    });

    return {
        title: t(title),
        description: t(description)
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