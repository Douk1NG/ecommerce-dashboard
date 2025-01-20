import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from '@/modules/types/categories';

import CONSTANTS from "@/modules/constants/categories";

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: CONSTANTS.KEYS.NAME,
        header: CONSTANTS.SCHEME.NAME,
    },
    {
        accessorKey: CONSTANTS.KEYS.SUBCATEGORIES,
        header: CONSTANTS.SCHEME.SUBCATEGORIES,
    },
    {
        accessorKey: CONSTANTS.KEYS.FILTERS,
        header: CONSTANTS.SCHEME.FILTERS,
    },
]

export default columns;