'use client'
import CONSTANTS from "@/modules/constants/outflow"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/outflow"
import type { TableProps } from "@/modules/types/outflow"

function OutflowTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
        />
    )
}

export default OutflowTable
