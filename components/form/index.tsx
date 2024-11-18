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

const FormBuilder = <T extends FieldValues>({ form, onSubmit, fields, id }: FormProps<T>) => {
    return (
        <Form {...form}>
            <form
                id={id}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-4"
            >
                {fields.map((item) => (
                    <FormField
                        control={form.control}
                        name={item.name}
                        key={item.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{item.label}</FormLabel>
                                <FormControl>
                                    <Field
                                        {...field}
                                        {...item}
                                    />
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