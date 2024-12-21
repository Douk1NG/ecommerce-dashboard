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
import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';

import type { FormProps } from '@/types/form';
import type { FieldValues } from 'react-hook-form';

const FormBuilder = <T extends FieldValues>({
    form,
    fields,
    translations,
    onSubmit
}: FormProps<T>) => {
    const t = useTranslations(translations)

    // const submitForm = async () => {
    //     'use server'
    // }

    // const initialState = {
    //     success: false,
    //     message: ''
    // }

    // const [
    //     state,
    //     action,
    //     isPending
    // ] = useActionState(
    //     submitForm,
    //     initialState
    // )

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
                                <FormLabel>
                                    {t(item.label)}
                                </FormLabel>
                                <FormControl>
                                    <Field
                                        {...field}
                                        {...item}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t(item.description)}
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