import Layout from "@/components/layout";

import CONSTANTS from "@/modules/constants/filters";
import Table from "@/modules/tables/filters";
import { getFilters } from "@/modules/services/filters";
import { getTranslations } from "next-intl/server";
import type { StaticPageProps } from "@/types/layout";

export default async function Page(
    props: StaticPageProps
) {
    const datasource = await getFilters()

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