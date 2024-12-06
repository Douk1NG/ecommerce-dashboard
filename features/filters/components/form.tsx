'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import filterSchema from '@/features/filters/schemas';
import fields from '@/features/filters/resources/fields';
import FormBuilder from '@/components/form';

import type { Filter, FilterFormProps } from '@/features/filters/types';

import { translations } from '@/i18n/request';

export default function FilterForm({ filter }: FilterFormProps) {

    const form = useForm<Filter>({
        defaultValues: filter
            ? {
                name: filter.name,
                filters: filter.filters,
            }
            : undefined,
        resolver: zodResolver(filterSchema),
    });

    async function onSubmit(data: Filter) {
        console.log(data);
    }

    return (
        <FormBuilder
            fields={fields}
            form={form}
            onSubmit={onSubmit}
            translations={translations.filters}
        />
    );
}
