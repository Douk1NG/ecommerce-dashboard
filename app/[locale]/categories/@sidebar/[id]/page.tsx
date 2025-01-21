import CONSTANTS_LIB from "@/lib/constants";

import {
    getCategory
} from "@/modules/services/categories";

import Layout from "@/modules/components/categories/form";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const category = !isNew ? await getCategory(id) : undefined

    return (
        <Layout
            values={category}
            isNew={isNew}
        />
    )
}