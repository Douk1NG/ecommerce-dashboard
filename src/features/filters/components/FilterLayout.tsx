import Layout from "@/components/layout";
import Table from "@/src/features/filters/components/FilterTable";
import constants from "@/src/shared/constants/filters";

import {
    getFilters
} from "@/src/features/filters/filterServices";

export default async function Page() {
    const datasource = await getFilters()

    return (
        <Layout
            module={constants.NAMESPACE}
            translations={{
                title: 'filters.layout.title',
                description: 'filters.layout.description',
                add: 'filters.layout.add'
            }}
            action
        >
            <Table
                dataSource={datasource}
            />
        </Layout>
    )
}