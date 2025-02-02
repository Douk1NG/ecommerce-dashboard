import { useEffect, useRef } from 'react'
import { useInheritanceContext } from '@/context/InheritanceProvider'

type InheritanceConfig = {
    field: string
    property?: string
}

export const useFieldInheritance = (
    inheritFrom: InheritanceConfig | undefined,
    onInherit: (value: unknown) => void
) => {
    const { getFieldValue } = useInheritanceContext()
    const previousValue = useRef<unknown>(null)

    useEffect(() => {
        if (!inheritFrom) return

        const sourceValue = getFieldValue(inheritFrom.field)

        if (sourceValue === previousValue.current) return

        const valueToInherit = inheritFrom.property
            ? (sourceValue as any)?.[inheritFrom.property]
            : sourceValue

        previousValue.current = sourceValue
        onInherit(valueToInherit)

    }, [inheritFrom?.field, getFieldValue])
}