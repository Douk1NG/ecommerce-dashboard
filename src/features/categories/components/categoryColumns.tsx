import Checkbox from "@/components/datatable/components/checkbox";

import type { ColumnDef } from "@tanstack/react-table"
import type { Category } from '@/src/shared/types/categories';

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'scheme.name',
    },
    {
        accessorKey: 'subcategories',
        header: 'scheme.subcategories',
    },
    {
        accessorKey: 'filters',
        header: 'scheme.filters',
    },
    {
        accessorKey: 'featured_category',
        header: 'scheme.featured_category',
        cell: ({ row }) => (
            <Checkbox
                row={row}
                name="featured_category"
            />
        )
    }
]

export default columns;