import dynamic from 'next/dynamic'
import { MultiselectField } from '@/types/form'

const Multiselect = dynamic(() => import('react-select'), { ssr: false })

export default function Component({
    options = [],
    value,
    name,
    placeholder = ''
}:  MultiselectField) {

    return (
        <Multiselect
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            isMulti
            options={options}
            className='select-tw-fix'
            isClearable={true}
            closeMenuOnSelect={true}
        />
    )
}
