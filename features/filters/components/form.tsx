'use client'
import CONSTANTS from '../resources/constants';
import FormBuilder from '@/components/form';
import fields from '@/features/filters/resources/fields';
import filterSchema from '@/features/filters/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
    Filter,
    FilterFormProps
} from '@/features/filters/types';
import { createFilter, updateFilter } from '../services';

export default function FilterForm({ filter }: FilterFormProps) {

    const form = useForm<Filter>({
        defaultValues: filter
            ? {
                [CONSTANTS.KEYS.ID]: filter[CONSTANTS.KEYS.ID],
                [CONSTANTS.KEYS.NAME]: filter[CONSTANTS.KEYS.NAME],
                [CONSTANTS.KEYS.FILTERS]: filter[CONSTANTS.KEYS.FILTERS],
            }
            : undefined,
        resolver: zodResolver(filterSchema),
    });

    async function onSubmit(data: Filter) {
        if (filter) {
            const response = await updateFilter(data)
            console.log(response)
            return
        }
        const response = await createFilter(data)
        console.log(response)
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
