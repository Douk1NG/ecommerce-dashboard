import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import CONSTANTS from '@/lib/constants'
import type { Tag } from '@/types/components/tagbox'

export const useTagbox = (initialTags: Tag[] = []) => {
    const { toast } = useToast()
    const t = useTranslations(CONSTANTS.TAGBOX.NAMESPACE)
    const [tags, setTags] = useState<Tag[]>(initialTags)
    const [inputValue, setInputValue] = useState('')

    const isTagExists = useCallback((value: string) => {
        return tags.some(tag => tag.label.toLowerCase() === value.toLowerCase())
    }, [tags])

    const createNewTag = useCallback((value: string): Tag => ({
        value: Date.now().toString(),
        label: value.trim()
    }), [])

    const showDuplicateError = useCallback(() => {
        toast({
            title: t(CONSTANTS.TAGBOX.VALIDATION.UNIQUE.TITLE),
            description: t(CONSTANTS.TAGBOX.VALIDATION.UNIQUE.DESCRIPTION),
            variant: 'destructive',
        })
    }, [t, toast])

    const addTag = useCallback(() => {
        const trimmedValue = inputValue.trim()
        const isEmpty = trimmedValue === ''

        if (isEmpty) return

        if (isTagExists(trimmedValue)) {
            showDuplicateError()
            return
        }

        setTags(prevTags => [...prevTags, createNewTag(trimmedValue)])
        setInputValue('')
    }, [inputValue, isTagExists, createNewTag, showDuplicateError])

    const removeTag = useCallback((label: string) => {
        setTags(prevTags => prevTags.filter(tag => tag.label !== label))
    }, [])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }, [addTag])

    return {
        tags,
        inputValue,
        isInputEmpty: !inputValue.trim(),
        handleInputChange,
        handleKeyDown,
        addTag,
        removeTag
    }
}