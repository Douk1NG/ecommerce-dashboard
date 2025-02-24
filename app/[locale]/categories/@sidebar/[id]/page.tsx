import CONSTANTS_LIB from "@/lib/constants";

import {
    getCategory,
    getCategories
} from "@/modules/services/categories";

import { getFilters } from "@/modules/services/filters";

import Layout from "@/modules/components/categories/form";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const category = !isNew ? await getCategory(id) : undefined
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