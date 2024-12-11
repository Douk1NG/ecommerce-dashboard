'use client'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CONSTANTS from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'


export type TagProps = {
    tags?: string[]
}

export default function TagInput(props: Record<string, any>) {
    const t = useTranslations(CONSTANTS.TAGBOX.NAMESPACE)
    const inputRef = useRef<HTMLInputElement>(null)

    const [tags, setTags] = useState<string[]>(props.tags || [])
    const [inputValue, setInputValue] = useState({
        value: '',
        update: false
    })
    const [msg, setMsg] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({
            value: e.target.value,
            update: false
        })
    }

    const clearInput = () => {
        setInputValue({
            value: '',
            update: false
        })
    }

    const handleAddTag = () => {
        setMsg('')

        const isset = issetTag(inputValue.value)

        if (inputValue.value.trim() === '') {
            return;
        }

        if (isset) {
            console.log('isset', isset)
            if (inputValue.update) {
                clearInput()
                return
            }
            setMsg(t(CONSTANTS.TAGBOX.MSG.TAG_EXISTS))
            inputRef.current?.focus()
            return
        }

        handleTagUpdate(inputValue.value)
    }

    const handleTagUpdate = (tag: string) => {
        const newTags = [...tags, tag]
        setTags(newTags)
        clearInput()

        if (props.onChange) {
            props.onChange(newTags)
        }
    }

    const issetTag = (value: string) => {
        return tags.some(tag => tag === value)
    }

    const handleRemoveTag = (value: string) => {
        setTags(tags.filter(tag => tag !== value))

        if (inputValue.value === value) {
            clearInput()
        }
    }

    const handleEditTag = (tag: string) => {
        setInputValue({
            value: tag,
            update: true
        })
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
                    type="text"
                    value={inputValue.value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={props.placeholder}
                    className="flex-grow"
                    id={props.id}
                    ref={inputRef}
                />
                <Button
                    onClick={handleAddTag}
                    type='button'
                    title={t(CONSTANTS.TAGBOX.ADD)}
                    disabled={inputValue.value.trim() === ''}
                >
                    {inputValue.update ? t(CONSTANTS.TAGBOX.UPDATE) : t(CONSTANTS.TAGBOX.ADD)}
                </Button>
            </div>
            {msg && <p className="text-red-500 mt-2 text-sm">{msg}</p>}
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-20">
                {tags.map(tag => (
                    <div
                        key={tag}
                        className={`h-8 flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md ${inputValue.value === tag ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    >
                        <small
                            onClick={() => handleEditTag(tag)}
                            className="cursor-pointer mr-1"
                            title={t(CONSTANTS.TAGBOX.TITLES.TAG)}
                        >
                            {tag}
                        </small>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-primary-foreground hover:text-primary"
                            onClick={() => handleRemoveTag(tag)}
                            title={t(CONSTANTS.TAGBOX.TITLES.REMOVE)}
                            type='button'
                        >
                            <Icon name='circle-x' className='h-4 w-4' />
                            <span className="sr-only">
                                {t(CONSTANTS.TAGBOX.TITLES.REMOVE)}
                            </span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

