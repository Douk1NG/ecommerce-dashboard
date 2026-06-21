import { notFound } from 'next/navigation'

import Form from "@/src/features/filters/components/FilterForm";

import {
    getFilter
} from "@/src/features/filters/filterServices";

import type { FilterDetail } from '@/src/shared/types/filters';
import type { PageProps } from "@/src/shared/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === 'new'

    let values: FilterDetail = { name: '', filters: [] }

    if (!isNew && id) {
        const filter = await getFilter(id)

        if (!filter) {
            notFound()
        }

        values = filter
    }

    return (
        <Form
            values={values}
            isNew={isNew}
        />
    )
}
