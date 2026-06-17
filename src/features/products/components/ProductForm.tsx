'use client'
import fields from '@/src/features/products/components/productFields';
import SaveProduct, { DeleteProduct } from "@/src/features/products/productActions";
import FormBuilder from '@/components/form';
import CONSTANTS from '@/src/shared/constants/products';
import Sidebar from "@/components/layout/sidebar";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Product } from '@/src/shared/types/products';

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
    const title = isNew ? 'products.sidebar.add' : isEditing ? 'products.sidebar.edit' : 'products.sidebar.detail'

    const onDelete = async () => {
        return await DeleteProduct(values['id'] as string)
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
                module={CONSTANTS.NAMESPACE}
                onEditModeChange={handleEditModeChange}
                isEditing={isEditing}
                isCreating={isNew}
            />
        </Sidebar>
    )
}
