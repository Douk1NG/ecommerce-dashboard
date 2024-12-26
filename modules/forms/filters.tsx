'use server'
import FormBuilder from '@/components/form';

import type {
    FilterFormProps
} from '@/modules/types/filters';

export default async function FilterForm({
    filter,
    fields,
    translations,
    action
}: FilterFormProps) {
    return (
        <FormBuilder
            action={action}
            fields={fields}
            values={filter}
            translations={translations}
        />
    );
}
