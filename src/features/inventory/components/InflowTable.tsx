import DataTable from '@/components/datatable'
import columns from '@/src/features/inventory/components/inflowColumns'
import type { TableProps } from '@/src/shared/types/inflow'

function InflowTable({ dataSource }: TableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            module="inflow"
        />
    )
}

export default InflowTable
