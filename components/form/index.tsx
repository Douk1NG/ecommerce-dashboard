'use client'
import { useTranslations } from 'use-intl';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Alert,
    AlertDescription
} from '@/components/ui/alert';

import Field from '@/components/form/field';
import Icon from '@/components/icon';
import CONSTANTS from '@/lib/constants';
import { cleanSplit } from "@/lib/utils";

import type { FormProps } from '@/types/form';

const FormBuilder = ({
    values,
    fields,
    translations,
    action
}: FormProps) => {
    const t = useTranslations(translations)
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [_, id] = cleanSplit({
        value: pathname,
        criteria: '/'
    });

    const isNew = id === CONSTANTS.NEW
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = !isNew && !isEdit

    const defaultState = {
        success: false,
        message: '',
        errors: {},
        data: values
    }

    const [
        state,
        formAction,
        isPending
    ] = useActionState(action, defaultState)

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
                        readOnly={isDetail}
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
            {
                !isDetail && (
                    <div className='flex justify-end gap-4'>
                        <Button
                            type='submit'
                            disabled={isPending}
                        >
                            {isPending && <Icon name='loader' className='animate-spin mr-2' />}
                            {t('layout.save')}
                        </Button>
                    </div>
                )
            }
        </form>
    )
}

export default FormBuilder