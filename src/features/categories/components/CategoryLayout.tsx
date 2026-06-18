import Layout from "@/components/layout";
import Table from "@/src/features/categories/components/CategoryTable";

import {
    getCategories
} from "@/src/features/categories/categoryServices";

export default async function Page() {
    const datasource = await getCategories()

    return (
        <Layout
            module="categories"
            translations={{
                title: 'categories.layout.title',
                description: 'categories.layout.description',
                add: 'categories.layout.add'
            }}
            action
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}