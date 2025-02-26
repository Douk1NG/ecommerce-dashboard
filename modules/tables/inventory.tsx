'use client'
import CONSTANTS from "@/modules/constants/inventory"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/inventory"
import type { TableProps } from "@/modules/types/inventory"

function InventoryTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
        />
    )
}

export default InventoryTable
