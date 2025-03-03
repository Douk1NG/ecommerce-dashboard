import CONSTANTS from "@/modules/constants/categories";
import Checkbox from "@/components/datatable/components/checkbox";

import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from '@/modules/types/categories';

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
    {
        accessorKey: CONSTANTS.KEYS.FEATURED_CATEGORY,
        header: CONSTANTS.SCHEME.FEATURED_CATEGORY,
        cell: ({ row }) => (
            <Checkbox
                row={row}
                name={CONSTANTS.KEYS.FEATURED_CATEGORY}
            />
        )
    }
]

export default columns;