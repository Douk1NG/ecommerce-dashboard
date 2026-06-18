'use client'
import DataTable from "@/components/datatable"
import columns from "@/src/features/products/components/productColumns"
import type { TableProps } from "@/src/shared/types/products"

function ProductTable({ dataSource }: TableProps) {
    return (
        <DataTable
            module="products"
            columns={columns}
            data={dataSource}
        />
    )
}

export default ProductTable