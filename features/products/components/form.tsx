'use client'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
// import TagInput from '@/components/adapted/tagbox';

const formSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    categories: z.array(z.record(z.string(), z.number())),
    image: z.string().url(),
    active: z.boolean().default(true)
});

type FormValues = z.infer<typeof formSchema>;

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
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(data: FormValues) {
        if (product) {
            await fetch(`/api/users/${product.id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });
            return
        }
        await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    const categories = [
        { text: 'Electronics', id: 1 },
        { text: 'Clothing', id: 2 },
        { text: 'Books', id: 3 },
        { text: 'Home & Kitchen', id: 4 },
        { text: 'Beauty1', id: 5 },
        { text: 'Beauty2', id: 6 },
        { text: 'Beauty3', id: 7 },
        { text: 'Beauty4', id: 8 }
    ] as const

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
                                />
                            </FormControl>
                            <FormDescription>
                                Set the product title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Set the product description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='number'
                                    min={0}
                                    step='any'
                                    inputMode='decimal'
                                />
                            </FormControl>
                            <FormDescription>
                                Set the product price.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categories</FormLabel>
                            <FormControl>
                                {/* <TagInput
                                    {...field}
                                /> */}
                            </FormControl>
                            <FormDescription>
                                Set the product categories.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='file'
                                />
                            </FormControl>
                            <FormDescription>
                                Set the product image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Active</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Set the product status.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
