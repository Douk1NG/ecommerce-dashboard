'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { productSchema } from '@/features/products/schemas/product';
import fields from '@/features/products/resources/fields';
import FormBuilder from '@/components/form';

type FormValues = z.infer<typeof productSchema>;
type ProductFormProps = {
    onSuccess?: () => void;
    product?: FormValues;
};
export default function ProductForm({ product }: ProductFormProps) {
    const form = useForm<FormValues>({
        defaultValues: product
            ? {
                title: product.title,
                description: product.description,
                price: product.price,
                categories: product.categories,
                image: product.image,
                active: product.active,
            }
            : undefined,
        resolver: zodResolver(productSchema),
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
            fields={fields}
            form={form}
            onSubmit={onSubmit}
        />
    );
}
