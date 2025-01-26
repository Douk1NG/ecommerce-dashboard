"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { formatFileSize, isValidFileType } from "@/lib/file"
import Carousel from "./carrousel"
import Icon from "@/components/icon"

import type { ImageField } from "@/types/form"
import { Button } from "@/components/ui/button"

type ImageFile = File & {
    preview: string
    id: string
}

type Options = {
    maxFiles?: number
    maxFileSize?: number
    preferred?: {
        enabled?: boolean
        id?: string
    }
}

export type ImageUploaderProps = {
    options: Options
}

export default function ImageUploader({
    name,
    options: {
        maxFiles = 5,
        maxFileSize = 5 * 1024 * 1024,
        preferred = {
            enabled: false
        }
    }
}: ImageField) {
    const [images, setImages] = useState<ImageFile[]>([])
    const [preferredImageId, setPreferredImageId] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [carouselOpen, setCarouselOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const isLimitReached = images.length >= maxFiles
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isSingleImage = images.length && maxFiles === 1

    const generateUniqueId = (file: File) => {
        return `${file.name}-${file.lastModified}`
    }

    const handleFiles = useCallback(
        (files: FileList) => {
            if (isLimitReached) return

            const validFiles = Array.from(files).filter((file) => isValidFileType(file) && file.size <= maxFileSize)

            const newImages = validFiles.map((file) => {
                const id = generateUniqueId(file)
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    id: id,
                })
            })

            setImages((prevImages) => {
                const updatedImages = [
                    ...prevImages.filter(prevImage => !newImages.some(newImage => newImage.id === prevImage.id)),
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

    const handleDrag = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (isLimitReached) return
            if (e.type === "dragenter" || e.type === "dragover") {
                setDragActive(true)
            } else if (e.type === "dragleave") {
                setDragActive(false)
            }
        },
        [isLimitReached],
    )

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)
            if (isLimitReached) return
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFiles(e.dataTransfer.files)
            }
        },
        [handleFiles, isLimitReached],
    )

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if (e.target.files && e.target.files[0]) {
                handleFiles(e.target.files)
            }
        },
        [handleFiles],
    )

    const removeImage = useCallback(
        (id: string) => {
            setImages((prevImages) => {
                const updatedImages = prevImages.filter((image) => image.id !== id)
                return updatedImages
            })
            if (preferredImageId === id) {
                setPreferredImageId(images.length > 1 ? images[0].id : null)
            }
        },
        [images, preferredImageId],
    )

    const setPreferred = useCallback((id: string) => {
        setPreferredImageId(id)
    }, [])

    const openCarousel = useCallback((index: number) => {
        setSelectedImageIndex(index)
        setCarouselOpen(true)
    }, [])

    return (
        <div className="w-full">
            <div
                className={`${isSingleImage ? "hidden" : ""} p-4 border-2 border-dashed rounded-lg ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                    } ${isLimitReached ? "opacity-50 cursor-not-allowed" : ""}`}
                onDragEnter={isLimitReached ? undefined : handleDrag}
                onDragLeave={isLimitReached ? undefined : handleDrag}
                onDragOver={isLimitReached ? undefined : handleDrag}
                onDrop={isLimitReached ? undefined : handleDrop}
            >
                <input ref={fileInputRef} type="file" multiple onChange={handleChange} accept="image/*" className="hidden" />
                <div className="text-center">
                    <Icon
                        name="upload"
                        className="mx-auto text-gray-400"
                    />
                    <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to select files</p>
                    <p className="mt-1 text-xs text-gray-500">{`PNG, JPG, GIF up to ${formatFileSize(maxFileSize)}`}</p>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isLimitReached
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            }`}
                        disabled={isLimitReached}
                    >
                        Select files
                    </button>
                    {isLimitReached && <p className="mt-2 text-sm text-red-500">Maximum number of files reached</p>}
                </div>
            </div>
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {images.map((file, index) => (
                        <div key={file.id} className="relative">
                            <img
                                src={file.preview}
                                alt={file.name}
                                className="h-48 w-full object-cover rounded-md cursor-pointer"
                                onClick={() => openCarousel(index)}
                                title="View image"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeImage(file.id)}
                                title="Remove image"
                                className="absolute top-0 right-0 rounded-full"
                            >
                                <Icon name="close" />
                            </Button>
                            {preferred.enabled && (
                                <button
                                    type="button"
                                    onClick={() => setPreferred(file.id)}
                                    className={`absolute bottom-0 right-0 mb-1 mr-1 rounded-full p-1 ${preferredImageId === file.id ? "bg-yellow-500" : "bg-gray-200"
                                        }`}
                                >
                                    <Icon name="star" className={`${preferredImageId === file.id ? "text-white" : "text-gray-600"}`} />
                                </button>
                            )}
                            <p className="mt-1 text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                    ))}
                </div>
            )}
            <p className="mt-2 text-sm text-gray-600">
                {images.length} / {maxFiles} images uploaded
            </p>
            {carouselOpen && <Carousel images={images} onClose={() => setCarouselOpen(false)} />}
        </div>
    )
}

