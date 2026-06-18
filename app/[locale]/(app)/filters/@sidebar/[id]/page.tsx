import Form from "@/src/features/filters/components/FilterForm";

import {
    getFilter
} from "@/src/features/filters/filterServices";

import type { PageProps } from "@/src/shared/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === 'new'

    const filter = !isNew && id ? await getFilter(id) : undefined

    return (
        <Form
            values={filter}
            isNew={isNew}
        />
    )
}