import Layout from "@/components/layout";
import ProductTable from "@/src/features/products/components/ProductTable";
import translations from "@/src/shared/constants/translations/products";
import constants from "@/src/shared/constants/products";

import {
    getProducts
} from "@/src/features/products/productServices";

export default async function ProductLayout() {
    const datasource = await getProducts()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={translations.layout}
            action
        >
            <ProductTable dataSource={datasource}/>
        </Layout>
    )
}
