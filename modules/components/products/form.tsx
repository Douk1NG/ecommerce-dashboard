'use client'
import FormBuilder from '@/components/form';

import type {
    ProductFormProps
} from '@/modules/types/products';

export default function ProductForm({
    product,
    fields,
    action,
    translations
}: ProductFormProps) {
    return (
        <FormBuilder
            action={action}
            fields={fields}
            values={product}
            translations={translations}
        />
    );
}
