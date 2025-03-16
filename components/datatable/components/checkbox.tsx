import Icon from "@/components/layout/icon"

import type { CheckboxProps } from "@/types/table"

const Checkbox = <TData,>({ row, name }: CheckboxProps<TData>) => {
    const value = row.getValue(name)
    const active = Boolean(value)
    return (
        active ? <Icon name='check' className="h-5 w-5 inline"/> : <></>
    )
}

export default Checkbox