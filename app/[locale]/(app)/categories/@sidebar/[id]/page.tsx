import LayoutConstants from "@/src/shared/constants/layout";
import Layout from "@/src/features/categories/components/CategoryForm";

import {
    getCategory,
    getCategories
} from "@/src/features/categories/categoryServices";

import {
    getFilters
} from "@/src/features/filters/filterServices";

import type { PageProps } from "@/src/shared/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === LayoutConstants.LAYOUT.NEW

    const category = !isNew && id ? await getCategory(id) : undefined
    const content = {
        filters: await getFilters({
            selectable: {
                full: false
            }
        }),
        categories: await getCategories({
            selectable: {
                full : false
            }
        })
    }

    return (
        <Layout
            values={category}
            isNew={isNew}
            content={content}
        />
    )
}