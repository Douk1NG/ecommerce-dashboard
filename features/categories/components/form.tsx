'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/features/categories/schemas/category';
import fields from '@/features/categories/resources/fields';
import FormBuilder from '@/components/form';
import { FormValues, CategoryFormProps } from '@/types/categories';
import { translations } from '@/i18n/request';

export default function CategoryForm({ category, id }: CategoryFormProps) {

    const form = useForm<FormValues>({
        defaultValues: category
            ? {
                name: category.name,
                subcategories: category.subcategories,
                filters: category.filters,
            }
            : undefined,
        resolver: zodResolver(categorySchema),
    });

    async function onSubmit(data: FormValues) {
        console.log(data);
        // if (product) {
        //     await fetch(`/api/users/${product.id}`, {
        //         method: 'PATCH',
        //         body: JSON.stringify(data),
        //     });
        //     return
        // }
        // await fetch('/api/users', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        // });
    }

    return (
        <FormBuilder
            id={id}
            fields={fields}
            form={form}
            onSubmit={onSubmit}
            translations={translations.products}
        />
    );
}
