"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
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

import { useParams, useRouter } from "next/navigation"
import { usePathname } from "@/i18n/routing"
import { cleanSplit } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    translations: string
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    translations
}: DataTableProps<TData, TValue>) {

    const t = useTranslations(translations)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const onRowClick = (row: Row<TData>) => {
        const selectedRow = row.original as Record<string, unknown>
        const rowId = selectedRow.id

        if (params.id) {
            const [base, id] = cleanSplit({
                value: pathname,
                criteria: '/'
            })

            if (id == rowId) {
                return
            }

            router.push(`/${base}/${rowId}`)
            return
        }

        router.push(`${pathname}/${rowId}`)
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                t(header.column.columnDef.header),
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="cursor-pointer"
                                onClick={() => onRowClick(row)}
                                title={t('table.info')}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length} className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

