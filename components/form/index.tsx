'use client'
import CONSTANTS from '@/lib/constants';
import { useActionState, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBasePath } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import Field from '@/components/form/field';
import Icon from '@/components/icon';

import {
    Alert,
    AlertDescription
} from '@/components/ui/alert';

import type { FormProps } from '@/types/form';

const initialValues = {
    success: false,
    message: '',
    errors: {},
    data: {}
}

const FormBuilder = ({
    fields,
    values,
    translations,
    action
}: FormProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const base = getBasePath(pathname)
    const searchParams = useSearchParams();
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = values && !isEdit

    const actionWithId = action.bind(null, values?.id as string)

    // @ts-ignore overload
    const [state, formAction, isPending] = useActionState(actionWithId, {
        ...initialValues,
        data: values
    })

    const showFailMessage = state?.message && !state.success
    const showSaveButton = !isDetail

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
                variant: 'default'
            })
            router.push(`/${base}/${state.data?.id}`)
        }
    }, [state, base, router])

    const renderError = (name: string) => (
        state?.errors?.[name] && (
            <p id={`${name}-error`} className="text-sm text-red-500">
                {state.errors[name]?.at(0)}
            </p>
        )
    )

    return (
        <form
            action={formAction}
            className='flex flex-col gap-4'
        >
            {fields.map((item) => (
                <div className="space-y-2" key={item.name}>
                    <Field
                        {...item}
                        label={translations(item.label)}
                        description={translations(item.description ?? '')}
                        value={state.data?.[item.name]}
                        readOnly={isDetail}
                    />
                    {renderError(item.name)}
                </div>
            ))}
            {showFailMessage && (
                <Alert className='text-red-800 border-red-800 bg-red-500/20'>
                    <AlertDescription className='italic flex items-center gap-2 select-none'>
                        <Icon name='circle-x' className='h-5 w-5'/>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}
            {showSaveButton && (
                <div className='flex justify-end gap-4'>
                    <Button
                        type='submit'
                        disabled={isPending}
                    >
                        {isPending && <Icon name='loader' className='animate-spin mr-2' />}
                        {translations('layout.save')}
                    </Button>
                </div>
            )}
        </form>
    )
}

export default FormBuilder