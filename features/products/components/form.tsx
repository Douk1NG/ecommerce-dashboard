'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import productSchema from '@/features/products/schemas/product';
import fields from '@/features/products/resources/fields';
import FormBuilder from '@/components/form';
import type { Product, ProductFormProps } from '@/features/products/types';
import { translations } from '@/i18n/request';

export default function ProductForm({ product }: ProductFormProps) {

    const form = useForm<Product>({
        defaultValues: product
            ? {
                name: product.name,
                description: product.description,
                price: product.price,
                categories: product.categories,
                images: product.images,
                active: product.active,
            }
            : undefined,
        resolver: zodResolver(productSchema),
    });

    async function onSubmit(data: Product) {
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
            translations={translations.products}
        />
    );
}
