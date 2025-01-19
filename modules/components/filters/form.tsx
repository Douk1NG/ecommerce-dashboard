'use client'
import fields from '@/modules/fields/filters';
import SaveFilter, { DeleteFilter } from "@/modules/actions/filters";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/sidebar";
import CONSTANTS from "@/modules/constants/filters";
import { useTranslations } from 'next-intl';
import type { Filter } from '@/modules/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const onDelete = async () => {
        return await DeleteFilter(values.id as string)
    }

    const t = useTranslations(CONSTANTS.NAMESPACE)

    return (
        <Sidebar
            title={t(CONSTANTS.LAYOUT.TITLE)}
            onDelete={onDelete}
            isNew={isNew}
        >
            <FormBuilder
                action={SaveFilter}
                fields={fields}
                values={values}
                translations={t}
            />
        </Sidebar>
    )
}
