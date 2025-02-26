import CONSTANTS_LIB from "@/lib/constants";

import {
    getInflow,
} from "@/modules/services/inflow";

import {
    getProducts
} from "@/modules/services/products";

import Layout from "@/modules/components/inflow/form";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const inflow = !isNew ? await getInflow(id) : undefined

    const content = {
        products: await getProducts(),
    }

    return (
        <Layout
            values={inflow}
            isNew={isNew}
            content={content}
        />
    )

}