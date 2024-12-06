import type { ColumnDef } from "@tanstack/react-table"
import type { Filter } from '@/features/filters/types';

const columns: ColumnDef<Filter>[] = [
    {
        accessorKey: "name",
        header: "scheme.name",
    },
    {
        accessorKey: "filters",
        header: "scheme.filters",
    }
]

export default columns;