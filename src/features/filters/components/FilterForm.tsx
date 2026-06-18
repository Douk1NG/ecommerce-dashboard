'use client'
import fields from '@/src/features/filters/components/filterFields';
import SaveFilter, { DeleteFilter } from "@/src/features/filters/filterActions";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Filter } from '@/src/shared/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteFilter(String(values['id']))
    }

    const title = isNew ? 'filters.sidebar.add' : isEditing ? 'filters.sidebar.edit' : 'filters.sidebar.detail'

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            onEditModeChange={handleEditModeChange}
            isEditing={isEditing}
        >
            <FormBuilder
                action={SaveFilter}
                fields={fields}
                values={values}
                module="filters"
                isCreating={isNew}
                isEditing={isEditing}
            />
        </Sidebar>
    )
}
