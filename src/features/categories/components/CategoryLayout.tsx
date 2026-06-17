import Layout from "@/components/layout";
import Table from "@/src/features/categories/components/CategoryTable";
import constants from "@/src/shared/constants/categories";

import {
    getCategories
} from "@/src/features/categories/categoryServices";

export default async function Page() {
    const datasource = await getCategories()

    return (
        <Layout
            module={constants.NAMESPACE}
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