import Layout from "@/components/layout";
import Table from "@/components/modules/inventory/table";
import constants from "@/constants/inventory";
import translations from "@/constants/translations/inventory";

import {
    getInventory
} from "@/services/inventory";

export default async function Page() {
    const datasource = await getInventory()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={translations.layout}
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}