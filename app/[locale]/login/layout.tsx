import { getTranslations } from "next-intl/server";
import CONSTANTS from "@/modules/constants/login";
import { default as LIB_CONSTANTS } from "@/lib/constants";

import type { Metadata } from "next/types";

import type {
    GenerateMetadataProps,
    LayoutProps
} from "@/types/layout";

export async function generateMetadata(
    props: GenerateMetadataProps
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

export default async function Layout({children}: LayoutProps) {
    return children
}