import { useState, useCallback, useRef } from "react"
import { isValidFileType } from "@/lib/file"
import { UseImageUploaderProps, ImageFile, ExternalImage } from "@/types/image-uploader"

const getExternalImages = (value: UseImageUploaderProps['value']) => {
    if(typeof value === 'string') {
        return [{
            url: value,
            name: value
        }]
    }

    if (value?.values.length) {
        const urls = Array.isArray(value.values) ? value.values : [value.values]
        return urls.map((url) => ({
            url,
            name: url
        }))
    }
    return []
}

export const useImageUploader = ({
    maxFiles,
    maxFileSize,
    value,
    readOnly
}: UseImageUploaderProps) => {
    const [images, setImages] = useState<ImageFile[]>([])
    const [externalImages, setExternalImages] = useState<ExternalImage[]>(getExternalImages(value))
    const [removedExternalImages, setRemovedExternalImages] = useState<string[]>([])

    const [preferredImageName, setPreferredImageName] = useState(value?.preferred)
    const [dragActive, setDragActive] = useState(false)
    const [carouselOpen, setCarouselOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isLimitReached = (images.length + externalImages.length) >= maxFiles
    const isSingleImage = Boolean((images.length + externalImages.length) && maxFiles === 1)

    const handleFiles = useCallback(
        (files: FileList) => {
            if (isLimitReached) return

            const validFiles = Array.from(files).filter((file) =>
                isValidFileType(file) && file.size <= maxFileSize
            )

            const newImages = validFiles.map((file) => {
                const imageFile = new File([file], file.name, { type: file.type })
                return Object.assign(imageFile, {
                    preview: URL.createObjectURL(file),
                })
            })

            setImages((prevImages) => {
                const updatedImages = [
                    ...prevImages.filter(prevImage =>
                        !newImages.some(newImage => newImage.name === prevImage.name)
                    ),
                    ...newImages
                ].slice(0, maxFiles)
                return updatedImages
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            if (!preferredImageName && newImages.length > 0) {
                setPreferredImageName(newImages[0].name)
            }
        },
        [isLimitReached, maxFileSize, maxFiles, preferredImageName],
    )

    const removeExternalImage = useCallback((name: string) => {
        if (readOnly) return
        setExternalImages(prev => prev.filter(img => img.name !== name))
        setRemovedExternalImages(prev => [...prev, name])
        if (preferredImageName === name) {
            setPreferredImageName(undefined)
        }
    }, [readOnly, preferredImageName])

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
        removeImage: useCallback((name: string, external?: boolean) => {
            if (readOnly) return

            if (preferredImageName === name) {
                setPreferredImageName(undefined)
            }

            if (external) {
                removeExternalImage(name)
                return
            }

            setImages((prevImages) =>
                prevImages.filter((image) => image.name !== name)
            )

        }, [readOnly, removeExternalImage, preferredImageName]),
        setPreferred: useCallback((name: string) => {
            setPreferredImageName(name)
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
        removedExternalImages,
        preferredImageName,
        dragActive,
        carouselOpen,
        isLimitReached,
        isSingleImage,
        readOnly,
        fileInputRef,
        handlers
    }
}