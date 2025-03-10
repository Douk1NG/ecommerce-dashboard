'use client'
import fields from '@/components/modules/categories/form/fields';
import SaveCategory, { DeleteCategory } from "@/actions/categories";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/constants/categories";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Category } from '@/types/categories';
import type { Option } from '@/types/select';

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
        return await DeleteCategory(values.id as string)
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
                action={SaveCategory}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
                isCreating={isNew}
                isEditing={isEditing}
            />
        </Sidebar>
    )
}
