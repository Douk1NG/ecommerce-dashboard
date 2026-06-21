import { notFound } from 'next/navigation'

import OutflowForm from '@/src/features/inventory/components/OutflowForm'
import { getOutflow } from '@/src/features/inventory/outflowServices'
import { getProductsSelectable } from '@/src/features/products/productServices'
import type { OutflowDetail } from '@/src/shared/types/outflow'
import type { PageProps } from '@/src/shared/types/layout'

export default async function Page({ params }: PageProps) {
    const { id } = await params
    const isNew = id === 'new'

    let values: OutflowDetail = {
        date: new Date().toISOString().slice(0, 10),
        combinations: [],
    }

    if (!isNew && id) {
        const outflow = await getOutflow(id)

        if (!outflow) {
            notFound()
        }

        values = outflow
    }

    return (
        <OutflowForm
            values={values}
            isNew={isNew}
            content={{
                products: await getProductsSelectable(),
            }}
        />
    )
}
