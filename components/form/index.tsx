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
import { useTranslations } from 'use-intl';
import { Button } from '@/components/ui/button';

const FormBuilder = <T extends FieldValues>({ form, onSubmit, fields, translations }: FormProps<T>) => {
    const t = useTranslations(translations)
    return (
        <Form {...form}>
            <form
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
                                <FormLabel>{item.label &&t(item.label)}</FormLabel>
                                <FormControl>
                                    <Field
                                        {...field}
                                        {...item}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {item.description && t(item.description)}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <div className='flex justify-end gap-4'>
                    <Button type='submit'>{t('layout.save')}</Button>
                </div>
            </form>
        </Form>
    )
}

export default FormBuilder