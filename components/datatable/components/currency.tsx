import {
    safeParseFloat
} from "@/utils/safeParse"

import type { CurrencyProps } from "@/types/table"

const Currency = <TData,>({row, name}: CurrencyProps<TData>) => {
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