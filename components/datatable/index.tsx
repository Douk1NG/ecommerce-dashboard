"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePathname } from "@/i18n/routing"
import { useTranslations } from "next-intl"

import {
    type Row,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import Icon from "@/components/layout/icon"

import { cleanSplit } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/datatable/pagination"
import { DataTableViewOptions } from "@/components/datatable/view"

import type {
    ClickableRowProps,
    DataTableProps,
    NonClickableRowProps
} from "@/types/table"

import Responsive from "./responsive"

const defaultOptions = {
    selection: "single",
    enableSorting: true,
    enableFiltering: true,
    enableColumnVisibility: true,
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    translations,
    searchKey,
    options,
}: DataTableProps<TData, TValue>) {
    const t = useTranslations(translations)

    const mergedOptions = { ...defaultOptions, ...options }

    const {
        selection,
        enableSorting = true,
        enableFiltering = true,
        enableColumnVisibility = true,
    } = mergedOptions

    const isSelectable = selection !== "none"
    const isMultiSelect = selection === "multiple"

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        enableRowSelection: isSelectable,
        enableMultiRowSelection: isMultiSelect,
    })

    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()

    const headerGroups = table.getHeaderGroups()
    const rowsModel = table.getRowModel()

    const onRowClick = (row: Row<TData>) => {
        if (selection === "none") {
            return
        }

        if (isMultiSelect) {
            row.toggleSelected(!row.getIsSelected())
            return
        }

        const selectedRow = row.original as Record<string, unknown>
        const rowId = selectedRow.id

        if (params.id) {
            const [base, id] = cleanSplit({
                value: pathname,
                criteria: "/",
            })

            if (id == rowId) {
                return
            }

            router.push(`/${base}/${rowId}`, { scroll: false })
            return
        }

        router.push(`${pathname}/${rowId}`, { scroll: false })
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                {enableFiltering && searchKey && (
                    <div className="flex items-center gap-2">
                        <Icon name="search" className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("table.search")}
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="h-9 w-[150px] lg:w-[250px]"
                        />
                    </div>
                )}
                {enableColumnVisibility && <DataTableViewOptions table={table} />}
            </div>

            <div className="hidden md:block rounded-md border">
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={enableSorting && header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                                            onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex items-center justify-center">
                                                    {flexRender(t(header.column.columnDef.header), header.getContext())}
                                                    {enableSorting && header.column.getCanSort() && (
                                                        <Icon name="chevron-down"
                                                            className={`ml-1 h-4 w-4 transition-transform ${header.column.getIsSorted() === "asc"
                                                                ? "rotate-180"
                                                                : header.column.getIsSorted() === "desc"
                                                                    ? "rotate-0"
                                                                    : "rotate-0 opacity-0"
                                                                }`}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rowsModel.rows?.length ? (
                            rowsModel.rows.map((row) => (
                                isSelectable ? (
                                    <ClickableRow<TData>
                                        row={row}
                                        title={t("table.info")}
                                        onRowClick={onRowClick}
                                        key={row.id}
                                    />
                                ) : (
                                    <NonClickableRow<TData>
                                        row={row}
                                        key={row.id}
                                    />
                                )
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {t("table.empty")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Responsive
                rowsModel={rowsModel}
                headerGroups={headerGroups}
                onRowClick={onRowClick}
                isSelectable={isSelectable}
                isMultiSelect={isMultiSelect}
            />

            <DataTablePagination table={table}/>
        </div>
    )
}

const NonClickableRow = <TData,>({ row }: NonClickableRowProps<TData>) => {
    return (
        <TableRow>
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </TableCell>
            ))}
        </TableRow>
    )
}

const ClickableRow = <TData,>({ row, title, onRowClick }: ClickableRowProps<TData>) => {
    return (
        <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="cursor-pointer text-center"
            onClick={() => onRowClick(row)}
            title={title}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </TableCell>
            ))}
        </TableRow>
    )
}