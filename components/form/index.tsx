'use client'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/i18n/routing'
import { useFormState } from '@/hooks/use-form-state'
import { useFormFields } from '@/hooks/use-form-fields'
import { getFormMode } from '@/lib/utils'
import { InheritanceProvider } from '@/context/InheritanceProvider'
import Field from '@/components/form/field'
import FormAlert from './alert'
import FormSubmitButton from './submit'
import FieldError from './field-error'

import type { FormProps } from '@/types/form'

const FormBuilder = ({
    fields,
    values,
    translations,
    action
}: FormProps) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const {
        state,
        formAction,
        isPending
    } = useFormState(action, values, pathname)

    const {
        handleFieldChange,
        getFieldValue
    } = useFormFields(state.data)

    const { showSaveButton } = getFormMode(searchParams, values)
    const showFailMessage = state?.message && !state.success

    return (
        <InheritanceProvider
            onChange={handleFieldChange}
            getFieldValue={(name) => getFieldValue(name, state.data)}
        >
            <form action={formAction} className='flex flex-col gap-4'>
                {fields.map((item) => (
                    <div className="space-y-2" key={item.name}>
                        <Field
                            {...item}
                            label={translations(item.label)}
                            description={translations(item.description ?? '')}
                            value={getFieldValue(item.name, state.data)}
                        />
                        <FieldError
                            id={item.name}
                            // @ts-expect-error
                            error={state?.errors?.[item.name]?.at(0)}
                        />
                    </div>
                ))}

                {showFailMessage && (<FormAlert message={state.message} />)}

                {showSaveButton && (
                    <FormSubmitButton
                        isPending={isPending}
                        translations={translations}
                    />
                )}
            </form>
        </InheritanceProvider>
    )

}

export default FormBuilder