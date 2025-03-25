import { getTranslations } from "next-intl/server";
import translations from "@/constants/translations/products";
import type { Metadata } from "next/types";
import type { LayoutProps } from "@/types/layout";

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
        title: t(translations.layout.title),
        description: t(translations.layout.description)
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