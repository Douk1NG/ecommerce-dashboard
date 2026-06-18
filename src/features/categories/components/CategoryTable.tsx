'use client'
import DataTable from "@/components/datatable"
import columns from "@/src/features/categories/components/categoryColumns"
import type { TableProps } from "@/src/shared/types/categories"

function Table({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module="categories"
        />
    )
}

export default Table;
