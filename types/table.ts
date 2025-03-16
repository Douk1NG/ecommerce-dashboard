import { ColumnDef, HeaderGroup, Row, RowModel, Table } from "@tanstack/react-table"

export type ClickableRowProps<TData> = {
    row: Row<TData>
    onRowClick: (row: Row<TData>) => void
    title: string
}

export type NonClickableRowProps<TData> = {
    row: Row<TData>
}

export type ResponsiveProps<TData> = {
    rowsModel: RowModel<TData>
    headerGroups: HeaderGroup<TData>[]
    onRowClick: (row: Row<TData>) => void
    isSelectable?: boolean
    isMultiSelect?: boolean
}

export type DataTablePaginationProps<TData> = {
    table: Table<TData>
}

export type DataTableViewOptionsProps<TData> = {
    table: Table<TData>
}

export type SelectionOption = "single" | "multiple" | "none"

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    translations: string
    searchKey?: string
    options?: {
        selection?: SelectionOption
        enableSorting?: boolean
        enableFiltering?: boolean
        enableColumnVisibility?: boolean
    }
}



