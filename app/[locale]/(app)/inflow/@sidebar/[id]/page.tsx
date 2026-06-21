import { notFound } from 'next/navigation'

import InflowForm from '@/src/features/inventory/components/InflowForm'
import { getInflow } from '@/src/features/inventory/inflowServices'
import { getProductsSelectable } from '@/src/features/products/productServices'
import type { InflowDetail } from '@/src/shared/types/inflow'
import type { PageProps } from '@/src/shared/types/layout'

export default async function Page({ params }: PageProps) {
    const { id } = await params
    const isNew = id === 'new'

    let values: InflowDetail = {
        date: new Date().toISOString().slice(0, 10),
        combinations: [],
    }

    if (!isNew && id) {
        const inflow = await getInflow(id)

        if (!inflow) {
            notFound()
        }

        values = inflow
    }

    return (
        <InflowForm
            values={values}
            isNew={isNew}
            content={{
                products: await getProductsSelectable(),
            }}
        />
    )
}
