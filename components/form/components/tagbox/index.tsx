'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@/components/icon'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import CONSTANTS from '@/lib/constants'
import type { TagboxField } from '@/types/form'

type Tag = {
    id: string
    value: string
}

export default function Tagbox({
    name,
    value = [],
    placeholder = '',
    readOnly = false
}: TagboxField) {
    const { toast } = useToast()
    const t = useTranslations(CONSTANTS.TAGBOX.NAMESPACE)
    const [tags, setTags] = useState<Tag[]>(value as Tag[])
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddTag = () => {
        const trimmedValue = inputValue.trim()
        const isNotEmpty = trimmedValue !== ''

        if (isNotEmpty) {
            const tagExists = tags.some(tag => tag.value.toLowerCase() === trimmedValue.toLowerCase())

            if (tagExists) {
                toast({
                    title: t(CONSTANTS.TAGBOX.VALIDATION.UNIQUE.TITLE),
                    description: t(CONSTANTS.TAGBOX.VALIDATION.UNIQUE.DESCRIPTION),
                    variant: 'destructive',
                })
                return
            }

            setTags([...tags, {
                id: Date.now().toString(),
                value: trimmedValue
            }])

            setInputValue('')
        }
    }

    const handleRemoveTag = (id: string) => {
        setTags(tags.filter(tag => tag.id !== id))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Input
                    id={name}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow"
                    readOnly={readOnly}
                />
                <Button
                    onClick={handleAddTag}
                    type="button"
                    disabled={!inputValue.trim()}
                    title={t(CONSTANTS.TAGBOX.KEY_ADD)}
                >
                    {t(CONSTANTS.TAGBOX.KEY_ADD)}
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[100px]">
                {tags.length > 0 && tags.map(tag => (
                    <div
                        key={tag.id}
                        className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md max-h-[30px]"
                    >
                        <span className="mr-1">{tag.value}</span>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-primary-foreground hover:text-primary"
                            onClick={() => handleRemoveTag(tag.id)}
                            title={t(CONSTANTS.TAGBOX.KEY_REMOVE)}
                            disabled={readOnly}
                        >
                            <Icon name="circle-x" height={16} width={16} />
                        </Button>
                    </div>
                ))}
            </div>
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(tags)}
            />
        </div>
    )
}


