import Layout from "@/components/layout";

import CONSTANTS from "@/constants/categories";
import Table from "@/components/modules/categories/table";
import { getCategories } from "@/services/categories";
import { getTranslations } from "next-intl/server";
import type { StaticPageProps } from "@/types/layout";

export default async function Page(
    props: StaticPageProps
) {
    const datasource = await getCategories()

    const t = await getTranslations({
        locale: props.locale,
        namespace: CONSTANTS.NAMESPACE
    });

    return (
        <Layout
            title={t(CONSTANTS.LAYOUT.TITLE)}
            action={{
                title: t(CONSTANTS.LAYOUT.ADD),
                href: CONSTANTS.LAYOUT.LINK
            }}
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}