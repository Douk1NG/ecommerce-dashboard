import { Row } from "@tanstack/react-table"

import {
    safeParseFloat
} from "@/utils/safeParse"

type propsType = {
    row: Row<any>,
    name:string
}

const Currency = ({row, name}: propsType) => {
    const value = row.getValue(name)
    const price = safeParseFloat(value)
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price as number)

    return (
        <div className="font-medium">{formatted}</div>
    )
}

export default Currency