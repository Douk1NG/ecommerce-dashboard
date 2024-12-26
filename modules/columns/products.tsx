import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from '@/modules/types/products';
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
            }).format(price as number)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "active",
        header: "scheme.active",
        cell: ({ row }) => {
            const product = row.original
            const active = Boolean(product.active)
            return (
                <div className="flex justify-center pointer-events-none">
                    <input
                        type="checkbox"
                        aria-checked={active}
                        checked={active}
                        readOnly={true}
                    />
                </div>
            )
        }
    }
]

export default columns;