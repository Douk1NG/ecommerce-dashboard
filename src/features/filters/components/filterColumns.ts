import type { ColumnDef } from "@tanstack/react-table"
import type { Filter } from '@/src/shared/types/filters';

const columns: ColumnDef<Filter>[] = [
    {
        accessorKey: 'name',
        header: 'scheme.name',
    },
    {
        accessorKey: 'filters',
        header: 'scheme.filters',
    }
]

export default columns;