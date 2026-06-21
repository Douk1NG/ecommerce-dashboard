import type { ColumnDef } from '@tanstack/react-table'
import type { InflowTableRow } from '@/src/shared/types/inflow'

const columns: ColumnDef<InflowTableRow>[] = [
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
