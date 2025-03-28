'use client'
import fields from '@/components/modules/filters/form/fields';
import SaveFilter, { DeleteFilter } from "@/actions/filters";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/constants/filters";
import translations from "@/constants/translations/filters";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Filter } from '@/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteFilter(values.id as string)
    }

    const title = isNew ? translations.sidebar.add : isEditing ? translations.sidebar.edit : translations.sidebar.detail

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
                module={CONSTANTS.NAMESPACE}
                isCreating={isNew}
                isEditing={isEditing}
            />
        </Sidebar>
    )
}
