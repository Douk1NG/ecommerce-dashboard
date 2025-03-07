'use client'
import fields from '@/modules/fields/outflow';
import SaveOutflow, { DeleteOutflow } from "@/modules/actions/outflow";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/outflow";
import type { Outflow } from '@/modules/types/outflow';

import type { Option } from '@/types/select';

type FormProps = {
    values: Outflow
    isNew: boolean,
    content: {
        products?: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {

    const onDelete = async () => {
        return await DeleteOutflow(values.id as string)
    }

    const hidratatedFields = fields(content)

    return (
        <Sidebar
            title={CONSTANTS.SIDEBAR_TITLE}
            onDelete={onDelete}
            isNew={isNew}
            translations={CONSTANTS.NAMESPACE}
        >
            <FormBuilder
                action={SaveOutflow}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}
