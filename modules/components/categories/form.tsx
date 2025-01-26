'use client'
import fields from '@/modules/fields/categories';
import SaveCategory, { DeleteCategory } from "@/modules/actions/categories";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/sidebar";
import CONSTANTS from "@/modules/constants/categories";
import { useTranslations } from 'next-intl';
import type { Category } from '@/modules/types/categories';
import type { Option } from '@/types/form';

type FormProps = {
    values: Category
    isNew: boolean,
    content: {
        filters: Option[],
        categories: Option[]
    }
}

export default function Form({ values, isNew, content }: FormProps) {
    const onDelete = async () => {
        return await DeleteCategory(values.id as string)
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
                action={SaveCategory}
                fields={hidratatedFields}
                values={values}
                translations={t}
            />
        </Sidebar>
    )
}
