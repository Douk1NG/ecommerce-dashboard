'use client'
import fields from '@/modules/fields/categories';
import SaveCategory, { DeleteCategory } from "@/modules/actions/categories";
import FormBuilder from '@/components/form';
import Sidebar from "@/components/layout/sidebar";
import CONSTANTS from "@/modules/constants/categories";
import type { Category } from '@/modules/types/categories';
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
    const onDelete = async () => {
        return await DeleteCategory(values.id as string)
    }
    const hidratatedFields = fields(content)
    const title = isNew ? CONSTANTS.SIDEBAR.ADD : CONSTANTS.SIDEBAR.EDIT

    return (
        <Sidebar
            title={title}
            onDelete={onDelete}
            isNew={isNew}
            translations={CONSTANTS.NAMESPACE}
        >
            <FormBuilder
                action={SaveCategory}
                fields={hidratatedFields}
                values={values}
                translations={CONSTANTS.NAMESPACE}
            />
        </Sidebar>
    )
}
