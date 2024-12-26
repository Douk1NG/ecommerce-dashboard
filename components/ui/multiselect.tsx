'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import Icon from '@/components/icon'

interface Option {
    label: string
    value: string | number
}

export interface MultiSelectProps {
    options: Option[]
    placeholder?: string
    maxDisplayed?: number
    creatable?: boolean
    className?: string
    name: string,
    defaultValue?: Option[]
}

export function MultiSelect({
    options: initialOptions,
    placeholder = 'Select items...',
    maxDisplayed = 6,
    creatable = false,
    className,
    name,
    defaultValue = []
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState(initialOptions)
    const [selected, setSelected] = useState<Option[]>(defaultValue)
    const [inputValue, setInputValue] = useState('')

    const handleUnselect = (option: Option) => {
        const newSelected = selected.filter((item) => item.value !== option.value)
        setSelected(newSelected)
    }

    const handleSelect = (option: Option) => {
        const updatedSelected = selected.some((item) => item.value === option.value)
            ? selected.filter((item) => item.value !== option.value)
            : [...selected, option]
        setSelected(updatedSelected)
    }

    const handleSelectAll = () => {
        if (selected.length === options.length) {
            setSelected([])
            return;
        }
        setSelected(options)
    }

    const handleCreate = () => {
        const newOption = { label: inputValue, value: inputValue.toLowerCase().replace(/\s+/g, '-') }
        setOptions([...options, newOption])
        setSelected([...selected, newOption])
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && creatable && inputValue && !options.some(option => option.label.toLowerCase() === inputValue.toLowerCase())) {
            e.preventDefault()
            handleCreate()
        }
        if (e.key === 'Backspace' && !inputValue) {
            e.preventDefault()
            const newSelected = [...selected]
            newSelected.pop()
            setSelected(newSelected)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClear = () => {
        setSelected([])
    }

    return (
        <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
                            className
                        )}
                        type='button'
                    >
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-wrap items-center gap-2">
                            {selected.length > 0 ? (
                                <>
                                    {selected.slice(0, maxDisplayed).map((option) => (
                                        <Badge
                                            key={`selected-${option.value}`}
                                            variant="secondary"
                                            className={cn(
                                                "border-foreground/10 text-foreground bg-card hover:bg-card/80 gap-2 hover:scale-105"
                                            )}
                                        >
                                            {option.label}
                                            <Icon
                                                name="circle-x"
                                                className="cursor-pointer hover:scale-110"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleUnselect(option);
                                                }}
                                                height={16}
                                                width={16}
                                            />
                                        </Badge>
                                    ))}
                                    {selected.length > maxDisplayed && (
                                        <Badge
                                            key="more-badge"
                                            variant="secondary"
                                        >
                                            +{selected.length - maxDisplayed} more
                                        </Badge>
                                    )}
                                </>
                            ) : (
                                <span className="text-sm text-muted-foreground mx-3">
                                    {placeholder}
                                </span>
                            )}
                            </div>
                        </div>
                        <Icon name="chevron-down" className="h-4 cursor-pointer text-muted-foreground mx-2" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                            value={inputValue}
                            onValueChange={setInputValue}
                            onKeyDown={handleKeyDown}
                        />
                        <CommandList>
                            <CommandEmpty>
                                {creatable ? (
                                    <>
                                        No results found.
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="ml-2"
                                            onClick={handleCreate}
                                            type='button'
                                        >
                                            Create
                                        </Button>
                                    </>
                                ) : (
                                    "No results found."
                                )}
                            </CommandEmpty>
                            <CommandGroup>
                                <CommandItem
                                    key="all"
                                    onSelect={handleSelectAll} className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300",
                                            selected.length === options.length
                                                ? "bg-slate-200 text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <Icon name="check" className="h-4 w-4" />
                                    </div>
                                    <span>Select All</span>
                                </CommandItem>
                                {options.map((option) => (
                                    <CommandItem
                                        key={`option-${option.value}`}
                                        onSelect={() => handleSelect(option)}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300",
                                                selected.some((item) => item.value === option.value)
                                                    ? "bg-slate-200 text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Icon name="check" className="h-4 w-4" />
                                        </div>
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    <CommandItem
                                        key="clear"
                                        onSelect={handleClear}
                                        className="justify-center cursor-pointer w-full"
                                    >
                                        Clear
                                    </CommandItem>
                                    <Separator
                                        orientation="vertical"
                                        className="flex min-h-6 h-full"
                                    />
                                    <CommandItem
                                        key="close"
                                        onSelect={handleClose}
                                        className="justify-center cursor-pointer w-full"
                                    >
                                        Close
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(selected)}
            />
        </div >
    )
}