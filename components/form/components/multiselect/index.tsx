import dynamic from 'next/dynamic'
import { useRef, useCallback } from 'react'
import { useInheritanceContext } from '@/context/InheritanceProvider'
import { useFieldInheritance } from '@/hooks/use-field-inheritance'
import type { MultiselectField } from '@/types/form'

const Multiselect = dynamic(() => import('react-select'), { ssr: false })

export default function Component({
    options = [],
    value = [],
    name,
    placeholder = '',
    readOnly,
    inheritFrom
}: MultiselectField) {
    const inputRef = useRef<HTMLInputElement>(null)
    const selectRef = useRef(null)
    const { onChange } = useInheritanceContext()

    const inheritanceMethod = useCallback((value: unknown) => {
        // @ts-expect-error
        selectRef.current?.setValue(value, 'select-option')
    }, [])

    useFieldInheritance(inheritFrom, inheritanceMethod)

    const handleChange = (value: unknown) => {
        if (inputRef.current) {
            inputRef.current.value = JSON.stringify(value)
        }
        onChange(name, value)
    }

    return (
        <>
            <Multiselect
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
                ref={inputRef}
                type="hidden"
                value={JSON.stringify(value)}
            />
        </>
    )
}
