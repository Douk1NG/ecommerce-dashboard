import type { ColumnDef } from "@tanstack/react-table"
import type { Outflow } from '@/modules/types/outflow';

import CONSTANTS from "@/modules/constants/outflow";

const columns: ColumnDef<Outflow>[] = [
    {
        accessorKey: CONSTANTS.KEYS.PRODUCT,
        header: CONSTANTS.SCHEME.PRODUCT,
    },
    {
        accessorKey: CONSTANTS.KEYS.QUANTITY,
        header: CONSTANTS.SCHEME.QUANTITY,
    },
    {
        accessorKey: CONSTANTS.KEYS.DATE,
        header: CONSTANTS.SCHEME.DATE,
    }
]

export default columns;