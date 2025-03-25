import Layout from "@/components/layout";
import Table from "@/components/modules/products/table";
import translations from "@/constants/translations/products";
import constants from "@/constants/products";

import {
    getProducts
} from "@/services/products";

export default async function Page() {
    const datasource = await getProducts()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={translations.layout}
            action
        >
            <Table dataSource={datasource}/>
        </Layout>
    )
}