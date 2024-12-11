'use client'
import CONSTANTS from "../resources/constants"
import DataTable from "@/components/datatable"
import columns from "../resources/columns"
import type { CategoryTableProps } from "../types"

function CategoriesTable({ dataSource }: CategoryTableProps) {
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

export default CategoriesTable
