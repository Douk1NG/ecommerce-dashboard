import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import Field from '@/components/form/field';

import type { FormProps } from '@/types/form';
import type { FieldValues } from 'react-hook-form';

const FormBuilder = <T extends FieldValues>({ form, onSubmit, fields }: FormProps<T>) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-4"
            >
                {fields.map((item) => (
                    <FormField
                        control={form.control}
                        // @ts-expect-error type is expecting a Path<T> but it's a string
                        name={item.name}
                        key={item.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{item.label}</FormLabel>
                                <FormControl>
                                    <Field {...item} {...field} />
                                </FormControl>
                                <FormDescription>
                                    {item.description}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </form>
        </Form>
    )
}

export default FormBuilder