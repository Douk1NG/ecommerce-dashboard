import { useState } from 'react'

export function useFormFields(initialData: Record<string, unknown> = {}) {
    const [fieldValues, setFieldValues] = useState<Record<string, unknown>>(initialData)

    const handleFieldChange = (name: string, value: unknown) => {
        setFieldValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const getFieldValue = (name: string, fallbackData?: Record<string, unknown>) =>
        fieldValues[name] ?? fallbackData?.[name]

    return {
        fieldValues,
        handleFieldChange,
        getFieldValue
    }
}