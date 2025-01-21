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
    {
        accessorKey: CONSTANTS.KEYS.FEATURED_CATEGORY,
        header: CONSTANTS.SCHEME.FEATURED_CATEGORY,
        cell: ({ row }) => {
            const category = row.original
            const featured = Boolean(category.featured_category)
            return (
                <div className="flex justify-center pointer-events-none">
                    <input
                        type="checkbox"
                        aria-checked={featured}
                        checked={featured}
                        readOnly={true}
                    />
                </div>
            )
        }
    }
]

export default columns;