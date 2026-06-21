import Layout from '@/components/layout'
import Table from '@/src/features/inventory/components/InflowTable'
import { getInflows } from '@/src/features/inventory/inflowServices'

export default async function InflowLayout() {
    const datasource = await getInflows()

    return (
        <Layout
            module="inflow"
            translations={{
                title: 'inflow.layout.title',
                description: 'inflow.layout.description',
                add: 'inflow.layout.add',
            }}
            action
        >
            <Table dataSource={datasource} />
        </Layout>
    )
}
