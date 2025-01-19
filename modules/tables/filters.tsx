import CONSTANTS from "@/modules/constants/filters"

import DataTable from "@/components/datatable"
import columns from "@/modules/columns/filters"

import type { TableProps } from "@/modules/types/filters"

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
