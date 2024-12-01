'use client'

import columns from "@/features/products/resources/columns"
import DataTable from "@/components/datatable"
import type { ProductTableProps } from "@/types/products"
import { translations } from "@/i18n/request"

function ProductTable({dataSource}:ProductTableProps) {
    return (
        <DataTable
            columns={columns}
            data={dataSource}
            translations={translations.products}
        />
    )
}

export default ProductTable
