"use client"

import type { Table } from "@tanstack/react-table"

// Comment out the intl import
// import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Icon from "@/components/layout/icon"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
    translations: string
}

export function DataTablePagination<TData>({ table, translations }: DataTablePaginationProps<TData>) {
    // const t = useTranslations(translations)
    // Helper function to replace t() calls
    const t = (key: string) => {
        // This function replaces the intl translations with hardcoded English strings
        const translations: Record<string, string> = {
            "table.of": "of",
            "table.rowsSelected": "row(s) selected",
            "table.rowsPerPage": "Rows per page",
            "table.page": "Page",
            "table.firstPage": "First page",
            "table.previousPage": "Previous page",
            "table.nextPage": "Next page",
            "table.lastPage": "Last page",
        }
        return translations[key] || key
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <>
                        {table.getFilteredSelectedRowModel().rows.length} {t("table.of") || "of"}{" "}
                        {table.getFilteredRowModel().rows.length} {t("table.rowsSelected") || "row(s) selected"}.
                    </>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium whitespace-nowrap">{t("table.rowsPerPage") || "Rows per page"}</p>
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
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    {t("table.page") || "Page"} {table.getState().pagination.pageIndex + 1} {t("table.of") || "of"}{" "}
                    {table.getPageCount() || 1}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        title={t("table.firstPage") || "First page"}
                    >
                        <span className="sr-only">{t("table.firstPage") || "Go to first page"}</span>
                        <Icon name="chevron-left" className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        title={t("table.previousPage") || "Previous page"}
                    >
                        <span className="sr-only">{t("table.previousPage") || "Go to previous page"}</span>
                        <Icon name="chevron-left" className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        title={t("table.nextPage") || "Next page"}
                    >
                        <span className="sr-only">{t("table.nextPage") || "Go to next page"}</span>
                        <Icon name="chevron-right" className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        title={t("table.lastPage") || "Last page"}
                    >
                        <span className="sr-only">{t("table.lastPage") || "Go to last page"}</span>
                        <Icon name="chevron-right" className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

