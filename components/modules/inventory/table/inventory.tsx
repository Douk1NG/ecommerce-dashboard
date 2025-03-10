'use client'
import CONSTANTS from "@/constants/inventory"
import DataTable from "@/components/datatable"
import columns from "@/modules/columns/inventory"
import type { TableProps } from "@/types/inventory"

function InventoryTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
            options={{
                selection: 'none'
            }}
        />
    )
}

export default InventoryTable
