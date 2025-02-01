'use client'
import fields from '@/modules/fields/products';
import SaveProduct, { DeleteProduct } from "@/modules/actions/products";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/sidebar";
import CONSTANTS from "@/modules/constants/products";
import { useTranslations } from 'next-intl';
import type { Product } from '@/modules/types/products';

import type { Option } from '@/types/form';

type FormProps = {
    values: Product
    isNew: boolean,
    content: {
        categories: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {
    const onDelete = async () => {
        return await DeleteProduct(values.id as string)
    }
    const hidratatedFields = fields(content)
    const t = useTranslations(CONSTANTS.NAMESPACE)


    return (
        <Sidebar
            title={t(CONSTANTS.LAYOUT.TITLE)}
            onDelete={onDelete}
            isNew={isNew}
        >
            <FormBuilder
                action={SaveProduct}
                fields={hidratatedFields}
                values={values}
                translations={t}

            />
        </Sidebar>
    )
}
