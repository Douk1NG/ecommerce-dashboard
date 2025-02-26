import Layout from "@/components/layout";
import CONSTANTS from "@/modules/constants/inflow";
import Table from "@/modules/tables/inflow";

import {
    getInflows
} from "@/modules/services/inflow";

import {
    getTranslations
} from "next-intl/server";

import type {
    StaticPageProps
} from "@/types/layout";

export default async function Page(
    props: StaticPageProps
) {
    const datasource = await getInflows()

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