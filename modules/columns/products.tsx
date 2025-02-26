import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from '@/modules/types/products';
import { safeParseFloat } from "@/lib/utils";
import CONSTANTS from "@/modules/constants/products";

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: CONSTANTS.KEYS.NAME,
        header: CONSTANTS.SCHEME.NAME,
    },
    {
        accessorKey: CONSTANTS.KEYS.PRICE,
        header: CONSTANTS.SCHEME.PRICE,
        cell: ({ row }) => {
            const price = safeParseFloat(row.getValue(CONSTANTS.KEYS.PRICE))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price as number)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: CONSTANTS.KEYS.ACTIVE,
        header: CONSTANTS.SCHEME.ACTIVE,
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