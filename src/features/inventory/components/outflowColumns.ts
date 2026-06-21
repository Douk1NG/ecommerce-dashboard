import type { ColumnDef } from '@tanstack/react-table'
import type { OutflowTableRow } from '@/src/shared/types/outflow'

const columns: ColumnDef<OutflowTableRow>[] = [
    {
        accessorKey: 'product',
        header: 'scheme.product',
    },
    {
        accessorKey: 'quantity',
        header: 'scheme.quantity',
    },
    {
        accessorKey: 'date',
        header: 'scheme.date',
    },
]

export default columns
