import CONSTANTS_LIB from "@/lib/constants";

import {
    getOutflow,
} from "@/modules/services/outflow";

import {
    getProducts
} from "@/modules/services/products";

import Layout from "@/modules/components/outflow/form";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const outflow = !isNew ? await getOutflow(id) : undefined

    const content = {
        products: await getProducts(),
    }

    return (
        <Layout
            values={outflow}
            isNew={isNew}
            content={content}
        />
    )

}