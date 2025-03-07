'use client'
import fields from '@/modules/fields/filters';
import SaveFilter, { DeleteFilter } from "@/modules/actions/filters";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/filters";
import type { Filter } from '@/modules/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const onDelete = async () => {
        return await DeleteFilter(values.id as string)
    }

    const title = isNew ? CONSTANTS.SIDEBAR.ADD : CONSTANTS.SIDEBAR.EDIT

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            translations={CONSTANTS.NAMESPACE}
        >
            <FormBuilder
                action={SaveFilter}
                fields={fields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}
