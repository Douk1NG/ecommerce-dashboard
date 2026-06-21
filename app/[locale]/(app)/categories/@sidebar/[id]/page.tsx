import { notFound } from 'next/navigation'

import Layout from "@/src/features/categories/components/CategoryForm";

import {
    getCategory,
    getCategoriesSelectable
} from "@/src/features/categories/categoryServices";

import {
    getFiltersSelectable
} from "@/src/features/filters/filterServices";

import type { CategoryDetail } from '@/src/shared/types/categories';
import type { PageProps } from "@/src/shared/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === 'new'

    let values: CategoryDetail = { name: '' }

    if (!isNew && id) {
        const category = await getCategory(id)

        if (!category) {
            notFound()
        }

        values = category
    }

    const content = {
        filters: await getFiltersSelectable({
            selectable: {
                full: false
            }
        }),
        categories: await getCategoriesSelectable({
            selectable: {
                full : false
            }
        })
    }

    return (
        <Layout
            values={values}
            isNew={isNew}
            content={content}
        />
    )
}