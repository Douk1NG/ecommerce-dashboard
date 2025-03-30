import { getTranslations } from "next-intl/server";
import translations from "@/constants/translations/login";
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
        locale
    });

    return {
        title: t(translations.metadata.title),
        description: t(translations.metadata.description)
    };
}

export default async function Layout({ children }: BaseLayoutProps) {
    return children
}