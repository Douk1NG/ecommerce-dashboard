'use client'
import DataTable from "@/components/datatable"
import CONSTANTS from "../resources/constants"
import columns from "../resources/columns"
import type { InventoryTableProps } from "../types"

function InventoryTable({ dataSource }: InventoryTableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
            options={{
                selection: "none"
            }}
        />
    )
}

export default InventoryTable
