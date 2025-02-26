import type { ColumnDef } from "@tanstack/react-table"
import type { Inflow } from '@/modules/types/inflow';

import CONSTANTS from "@/modules/constants/outflow";

const columns: ColumnDef<Inflow>[] = [
    {
        accessorKey: CONSTANTS.KEYS.PRODUCT_NAME,
        header: CONSTANTS.SCHEME.PRODUCT_NAME,
    },
    {
        accessorKey: CONSTANTS.KEYS.QUANTITY,
        header: CONSTANTS.SCHEME.QUANTITY,
    }
]

export default columns;