'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/features/products/schemas/product';
import fields from '@/features/products/resources/fields';
import FormBuilder from '@/components/form';
import { FormValues, ProductFormProps } from '@/types/products';

export default function ProductForm({ product, id }: ProductFormProps) {

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
            id={id}
            fields={fields}
            form={form}
            onSubmit={onSubmit}
        />
    );
}
