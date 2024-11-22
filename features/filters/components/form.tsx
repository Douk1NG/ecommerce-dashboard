'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterSchema } from '@/features/filters/schemas/filters';
import fields from '@/features/filters/resources/fields';
import FormBuilder from '@/components/form';
import { FormValues, FilterFormProps } from '@/types/filters';

export default function FilterForm({ filter, id }: FilterFormProps) {

    const form = useForm<FormValues>({
        defaultValues: filter
            ? {
                name: filter.name,
                filters: filter.filters,
            }
            : undefined,
        resolver: zodResolver(filterSchema),
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
        />
    );
}
