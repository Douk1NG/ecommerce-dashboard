'use client'
import CONSTANTS from "@/modules/constants/products"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/products"
import type { TableProps } from "@/modules/types/products"

function ProductTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
        />
    )
}

export default ProductTable
