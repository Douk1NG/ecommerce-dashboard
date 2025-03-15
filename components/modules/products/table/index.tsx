'use client'
import CONSTANTS from "@/constants/products"
import DataTable from "@/components/datatable"
import columns from "@/components/modules/products/table/columns"
import type { TableProps } from "@/types/products"

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