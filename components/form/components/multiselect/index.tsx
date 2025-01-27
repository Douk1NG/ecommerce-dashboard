import dynamic from 'next/dynamic'
import { MultiselectField } from '@/types/form'
import { useRef } from 'react'

const Multiselect = dynamic(() => import('react-select'), { ssr: false })

export default function Component({
    options = [],
    value = [],
    name,
    placeholder = '',
    readOnly
}: MultiselectField) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value:unknown) => {
        if(inputRef.current) {
            inputRef.current.value = JSON.stringify(value)
        }
    }

    return (
        <>
            <Multiselect
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
