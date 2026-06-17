'use client'
import CONSTANTS from "@/src/shared/constants/inventory"
import DataTable from "@/components/datatable"
import columns from "@/src/features/inventory/components/inventoryColumns"
import type { TableProps } from "@/src/shared/types/inventory"

function InventoryTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module={CONSTANTS.NAMESPACE}
            options={{
                selection: 'none'
            }}
        />
    )
}

export default InventoryTable
