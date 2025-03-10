import Layout from "@/components/layout";
import CONSTANTS from "@/constants/products";
import Table from "@/components/modules/products/table";

import {
    getProducts
} from "@/services/products";

import {
    getTranslations
} from "next-intl/server";

import type {
    StaticPageProps
} from "@/types/layout";

export default async function Page(
    props: StaticPageProps
) {
    const datasource = await getProducts()

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
            description={t(CONSTANTS.LAYOUT.DESCRIPTION)}
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}