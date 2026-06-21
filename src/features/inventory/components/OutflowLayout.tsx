import Layout from '@/components/layout'
import Table from '@/src/features/inventory/components/OutflowTable'
import { getOutflows } from '@/src/features/inventory/outflowServices'

export default async function OutflowLayout() {
    const datasource = await getOutflows()

    return (
        <Layout
            module="outflow"
            translations={{
                title: 'outflow.layout.title',
                description: 'outflow.layout.description',
                add: 'outflow.layout.add',
            }}
            action
        >
            <Table dataSource={datasource} />
        </Layout>
    )
}
