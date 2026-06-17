import Layout from "@/components/layout";
import Table from "@/src/features/inventory/components/InventoryTable";
import constants from "@/src/shared/constants/inventory";

import {
    getInventory
} from "@/src/features/inventory/inventoryServices";

export default async function Page() {
    const datasource = await getInventory()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={{
                title: 'inventory.layout.title',
                description: 'inventory.layout.description'
            }}
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}