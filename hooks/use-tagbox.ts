import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import type { Tag } from '@/src/shared/types/tagbox'

export const useTagbox = (initialTags: Tag[] = []) => {
    const { toast } = useToast()
    const t = useTranslations()
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
            title: t('layout.form.tagbox.validation.unique.title'),
            description: t('layout.form.tagbox.validation.unique.description'),
            variant: 'destructive',
        })
    }, [toast, t])

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