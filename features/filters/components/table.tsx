'use client'
import CONSTANTS from "../resources/constants"
import DataTable from "@/components/datatable"
import columns from "@/features/filters/resources/columns"
import type { FilterTableProps } from "@/features/filters/types"

function FiltersTable({ dataSource }: FilterTableProps) {
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

export default FiltersTable
