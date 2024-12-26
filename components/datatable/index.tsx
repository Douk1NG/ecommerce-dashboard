"use client"

import {
    Cell,
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

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/components/ui/accordion"

import { useParams, useRouter } from "next/navigation"
import { usePathname } from "@/i18n/routing"
import { cleanSplit } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import Icon from "../icon"


type options = {
    selection?: 'single' | 'none'
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    translations: string,
    options: options
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    translations,
    options
}: DataTableProps<TData, TValue>) {

    const t = useTranslations(translations)

    const {
        selection = 'single'
    } = options

    const isSelectable = selection !== 'none'

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const headerGroups = table.getHeaderGroups()
    const rowsModel = table.getRowModel()

    const onRowClick = (row: Row<TData>) => {
        if (selection === 'none') {
            return;
        }
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
        <div className="w-full">
            <div className="hidden md:block rounded-md border">
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
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
                        {rowsModel.rows?.length ? (
                            rowsModel.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={isSelectable ? "cursor-pointer" : ""}
                                    onClick={isSelectable ? () => onRowClick(row) : undefined}
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
                                    {t('table.empty')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="md:hidden space-y-4">
                <Accordion type="single" collapsible className="space-y-4">
                    {rowsModel.rows?.length ? (
                        rowsModel.rows.map((row) => {
                            const visibleCells = row.getVisibleCells()
                            const firstCell = visibleCells[0]
                            const restCells = visibleCells.slice(1)

                            return (
                                <AccordionItem key={row.id} value={`item-${row.id}`}>
                                    <AccordionTrigger className="flex items-center gap-4 px-4">
                                        <div className="flex flex-col text-start ">
                                            <h6 className="text-muted-foreground">{t(firstCell.column.columnDef.header?.toString())}</h6>
                                            <p className="font-medium">
                                                {flexRender(
                                                    firstCell.column.columnDef.cell,
                                                    firstCell.getContext()
                                                )}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 px-4 pb-4">
                                            <div className="flex items-center justify-between gap-4">
                                                {restCells.map((cell) => (
                                                    <div key={cell.id} className="w-full">
                                                        <h6 className="font-medium">{t(cell.column.columnDef.header?.toString())}</h6>
                                                        <p className="text-muted-foreground" key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </p>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    type="button"
                                                    className="w-full"
                                                    onClick={() => onRowClick(row)}
                                                >
                                                    {t('table.edit')}
                                                    <Icon name="pencil" className="ml-2" />
                                                </Button>
                                            </div>
                                        </div>

                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Accordion>
            </div>
        </div>
    )
}
