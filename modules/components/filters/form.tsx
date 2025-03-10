'use client'
import fields from '@/modules/fields/filters';
import SaveFilter, { DeleteFilter } from "@/modules/actions/filters";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/filters";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Filter } from '@/modules/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteFilter(values.id as string)
    }

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
                action={SaveFilter}
                fields={fields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
                isCreating={isNew}
                isEditing={isEditing}
            />
        </Sidebar>
    )
}
