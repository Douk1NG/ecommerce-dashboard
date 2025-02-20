'use client'
import CONSTANTS from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@/components/icon'
import { useTranslations } from 'next-intl'
import { useTagbox } from '@/hooks/use-tagbox'
import type { TagboxField } from '@/types/form'
import type { Tag } from '@/types/tagbox'

export default function Tagbox({
    name,
    value = [],
    placeholder = '',
    readOnly = false
}: TagboxField) {
    const t = useTranslations(CONSTANTS.TAGBOX.NAMESPACE)
    const {
        tags,
        inputValue,
        isInputEmpty,
        handleInputChange,
        handleKeyDown,
        addTag,
        removeTag
    } = useTagbox(value as Tag[])

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
                    className="grow"
                    readOnly={readOnly}
                />
                <Button
                    onClick={addTag}
                    type="button"
                    disabled={isInputEmpty}
                    title={t(CONSTANTS.TAGBOX.KEY_ADD)}
                >
                    {t(CONSTANTS.TAGBOX.KEY_ADD)}
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[100px]">
                {tags.length > 0 && tags.map(tag => (
                    <div
                        key={tag.label}
                        className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md max-h-[30px]"
                    >
                        <span className="mr-1">{tag.label}</span>

                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-primary-foreground hover:text-primary"
                            onClick={() => removeTag(tag.label)}
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