'use client'
import fields from '@/src/features/categories/components/categoryFields';
import { useTranslations } from 'next-intl';
import SaveCategory, { DeleteCategory } from "@/src/features/categories/categoryActions";
import { FormBuilder, type ActionResponse } from 'form-builder'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/layout/sidebar";
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
    const { toast } = useToast()
    const router = useRouter()

    const onDelete = async () => {
        return await DeleteCategory(String(values['id']))
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
                translate={useTranslations('categories')}
                isCreating={isNew}
                isEditing={isEditing}
                onSuccess={(state: ActionResponse) => {
                    toast({ title: 'Success', description: state.message, variant: 'default', duration: 2000 })
                    if (isNew) {
                        router.push(`${state.data['id']}`)
                    }
                }}
                onError={(state: ActionResponse) => {
                    toast({ title: 'Error', description: state.message, variant: 'destructive', duration: 2000 })
                }}
            />
        </Sidebar>
    )
}
