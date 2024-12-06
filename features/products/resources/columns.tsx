import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from '@/features/products/types';
import { safeParseFloat } from "@/lib/utils";

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "scheme.name",
    },
    {
        accessorKey: "description",
        header: "scheme.description",
    },
    {
        accessorKey: "price",
        header: "scheme.price",
        cell: ({ row }) => {
            const price = safeParseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="text-right font-medium">{formatted}</div>

        },
    },
    {
        accessorKey: "active",
        header: "scheme.active",
        cell: ({ row }) => {
            const product = row.original
            return (
                <div className="flex justify-center pointer-events-none">
                    <input
                        type="checkbox"
                        aria-checked={product.active}
                        checked={product.active}
                        readOnly={true}
                    />
                </div>
            )
        }
    }
]

export default columns;