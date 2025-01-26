import dynamic from 'next/dynamic'
import type { SelectField } from "@/types/form"

const Select = dynamic(() => import('react-select'), { ssr: false })

const Component = ({
    options = [],
    value,
    name,
    placeholder = ''
}: SelectField) => {

    return (
        <Select
            options={options}
            value={value}
            name={name}
            placeholder={placeholder}
            className='select-tw-fix'
            isClearable={true}
        />
    )
}

export default Component