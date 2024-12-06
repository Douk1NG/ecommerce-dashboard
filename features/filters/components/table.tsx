'use client'

import columns from "@/features/filters/resources/columns"
import DataTable from "@/components/datatable"
import type { FilterTableProps } from "@/features/filters/types"
import { translations } from "@/i18n/request"

function FiltersTable({ dataSource }: FilterTableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={translations.filters}
            options={{
                selection: "single"
            }}
        />
    )
}

export default FiltersTable
