'use client'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'


export type TagProps = {}

type Tag = {
    id: string
    value: string
}

export default function TagInput() {
    const [tags, setTags] = useState<Tag[]>([])
    const [inputValue, setInputValue] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddTag = () => {
        if (inputValue.trim() !== '') {
            if (editingId) {
                setTags(tags.map(tag =>
                    tag.id === editingId ? { ...tag, value: inputValue } : tag
                ))
                setEditingId(null)
            } else {
                setTags([...tags, { id: Date.now().toString(), value: inputValue }])
            }
            setInputValue('')
        }
    }

    const handleRemoveTag = (id: string) => {
        setTags(tags.filter(tag => tag.id !== id))
        if (editingId === id) {
            setEditingId(null)
            setInputValue('')
        }
    }

    const handleEditTag = (tag: Tag) => {
        setEditingId(tag.id)
        setInputValue(tag.value)
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
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a tag"
                    className="flex-grow"
                />
                <Button onClick={handleAddTag} type='button'>
                    {editingId ? 'Update' : 'Add'}
                </Button>
            </div>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                    {tags.map(tag => (
                        <div
                            key={tag.id}
                            className={`flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md ${editingId === tag.id ? 'ring-2 ring-offset-2 ring-primary' : ''
                                }`}
                        >
                            <small
                                onClick={() => handleEditTag(tag)}
                                className="cursor-pointer mr-1"
                                title='Click to update the value'
                            >
                                {tag.value}
                            </small>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-4 w-4 p-0 hover:bg-primary-foreground hover:text-primary"
                                onClick={() => handleRemoveTag(tag.id)}
                                title='Click to remove'
                            >
                                <Icon name='circle-x' />
                                <span className="sr-only">Remove tag</span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

