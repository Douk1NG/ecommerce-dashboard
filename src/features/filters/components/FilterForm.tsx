'use client'
import fields from '@/src/features/filters/components/filterFields';
import { useTranslations } from 'next-intl';
import SaveFilter, { DeleteFilter } from "@/src/features/filters/filterActions";
import { FormBuilder, type ActionResponse } from 'form-builder'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/layout/sidebar";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Filter } from '@/src/shared/types/filters';

type FormProps = {
    values: Filter
    isNew: boolean
}

export default function Form({ values, isNew }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })
    const { toast } = useToast()
    const router = useRouter()

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
                translate={useTranslations('filters')}
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
