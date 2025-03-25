import LayoutConstants from "@/constants/layout";
import Layout from "@/components/modules/products/form";

import {
    getProduct,
} from "@/services/products";

import {
    getCategories
} from "@/services/categories";

import type { PageProps } from "@/types/layout";
import type { Category } from "@/types/categories";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === LayoutConstants.LAYOUT.NEW

    const product = !isNew ? await getProduct(id) : undefined
    const filterCombinations = product?.categories?.map((category: Category) => category.filters).flat() ?? []

    const content = {
        categories: await getCategories({
            selectable: {
                full: true
            }
        }),
        filter_combinations: filterCombinations
    }

    return (
        <Layout
            values={product}
            isNew={isNew}
            content={content}
        />
    )

}