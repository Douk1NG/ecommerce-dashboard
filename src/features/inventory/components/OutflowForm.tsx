'use client'

import fields from '@/src/features/inventory/components/outflowFields'
import SaveOutflow, { DeleteOutflow } from '@/src/features/inventory/outflowActions'
import { FormBuilder, type ActionResponse } from 'form-builder'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import { useEditMode } from '@/hooks/use-edit-mode'
import { useTranslations } from 'next-intl'
import type { OutflowDetail } from '@/src/shared/types/outflow'
import type { Option } from '@/src/shared/types/select'

type FormProps = {
    values: OutflowDetail
    isNew: boolean
    content: {
        products: Option[]
    }
}

export default function OutflowForm({ values, isNew, content }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })
    const { toast } = useToast()
    const router = useRouter()
    const title = isNew ? 'outflow.sidebar.add' : isEditing ? 'outflow.sidebar.edit' : 'outflow.sidebar.detail'

    const onDelete = async () => {
        return await DeleteOutflow(String(values.id))
    }

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            onEditModeChange={handleEditModeChange}
            isEditing={isEditing}
        >
            <FormBuilder
                action={SaveOutflow}
                fields={fields(content)}
                values={values}
                translate={useTranslations('outflow')}
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
