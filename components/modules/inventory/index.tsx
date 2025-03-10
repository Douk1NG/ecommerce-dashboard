import Layout from "@/components/layout";
import CONSTANTS from "@/constants/inventory";
import Table from "@/components/modules/inventory/table";
import { getInventory } from "@/services/inventory";
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