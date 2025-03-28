'use client'
import fields from '@/components/modules/products/form/fields';
import SaveProduct, { DeleteProduct } from "@/actions/products";
import FormBuilder from '@/components/form';
import CONSTANTS from '@/constants/products';
import Sidebar from "@/components/layout/sidebar";
import translations from "@/constants/translations/products";
import { useEditMode } from '@/hooks/use-edit-mode';
import type { Product } from '@/types/products';

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
    const title = isNew ? translations.sidebar.add : isEditing ? translations.sidebar.edit : translations.sidebar.detail

    const onDelete = async () => {
        return await DeleteProduct(values.id as string)
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
