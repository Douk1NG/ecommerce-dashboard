import CONSTANTS_LIB from "@/lib/constants";

import {
    getProduct,
} from "@/modules/services/products";

import {
    getSelectableCategories
} from "@/modules/services/categories";

import Layout from "@/modules/components/products/form";


import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const product = !isNew ? await getProduct(id) : undefined
    const content = {
        categories: await getSelectableCategories()
    }

    return (
        <Layout
            values={product}
            isNew={isNew}
            content={content}
        />
    )

}