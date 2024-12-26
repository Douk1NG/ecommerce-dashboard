'use client'

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Field from '@/components/form/field';
import Icon from '@/components/icon';

import { useTranslations } from 'use-intl';
import { useActionState } from 'react';
import type { FormProps } from '@/types/form';

const FormBuilder = ({
    values,
    fields,
    translations,
    action
}: FormProps) => {
    const t = useTranslations(translations)

    const [
        state,
        formAction,
        isPending
    ] = useActionState(action, {
        success: false,
        message: '',
        errors: {},
        data: values
    })

    console.log(state, values)

    return (
        <form
            action={formAction}
            className='flex flex-col gap-4'
        >
            {fields.map((item) => (
                <div className="space-y-2" key={item.name}>
                    <Label htmlFor={item.name}>
                        {t(item.label)}
                    </Label>
                    <Field
                        {...item}
                        value={state.data?.[item.name]}
                    />
                    <p className='text-sm text-muted-foreground'>
                        {t(item.description)}
                    </p>
                </div>
            ))}
            {state?.message && (
                <Alert variant={state.success ? "default" : "destructive"}>
                    {state.success && <Icon name='check' className='w-4 h-4' />}
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
            <div className='flex justify-end gap-4'>
                <Button
                    type='submit'
                    disabled={isPending}
                >
                    {isPending && <Icon name='loader' className='animate-spin mr-2' />}
                    {t('layout.save')}
                </Button>
            </div>
        </form>
    )
}

export default FormBuilder