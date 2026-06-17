'use client'
import fields from '@/src/features/categories/components/categoryFields';
import SaveCategory, { DeleteCategory } from "@/src/features/categories/categoryActions";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/src/shared/constants/categories";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Category } from '@/src/shared/types/categories';
import type { Option } from '@/src/shared/types/select';

type FormProps = {
    values: Category
    isNew: boolean,
    content: {
        filters: Option[],
        categories: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteCategory(values['id'] as string)
    }

    const hidratatedFields = fields(content)
    const title = isNew ? 'categories.sidebar.add' : isEditing ? 'categories.sidebar.edit' : 'categories.sidebar.detail'

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            onEditModeChange={handleEditModeChange}
            isEditing={isEditing}
        >
            <FormBuilder
                action={SaveCategory}
                fields={hidratatedFields}
                values={values}
                module={CONSTANTS.NAMESPACE}
                isCreating={isNew}
                isEditing={isEditing}
            />
        </Sidebar>
    )
}
