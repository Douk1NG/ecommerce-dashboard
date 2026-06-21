import DataTable from '@/components/datatable'
import columns from '@/src/features/inventory/components/outflowColumns'
import type { TableProps } from '@/src/shared/types/outflow'

function OutflowTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module="outflow"
        />
    )
}

export default OutflowTable
