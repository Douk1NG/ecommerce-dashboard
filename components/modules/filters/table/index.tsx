import CONSTANTS from "@/constants/filters"

import DataTable from "@/components/datatable"
import columns from "@/components/modules/filters/table/columns"

import type { TableProps } from "@/types/filters"

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
