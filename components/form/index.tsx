'use client'
import CONSTANTS from '@/lib/constants';
import { useActionState, useEffect } from 'react';
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

    const isCreate = !values
    const isEdit = searchParams.get(CONSTANTS.LAYOUT.SIDEBAR.EDIT)
    const isDetail = !isCreate && !isEdit

    const actionWithId = action.bind(null, values?.id as string)

    const initialValues = {
        success: false,
        message: '',
        errors: {},
        data: values
    }

    const [
        state,
        formAction,
        isPending
    // @ts-expect-error overload
    ] = useActionState(
        actionWithId,
        initialValues
    )

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
                variant: 'default'
            })
            router.push(`/${base}/${state.data?.id}`)
        }
    }, [state])

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
                    {state?.errors?.[item.name] && (
                        <p id={`${item.name}-error`} className="text-sm text-red-500">
                            {state.errors[item.name]?.at(0)}
                        </p>
                    )}
                </div>
            ))}
            {state?.message && !state.success && (
                <Alert className='text-red-800 border-red-800 bg-red-500/20' >
                    <AlertDescription className='italic flex items-center gap-2 select-none'>
                        <Icon name='circle-x' className='h-5 w-5'/>
                        {state.message}
                    </AlertDescription>
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
                            {translations('layout.save')}
                        </Button>
                    </div>
                )
            }
        </form>
    )
}

export default FormBuilder