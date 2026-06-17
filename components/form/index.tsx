'use client'

import { useFormState } from '@/hooks/use-form-state'
import { useFormFields } from '@/hooks/use-form-fields'
import { useTranslations } from 'next-intl'

import { InheritanceProvider } from '@/src/shared/context/InheritanceProvider'

import Field from '@/components/form/field'
import FormAlert from './alert'
import FormSubmitButton from './submit'
import FieldError from './field-error'

import type { FormProps } from '@/src/shared/types/form'

const FormBuilder = ({
    fields,
    values,
    module,
    action,
    onEditModeChange,
    isEditing,
    isCreating
}: FormProps) => {
    const t = useTranslations(module)

    const {
        handleFieldChange,
        getFieldValue
    } = useFormFields(values)

    const {
        state,
        formAction,
        isPending,
        isDetail
    } = useFormState(
        action,
        values,
        onEditModeChange,
        isEditing,
        isCreating
    )

    const showFailMessage = state?.message && !state.success

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
                                {...(item.description ? { description: t(item.description) } : {})}
                                value={state.data?.[item.name]}
                                readOnly={isDetail}
                            />
                            <FieldError
                                {...(state?.errors?.[item.name]?.at(0) ? { error: state.errors[item.name]?.[0] ?? '' } : {})}
                            />
                        </div>
                    )
                })}
                {showFailMessage &&
                    (<FormAlert message={state.message} />)
                }
                {!isDetail &&
                    (<FormSubmitButton isPending={isPending} />)
                }
            </form>
        </InheritanceProvider>
    )
}

export default FormBuilder