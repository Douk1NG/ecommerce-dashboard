'use client'
import fields from '@/modules/fields/inflow';
import SaveInflow, { DeleteInflow } from "@/modules/actions/inflow";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/inflow";
import { useEditMode } from '@/hooks/use-edit-mode';
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
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteInflow(values.id as string)
    }

    const hidratatedFields = fields(content)
    const title = isNew ? CONSTANTS.SIDEBAR.ADD : isEditing ? CONSTANTS.SIDEBAR.EDIT : CONSTANTS.SIDEBAR.DETAIL

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            translations={CONSTANTS.NAMESPACE}
            onEditModeChange={handleEditModeChange}
            isEditing={isEditing}
        >
            <FormBuilder
                action={SaveInflow}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
                readOnly={!isNew && !isEditing}
            />
        </Sidebar>
    )
}
