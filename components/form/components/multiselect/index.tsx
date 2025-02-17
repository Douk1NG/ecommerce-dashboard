import dynamic from 'next/dynamic'
import { useRef, useCallback, useState } from 'react'
import { useInheritanceContext } from '@/context/InheritanceProvider'
import { useDebouncedCallback } from 'use-debounce'
import { useFieldInheritance } from '@/hooks/use-field-inheritance'

import type { MultiselectField } from '@/types/form'

const Multiselect = dynamic(() => import('react-select'), { ssr: false })

export default function Component({
    id,
    options = [],
    value = [],
    name,
    placeholder = '',
    readOnly,
    inheritFrom,
    onChange: innerOnChange
}: MultiselectField) {
    const selectRef = useRef(null)
    const [hiddenValue, setHiddenValue] = useState(JSON.stringify(value))

    const { onChange: onChangeInheritance } = useInheritanceContext()

    const inheritanceMethod = useCallback((value: unknown) => {
        if (selectRef.current) {
            // @ts-expect-error - react-select types are overcomplicated
            selectRef.current.setValue(value, 'select-option')
            setHiddenValue(JSON.stringify(value))
        }
    }, [])

    useFieldInheritance(inheritFrom, inheritanceMethod, readOnly)

    const handleChange = useDebouncedCallback((value: unknown) => {
        setHiddenValue(JSON.stringify(value))
        onChangeInheritance?.(name, value)
        innerOnChange?.(value)
    }, 400)

    return (
        <>
            <Multiselect
                id={id}
                ref={selectRef}
                placeholder={placeholder}
                defaultValue={value}
                isMulti
                options={options}
                className='select-tw-fix'
                isClearable={true}
                closeMenuOnSelect={true}
                onChange={handleChange}
                isDisabled={readOnly}
            />
            <input
                name={name}
                type="hidden"
                value={hiddenValue}
            />
        </>
    )
}