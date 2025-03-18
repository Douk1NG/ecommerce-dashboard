import Layout from "@/components/layout";
import Table from "@/components/modules/products/table";
import PRODUCTS_CONSTANTS from "@/constants/products";

import {
    getProducts
} from "@/services/products";

export default async function Page() {
    const datasource = await getProducts()

    return (
        <Layout
            module={PRODUCTS_CONSTANTS.NAMESPACE}
            action
        >
            <Table dataSource={datasource}/>
        </Layout>
    )
}