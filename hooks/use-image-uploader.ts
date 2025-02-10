import { useState, useCallback, useRef } from "react"
import { isValidFileType } from "@/lib/file"

type ImageFile = File & {
    preview: string
    id: string
}

interface UseImageUploaderProps {
    maxFiles: number
    maxFileSize: number
    value?: string | string[]
    readOnly?: boolean
}

export const useImageUploader = ({ maxFiles, maxFileSize, value, readOnly }: UseImageUploaderProps) => {
    const [images, setImages] = useState<ImageFile[]>([])
    const [externalImages, setExternalImages] = useState<Array<{url: string, id: string}>>(() => {
        if (!value) return []
        const urls = Array.isArray(value) ? value : [value]
        return urls.map((url) => ({
            url,
            id: `external-${url.split('/').pop()}-${Date.now()}`
        }))
    })
    const [preferredImageId, setPreferredImageId] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [carouselOpen, setCarouselOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isLimitReached = (images.length + externalImages.length) >= maxFiles
    const isSingleImage = Boolean((images.length + externalImages.length) && maxFiles === 1)

    const generateUniqueId = useCallback((file: File) => {
        return `${file.name}-${file.lastModified}`
    }, [])

    const handleFiles = useCallback(
        (files: FileList) => {
            if (isLimitReached) return

            // todo: add error handling when file is not valid
            const validFiles = Array.from(files).filter((file) =>
                isValidFileType(file) && file.size <= maxFileSize
            )

            const newImages = validFiles.map((file) => {
                const id = generateUniqueId(file)
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    id: id,
                })
            })

            setImages((prevImages) => {
                const updatedImages = [
                    ...prevImages.filter(prevImage =>
                        !newImages.some(newImage => newImage.id === prevImage.id)
                    ),
                    ...newImages
                ].slice(0, maxFiles)
                return updatedImages
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            if (!preferredImageId && newImages.length > 0) {
                setPreferredImageId(newImages[0].id)
            }
        },
        [isLimitReached, maxFileSize, maxFiles, preferredImageId, generateUniqueId],
    )

    const removeExternalImage = useCallback((id: string) => {
        if (readOnly) return
        setExternalImages(prev => prev.filter(img => img.id !== id))
        if (preferredImageId === id) {
            setPreferredImageId(null)
        }
    }, [readOnly, preferredImageId])

    const handlers = {
        files: handleFiles,
        drag: useCallback((e: React.DragEvent<HTMLDivElement>) => {
            if (isLimitReached) return
            e.preventDefault()
            e.stopPropagation()
            if (e.type === "dragenter" || e.type === "dragover") {
                setDragActive(true)
            } else if (e.type === "dragleave") {
                setDragActive(false)
            }
        }, [isLimitReached]),
        drop: useCallback((e: React.DragEvent<HTMLDivElement>) => {
            if (isLimitReached) return
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFiles(e.dataTransfer.files)
            }
        }, [handleFiles, isLimitReached]),
        change: useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if (e.target.files && e.target.files[0]) {
                handleFiles(e.target.files)
            }
        }, [handleFiles]),
        removeImage: useCallback((id: string) => {
            if (readOnly) return
            if (id.startsWith('external-')) {
                removeExternalImage(id)
            } else {
                setImages((prevImages) =>
                    prevImages.filter((image) => image.id !== id)
                )
            }
            if (preferredImageId === id) {
                setPreferredImageId(null)
            }
        }, [readOnly, removeExternalImage, preferredImageId]),
        setPreferred: useCallback((id: string) => {
            setPreferredImageId(id)
        }, []),
        openCarousel: useCallback(() => {
            setCarouselOpen(true)
        }, []),
        closeCarousel: useCallback(() => {
            setCarouselOpen(false)
        }, [])
    }

    return {
        images,
        externalImages,
        preferredImageId,
        dragActive,
        carouselOpen,
        isLimitReached,
        isSingleImage,
        readOnly,
        fileInputRef,
        handlers
    }
}