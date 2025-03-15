"use client"

import type { Table } from "@tanstack/react-table"
// Comment out the intl import
// import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/layout/icon"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
    translations: string
}

export function DataTableViewOptions<TData>({ table, translations }: DataTableViewOptionsProps<TData>) {
    // const t = useTranslations(translations)
    // Helper function to replace t() calls
    const t = (key: string) => {
        // This function replaces the intl translations with hardcoded English strings
        const translations: Record<string, string> = {
            "table.viewOptions": "View Options",
            "table.toggleColumns": "Toggle columns",
        }
        return translations[key] || key
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex gap-1">
                    <Icon name="settings-2" className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {t("table.viewOptions") || "View Options"}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>{t("table.toggleColumns") || "Toggle columns"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                    .map((column) => {
                        const header = column.columnDef.header
                        const translatedHeader = typeof header === "string" ? t(header) : header

                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {typeof translatedHeader === "string" ? translatedHeader : "Column"}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

