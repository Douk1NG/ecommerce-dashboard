'use client'
import { usePathname } from '@/i18n/routing'
import { useFormState } from '@/hooks/use-form-state'
import { useFormFields } from '@/hooks/use-form-fields'
import { InheritanceProvider } from '@/context/InheritanceProvider'
import Field from '@/components/form/field'
import FormAlert from './alert'
import FormSubmitButton from './submit'
import FieldError from './field-error'

import type { FormProps } from '@/types/form'
import { useTranslations } from 'next-intl'

const FormBuilder = ({
    fields,
    values,
    translations,
    action,
    readOnly = false
}: FormProps) => {
    const t = useTranslations(translations)
    const pathname = usePathname()

    const {
        handleFieldChange,
        getFieldValue
    } = useFormFields()

    const {
        state,
        formAction,
        isPending
    } = useFormState(action, values, pathname)

    const showFailMessage = state?.message && !state.success
    const showSaveButton = !readOnly

    return (
        <InheritanceProvider getFieldValue={getFieldValue} onChange={handleFieldChange}>
            <form
                action={formAction}
                className='flex flex-col gap-4'
            >
                {fields.map((item) => {
                    if (!item.name) return
                    return (
                        <div
                            className="space-y-2"
                            key={item.name}
                        >
                            <Field
                                {...item}
                                label={t(item.label)}
                                description={t(item.description)}
                                value={state.data?.[item.name]}
                                readOnly={readOnly}
                            />
                            <FieldError
                                error={state?.errors?.[item.name]?.at(0)}
                            />
                        </div>
                    )
                })}
                {showFailMessage && (<FormAlert message={state.message} />)}
                {showSaveButton && (<FormSubmitButton isPending={isPending} />)}
            </form>
        </InheritanceProvider>
    )
}

export default FormBuilder