'use client'
import fields from '@/modules/fields/products';
import SaveProduct, { DeleteProduct } from "@/modules/actions/products";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/products";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Product } from '@/modules/types/products';

import type { Option } from '@/types/select';

type FormProps = {
    values: Product
    isNew: boolean,
    content: {
        categories?: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {
    const { isEditing, handleEditModeChange } = useEditMode({ isNew })

    const onDelete = async () => {
        return await DeleteProduct(values.id as string)
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
                action={SaveProduct}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
                onEditModeChange={handleEditModeChange}
                isEditing={isEditing}
                isCreating={isNew}
            />
        </Sidebar>
    )
}
