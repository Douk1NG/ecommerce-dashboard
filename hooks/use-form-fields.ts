import { useState, useCallback } from 'react'

export function useFormFields() {
    const [fieldValues, setFieldValues] = useState<Record<string, unknown>>({})

    const handleFieldChange = useCallback((name?: string, value?: unknown) => {
        if (!name) return
        setFieldValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const getFieldValue = useCallback((name?: string) => {
        if (!name) return
        return fieldValues?.[name]
    }, [fieldValues])

    return {
        handleFieldChange,
        getFieldValue
    }
}