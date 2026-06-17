import CONSTANTS from "@/src/shared/constants/products";
import Currency from "@/components/datatable/components/currency";
import Checkbox from "@/components/datatable/components/checkbox";

import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from '@/src/shared/types/products';

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: CONSTANTS.KEYS.NAME,
        header: CONSTANTS.SCHEME.NAME,
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
    },
    {
        accessorKey: CONSTANTS.KEYS.ACTIVE,
        header: CONSTANTS.SCHEME.ACTIVE,
        cell: ({ row }) => (
            <Checkbox
                row={row}
                name={CONSTANTS.KEYS.ACTIVE}
            />
        )
    }
]

export default columns;