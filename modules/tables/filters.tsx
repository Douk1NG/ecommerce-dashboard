'use client'
import CONSTANTS from "@/modules/constants/filters"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/filters"
import type { FilterTableProps } from "@/modules/types/filters"

function FilterTable({ dataSource }: FilterTableProps) {
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

export default FilterTable
