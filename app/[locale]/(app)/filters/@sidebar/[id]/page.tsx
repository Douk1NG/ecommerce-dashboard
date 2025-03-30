import LayoutConstants from "@/constants/layout";
import Form from "@/components/modules/filters/form";

import {
    getFilter
} from "@/services/filters";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === LayoutConstants.LAYOUT.NEW

    const filter = !isNew ? await getFilter(id) : undefined

    return (
        <Form
            values={filter}
            isNew={isNew}
        />
    )
}