"use client"

import IntlButton from "@/components/intl/Button"
import IntlText from "@/components/intl/Text"
import TableConstants from "@/constants/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/layout/icon"

import type { DataTableViewOptionsProps } from "@/types/table"

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IntlButton
                    variant="outline"
                    size="sm"
                    title={TableConstants.viewOptions}
                    text={true}
                >
                    <Icon name="settings-2" className="h-4 w-4" />
                </IntlButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>
                    <IntlText title={TableConstants.toggleColumns} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                    .map((column) => {
                        const header = column.columnDef.header

                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                <IntlText title={header as string} />
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

