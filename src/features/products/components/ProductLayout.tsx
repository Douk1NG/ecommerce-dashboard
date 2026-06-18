import Layout from "@/components/layout";
import ProductTable from "@/src/features/products/components/ProductTable";

import {
    getProducts
} from "@/src/features/products/productServices";

export default async function ProductLayout() {
    const datasource = await getProducts()

    return (
        <Layout
            module="products"
            translations={{
                title: 'products.layout.title',
                description: 'products.layout.description',
                add: 'products.layout.add'
            }}
            action
        >
            <ProductTable dataSource={datasource}/>
        </Layout>
    )
}
