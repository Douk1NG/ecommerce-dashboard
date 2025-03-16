"use client"

import TableConstants from "@/constants/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Icon from "@/components/layout/icon"

import IntlText from "@/components/intl/Text"
import IntlButton from "@/components/intl/Button"

import type { DataTablePaginationProps } from "@/types/table"

const pageSizes = [10, 20, 30, 40, 50]

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <>
                        {table.getFilteredSelectedRowModel().rows.length}
                        <IntlText title={TableConstants.of} />
                        {table.getFilteredRowModel().rows.length}
                        <IntlText title={TableConstants.rowsSelected} />
                    </>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium whitespace-nowrap">
                        <IntlText title={TableConstants.rowsPerPage} />
                    </p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {pageSizes.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    <>{pageSize}</>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    <IntlText title={TableConstants.page} />
                    {table.getState().pagination.pageIndex + 1}
                    <IntlText title={TableConstants.of} />
                    {table.getPageCount() || 1}
                </div>
                <div className="flex items-center gap-2">
                    <IntlButton
                        title={TableConstants.firstPage}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <Icon name="chevron-left" className="h-4 w-4" />
                    </IntlButton>
                    <IntlButton
                        title={TableConstants.previousPage}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <Icon name="chevron-left" className="h-4 w-4" />
                    </IntlButton>
                    <IntlButton
                        title={TableConstants.nextPage}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <Icon name="chevron-right" className="h-4 w-4" />
                    </IntlButton>
                    <IntlButton
                        title={TableConstants.lastPage}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <Icon name="chevron-right" className="h-4 w-4" />
                    </IntlButton>
                </div>
            </div>
        </div>
    )
}

