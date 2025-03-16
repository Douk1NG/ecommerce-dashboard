"use client"

import type React from "react"
import type { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/layout/icon"
import IntlText from "@/components/intl/Text"
import IntlButton from "@/components/intl/Button"

import TableConstants from "@/constants/table"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className
}: DataTableColumnHeaderProps<TData, TValue>) {

    if (!column.getCanSort()) {
        return (
            <div className={cn(className)}>
                <IntlText title={title} />
            </div>
        )
    }

    const sortedIcon = column.getIsSorted() === "desc" ? "arrow-down" : column.getIsSorted() === "asc" ? "arrow-up" : "chevron-up-down"

    return (
        <div className={cn("flex items-center justify-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <IntlButton
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        title={title}
                        text={true}
                    >
                        <Icon name={sortedIcon} className="ml-2 h-4 w-4" />
                    </IntlButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <Icon
                            name="arrow-up"
                            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                        />
                        <IntlText title={TableConstants.sortAsc} />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <Icon
                            name="arrow-down"
                            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                        />
                        <IntlText title={TableConstants.sortDesc} />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <Icon
                            name="eye-off"
                            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                        />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

