import CONSTANTS_LIB from "@/lib/constants";

import {
    getFilter
} from "@/services/filters";
import Form from "@/components/modules/filters/filters/form";

import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const filter = !isNew ? await getFilter(id) : undefined

    return (
        <Form
            values={filter}
            isNew={isNew}
        />
    )
}