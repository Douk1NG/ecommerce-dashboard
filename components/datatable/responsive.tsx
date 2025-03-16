import { flexRender } from "@tanstack/react-table"

import TableConstants from "@/constants/table"
import IntlText from "@/components/intl/Text"
import IntlButton from "@/components/intl/Button"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import type { ResponsiveProps } from "@/types/table"

const Responsive = <TData,>({
    rowsModel,
    headerGroups,
    onRowClick,
    isSelectable,
    isMultiSelect
}: ResponsiveProps<TData>) => {
    return (
        <div className="md:hidden space-y-4">
            {rowsModel.rows?.length ? (
                rowsModel.rows.map((row) => (
                    <Card
                        key={row.id}
                        className={row.getIsSelected() ? "border-primary" : ""}>
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <IntlText title={`${TableConstants.item} #${row.index + 1}`} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            {row.getVisibleCells().map((cell) => {
                                const header = headerGroups[0]?.headers.find((h) => h.id === cell.column.id)

                                return (
                                    <div key={cell.id} className="grid grid-cols-2 gap-2 py-2 border-b last:border-b-0">
                                        <div className="font-medium text-sm text-muted-foreground">
                                            <IntlText title={header?.column.columnDef.header as string} />
                                        </div>
                                        <div className="text-sm">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                        {isSelectable && (
                            <CardFooter className="p-4 pt-0 flex justify-end">
                                <IntlButton
                                    variant={row.getIsSelected() ? "default" : "outline"}
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => onRowClick(row)}
                                >
                                    {isMultiSelect
                                        ? row.getIsSelected()
                                            ? <IntlText title={TableConstants.deselect} />
                                            : <IntlText title={TableConstants.select} />
                                        : <IntlText title={TableConstants.detail} />}
                                </IntlButton>
                            </CardFooter>
                        )}
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="p-4 text-center">
                        <IntlText title={TableConstants.empty} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Responsive