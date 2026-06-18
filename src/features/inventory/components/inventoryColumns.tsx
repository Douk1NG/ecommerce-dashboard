import type { ColumnDef } from "@tanstack/react-table"
import type { Inventory } from '@/src/shared/types/inventory';

const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: 'product',
        header: 'scheme.product',
    },
    {
        accessorKey: 'quantity',
        header: 'scheme.quantity',
    }
]

export default columns;