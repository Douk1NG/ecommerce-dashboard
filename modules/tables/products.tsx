'use client'
import CONSTANTS from "@/modules/constants/products"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/products"
import type { ProductTableProps } from "@/modules/types/products"

function ProductTable({ dataSource }: ProductTableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
            options={{
                selection: "single"
            }}
        />
    )
}

export default ProductTable
