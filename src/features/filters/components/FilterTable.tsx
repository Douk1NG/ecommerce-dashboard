import CONSTANTS from "@/src/shared/constants/filters"

import DataTable from "@/components/datatable"
import columns from "@/src/features/filters/components/filterColumns"

import type { TableProps } from "@/src/shared/types/filters"

function Table({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module={CONSTANTS.NAMESPACE}
        />
    )
}

export default Table
