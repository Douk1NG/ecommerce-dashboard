import CONSTANTS from "@/modules/constants/categories"

import DataTable from "@/components/datatable"
import columns from "@/modules/columns/categories"

import type { TableProps } from "@/modules/types/categories"

function Table({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={CONSTANTS.NAMESPACE}
        />
    )
}

export default Table
