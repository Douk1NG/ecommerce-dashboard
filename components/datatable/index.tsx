"use client"

import { type ColumnDef, flexRender, getCoreRowModel, type Row, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { usePathname } from "@/i18n/routing"
import { cleanSplit } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"

type options = {
    selection?: "single" | "none"
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    translations: string
    options?: options
}

const defaultOptions = {
    selection: "single",
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    translations,
    options,
}: DataTableProps<TData, TValue>) {
    const t = useTranslations(translations)

    const { selection } = options || defaultOptions

    const isSelectable = selection !== "none"

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
        <div className="w-full">
            <div className="hidden md:block rounded-md border">
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-center">
                                            {header.isPlaceholder ? null : flexRender(t(header.column.columnDef.header), header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rowsModel.rows?.length ? (
                            rowsModel.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${isSelectable ? "cursor-pointer" : ""} text-center`}
                                    onClick={isSelectable ? () => onRowClick(row) : undefined}
                                    title={isSelectable ? t("table.info") : undefined}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t("table.empty")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="md:hidden space-y-4">
                {rowsModel.rows?.length ? (
                    rowsModel.rows.map((row) => (
                        <Card key={row.id}>
                            <CardContent className="p-4">
                                {row.getVisibleCells().map((cell) => {
                                    const header = headerGroups[0].headers.find((h) => h.id === cell.column.id)

                                    return (
                                        <div key={cell.id} className="grid grid-cols-2 gap-2 py-2 border-b last:border-b-0">
                                            <div className="font-medium text-sm text-muted-foreground">
                                                {header && !header.isPlaceholder ? t(header.column.columnDef.header) : null}
                                            </div>
                                            <div className="text-sm">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                            {isSelectable && (
                                    <CardFooter className="p-4 pt-0 flex justify-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer"
                                            onClick={() => onRowClick(row)}>
                                            {t("table.detail")}
                                        </Button>
                                    </CardFooter>
                                )}
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-4 text-center">{t("table.empty")}</CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

