import CONSTANTS from "@/modules/constants/inventory";
import Currency from "@/components/datatable/components/currency";

import type { ColumnDef } from "@tanstack/react-table"
import type { Inventory } from '@/modules/types/inventory';

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
        cell: ({ row }) => (
            <Currency
                row={row}
                name={CONSTANTS.KEYS.PRICE}
            />
        )
    }
]

export default columns;