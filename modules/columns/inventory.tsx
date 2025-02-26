import type { ColumnDef } from "@tanstack/react-table"
import type { Inventory } from '@/modules/types/inventory';
import { safeParseFloat } from "@/lib/utils";
import CONSTANTS from "@/modules/constants/inventory";

const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: CONSTANTS.KEYS.PRODUCT,
        header: CONSTANTS.SCHEME.PRODUCT,
    },
    {
        accessorKey: CONSTANTS.KEYS.QUANTITY,
        header: CONSTANTS.SCHEME.QUANTITY,
    },
    {
        accessorKey: CONSTANTS.KEYS.PRICE,
        header: CONSTANTS.SCHEME.PRICE,
        cell: ({ row }) => {
            const price = safeParseFloat(row.getValue(CONSTANTS.KEYS.PRICE))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price as number)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]

export default columns;