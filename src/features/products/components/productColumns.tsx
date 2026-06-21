import Currency from "@/components/datatable/components/currency";
import Checkbox from "@/components/datatable/components/checkbox";

import type { ColumnDef } from "@tanstack/react-table"
import type { ProductTableRow } from '@/src/shared/types/products';

const columns: ColumnDef<ProductTableRow>[] = [
    {
        accessorKey: 'name',
        header: 'scheme.name',
    },
    {
        accessorKey: 'price',
        header: 'scheme.price',
        cell: ({ row }) => (
            <Currency
                row={row}
                name="price"
            />
        )
    },
    {
        accessorKey: 'active',
        header: 'scheme.active',
        cell: ({ row }) => (
            <Checkbox
                row={row}
                name="active"
            />
        )
    }
]

export default columns;