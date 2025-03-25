'use client'
import CONSTANTS from "@/constants/categories"
import DataTable from "@/components/datatable"
import columns from "@/components/modules/categories/table/columns"
import type { TableProps } from "@/types/categories"

function Table({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module={CONSTANTS.NAMESPACE}
        />
    )
}

export default Table
