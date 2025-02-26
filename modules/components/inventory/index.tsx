import Layout from "@/components/layout";
import CONSTANTS from "@/modules/constants/inventory";
import Table from "@/modules/tables/inventory";
import { getInventory } from "@/modules/services/inventory";
import { getTranslations } from "next-intl/server";
import type { StaticPageProps } from "@/types/layout";

export default async function Page(
    props: StaticPageProps
) {
    const datasource = await getInventory()

    const t = await getTranslations({
        locale: props.locale,
        namespace: CONSTANTS.NAMESPACE
    });

    return (
        <Layout title={t(CONSTANTS.LAYOUT.TITLE)}>
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}