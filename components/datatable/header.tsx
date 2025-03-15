"use client"

import type React from "react"

import type { Column } from "@tanstack/react-table"
// Comment out the intl import
// import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Icon from "@/components/layout/icon"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    translations: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    translations,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    // const t = useTranslations(translations)
    // Helper function to replace t() calls
    const t = (key: string) => {
        // This function replaces the intl translations with hardcoded English strings
        const translations: Record<string, string> = {
            "table.sortAsc": "Asc",
            "table.sortDesc": "Desc",
            "table.hide": "Hide",
        }
        return translations[key] || key
    }

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{t(title)}</div>
    }

    return (
        <div className={cn("flex items-center justify-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                        <span>{t(title)}</span>
                        {column.getIsSorted() === "desc" ? (
                            <Icon name="arrow-down" className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <Icon name="arrow-up" className="ml-2 h-4 w-4" />
                        ) : (
                            <Icon name="chevron-up-down" className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <Icon name="arrow-up" className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t("table.sortAsc") || "Asc"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <Icon name="arrow-down" className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t("table.sortDesc") || "Desc"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <Icon name="eye-off" className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {t("table.hide") || "Hide"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

