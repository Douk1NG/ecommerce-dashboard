'use client'
import CONSTANTS from "@/modules/constants/inflow"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/inflow"
import type { TableProps } from "@/modules/types/inflow"

function InflowTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
        />
    )
}

export default InflowTable
