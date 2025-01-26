import { createContext, useContext, useReducer } from 'react'
import type { Fields } from '@/types/form'

interface FormState {
    values: Record<string, unknown>
    propagations: Record<string, unknown>
}

type FormAction =
    | { type: 'SET_VALUE'; field: string; value: unknown }
    | { type: 'PROPAGATE'; field: string; value: unknown }

interface FormContextType {
    state: FormState
    propagateValue: (fieldName: string, value: unknown) => void
}

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.value
                }
            }
        case 'PROPAGATE':
            return {
                ...state,
                propagations: {
                    ...state.propagations,
                    [action.field]: action.value
                }
            }
        default:
            return state
    }
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export const FormProvider = ({
    children,
    fields,
    initialValues = {}
}: {
    children: React.ReactNode
    fields: Fields
    initialValues?: Record<string, unknown>
}) => {
    const [state, dispatch] = useReducer(formReducer, {
        values: initialValues,
        propagations: {}
    })

    const propagateValue = (fieldName: string, value: unknown) => {
        dispatch({ type: 'SET_VALUE', field: fieldName, value })

        const field = fields.find(f => f.name === fieldName)
        if (field?.propagates) {
            Object.entries(field.propagates).forEach(([targetField, sourceProperty]) => {
                const selectedOption = field.options?.find(opt =>
                    opt.id.toString() === value.toString()
                )
                if (selectedOption && sourceProperty in selectedOption) {
                    dispatch({
                        type: 'PROPAGATE',
                        field: targetField,
                        value: selectedOption[sourceProperty as keyof typeof selectedOption]
                    })
                }
            })
        }
    }

    return (
        <FormContext.Provider value={{ state, propagateValue }}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => {
    const context = useContext(FormContext)
    if (!context) throw new Error('useFormContext must be used within FormProvider')
    return context
}