import Icon from "@/components/layout/icon"
import { Row } from "@tanstack/react-table"

type propsType = {
    row: Row<any>,
    name: string
}

const Checkbox = ({ row, name }: propsType) => {
    const value = row.getValue(name)
    const active = Boolean(value)
    return (
        active ? <Icon name='check' className="h-5 w-5 inline"/> : <></>
    )
}

export default Checkbox