import dynamic from 'next/dynamic'
import type { SelectField } from "@/types/form"

const Select = dynamic(() => import('react-select'), { ssr: false })

const Component = ({
    options = [],
    value,
    name,
    placeholder = '',
    readOnly
}: SelectField) => {

    return (
        <Select
            options={options}
            defaultValue={value}
            name={name}
            placeholder={placeholder}
            className='select-tw-fix'
            isClearable={true}
            isDisabled={readOnly}
        />
    )
}

export default Component