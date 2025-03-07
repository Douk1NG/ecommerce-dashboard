'use client'
import fields from '@/modules/fields/inflow';
import SaveInflow, { DeleteInflow } from "@/modules/actions/inflow";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/inflow";
import type { Inflow } from '@/modules/types/inflow';

import type { Option } from '@/types/select';

type FormProps = {
    values: Inflow
    isNew: boolean,
    content: {
        products?: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {

    const onDelete = async () => {
        return await DeleteInflow(values.id as string)
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
                action={SaveInflow}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}
