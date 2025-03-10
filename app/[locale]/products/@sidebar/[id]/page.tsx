import CONSTANTS_LIB from "@/lib/constants";

import {
    getProduct,
} from "@/modules/services/products";

import {
    getCategories
} from "@/modules/services/categories";

import Layout from "@/modules/components/products/form";

import type { PageProps } from "@/types/layout";
import type { Product } from "@/modules/types/products";
import type { Category } from "@/modules/types/categories";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

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
            values={product as unknown as Product}
            isNew={isNew}
            content={content}
        />
    )

}