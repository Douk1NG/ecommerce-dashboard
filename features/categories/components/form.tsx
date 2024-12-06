'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormBuilder from '@/components/form';

import categorySchema from '../schemas';

import type {
    Category,
    CategoryFormProps
} from '../types';

import CONSTANTS from '../resources/constants';
import fields from '../resources/fields';

export default function CategoryForm({ category }: CategoryFormProps) {

    const form = useForm<Category>({
        defaultValues: category
            ? {
                [CONSTANTS.KEYS.NAME]: category[CONSTANTS.KEYS.NAME],
                [CONSTANTS.KEYS.SUBCATEGORIES]: category[CONSTANTS.KEYS.SUBCATEGORIES],
                [CONSTANTS.KEYS.FILTERS]: category[CONSTANTS.KEYS.FILTERS],
            }
            : undefined,
        resolver: zodResolver(categorySchema),
    });

    async function onSubmit(data: Category) {
        console.log(data);
    }

    return (
        <FormBuilder
            fields={fields}
            form={form}
            onSubmit={onSubmit}
            translations={CONSTANTS.NAMESPACE}
        />
    );
}
