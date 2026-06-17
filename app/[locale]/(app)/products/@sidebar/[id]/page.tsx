import LayoutConstants from "@/src/shared/constants/layout";
import Layout from "@/src/features/products/components/ProductForm";

import {
    getProduct,
} from "@/src/features/products/productServices";

import {
    getCategories
} from "@/src/features/categories/categoryServices";

import type { PageProps } from "@/src/shared/types/layout";
import type { Category } from "@/src/shared/types/categories";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === LayoutConstants.LAYOUT.NEW

    const product = !isNew && id ? await getProduct(id) : undefined
    const filterCombinations = product?.categories?.map((category: Category) => (category as Record<string, unknown>)['filters']).flat() ?? []

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