'use client'
import fields from '@/modules/fields/outflow';
import SaveOutflow, { DeleteOutflow } from "@/modules/actions/outflow";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/outflow";
import { useEditMode } from '@/hooks/use-edit-mode';
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
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteOutflow(values.id as string)
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
                action={SaveOutflow}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
                readOnly={!isNew && !isEditing}
            />
        </Sidebar>
    )
}
