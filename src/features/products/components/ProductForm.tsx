'use client'
import fields from '@/src/features/products/components/productFields';
import SaveProduct, { DeleteProduct } from "@/src/features/products/productActions";
import { FormBuilder, type ActionResponse } from 'form-builder'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/layout/sidebar";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Product } from '@/src/shared/types/products';
import { useTranslations } from 'next-intl';

import type { Option } from '@/src/shared/types/select';

type FormProps = {
    values: Product
    isNew: boolean,
    content: {
        categories?: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })
    const { toast } = useToast()
    const router = useRouter()
    const title = isNew ? 'products.sidebar.add' : isEditing ? 'products.sidebar.edit' : 'products.sidebar.detail'

    const onDelete = async () => {
        return await DeleteProduct(String(values['id']))
    }

    const hidratatedFields = fields(content)

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            isEditing={isEditing}
            onEditModeChange={handleEditModeChange}
        >
            <FormBuilder
                action={SaveProduct}
                fields={hidratatedFields}
                values={values}
                translate={useTranslations('products')}
                onEditModeChange={handleEditModeChange}
                isEditing={isEditing}
                isCreating={isNew}
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
