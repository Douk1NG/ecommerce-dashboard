import { notFound } from 'next/navigation'

import Layout from "@/src/features/products/components/ProductForm";

import {
    getProduct,
} from "@/src/features/products/productServices";

import {
    getCategoriesSelectable
} from "@/src/features/categories/categoryServices";

import type { ProductDetail } from '@/src/shared/types/products';
import type { PageProps } from "@/src/shared/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === 'new'

    let values: ProductDetail = { name: '' }

    if (!isNew && id) {
        const product = await getProduct(id)

        if (!product) {
            notFound()
        }

        values = product
    }

    const filterCombinations = values.categories
        ?.flatMap((category) => category.filters ?? []) ?? []

    const content = {
        categories: await getCategoriesSelectable({
            selectable: {
                full: true
            }
        }),
        filter_combinations: filterCombinations
    }

    return (
        <Layout
            values={values}
            isNew={isNew}
            content={content}
        />
    )
}
