import type { ColumnDef } from "@tanstack/react-table"
import type { Filter } from '@/types/filters';

import CONSTANTS from "@/constants/filters";

const columns: ColumnDef<Filter>[] = [
    {
        accessorKey: CONSTANTS.KEYS.NAME,
        header: CONSTANTS.SCHEME.NAME,
    },
    {
        accessorKey: CONSTANTS.KEYS.FILTERS,
        header: CONSTANTS.SCHEME.FILTERS,
    }
]

export default columns;