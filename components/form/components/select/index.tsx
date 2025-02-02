import dynamic from 'next/dynamic'
import { useInheritanceContext } from '@/context/InheritanceProvider'
import type { SelectField } from "@/types/form"

const Select = dynamic(() => import('react-select'), { ssr: false })

const Component = ({
    options = [],
    value,
    name,
    placeholder = '',
    readOnly
}: SelectField) => {
    const { onChange } = useInheritanceContext()

    const handleChange = (value: unknown) => {
        onChange(name, value)
    }

    return (
        <Select
            options={options}
            defaultValue={value}
            name={name}
            placeholder={placeholder}
            className='select-tw-fix'
            isClearable={true}
            isDisabled={readOnly}
            onChange={handleChange}
        />
    )
}

export default Component