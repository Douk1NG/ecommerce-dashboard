import CONSTANTS from "@/modules/constants/filters";
import CONSTANTS_LIB from "@/lib/constants";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/sidebar";
import { getTranslations } from "next-intl/server";

import {
    getFilter
} from "@/modules/services/filters";

import fields from '@/modules/fields/filters';
import SaveFilter from "@/modules/actions/filters";
import type { PageProps } from "@/types/layout";

export default async function Page(
    { params }: PageProps
) {
    const { id, locale } = await params
    const isNew = id === CONSTANTS_LIB.NEW

    const translations = await getTranslations({
        locale,
        namespace: CONSTANTS.NAMESPACE
    });

    const filter = !isNew ? await getFilter(id) : undefined

    return (
        <Sidebar
            isNew={isNew}
            title={translations(CONSTANTS.LAYOUT.TITLE)}
        >
            <FormBuilder
                action={SaveFilter}
                fields={fields}
                values={filter}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}