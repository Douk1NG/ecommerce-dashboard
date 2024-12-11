'use client'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useEffect, useRef, useState } from 'react'

export default function ImageUploader(props: Record<string, any>) {
    const t = useTranslations()
    const [images, setImages] = useState<{
        file: File;
        preview: string;
        isFavorite: boolean
    }[]>([])

    const [favoriteIndex, setFavoriteIndex] = useState<number | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const maxFiles = 20;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if(props.onChange) {
            props.onChange(event)
        }

        if (files) {
            const newImages = Array.from(files).slice(0, maxFiles - images.length).map(file => ({
                file,
                preview: URL.createObjectURL(file),
                isFavorite: false
            }))
            setImages(prevImages => [...prevImages, ...newImages])
        }
    }

    const handleRemove = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
        if (favoriteIndex === index) {
            setFavoriteIndex(null)
        } else if (favoriteIndex !== null && favoriteIndex > index) {
            setFavoriteIndex(favoriteIndex - 1)
        }
    }

    const handleSetFavorite = (index: number) => {
        setFavoriteIndex(index)
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const onClickImage = (url: string) => {
        window.open(url, '_blank')
    }

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview))
        }
    }, [images])

    return (
        <div className="space-y-4">
            <div className="flex w-full">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={images.length >= maxFiles}
                    title='images'
                    placeholder='images'
                    size={5}
                    id={props.id}
                    onBlur={props.onBlur}
                />
                <Button
                    onClick={handleUploadClick}
                    disabled={images.length >= maxFiles}
                    className="bg-secondary accent-foreground"
                    type='button'
                >
                    <Icon name="upload" /> Upload
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <Card key={image.preview} className="relative overflow-hidden">
                        <CardContent className="p-2">
                            <Image
                                src={image.preview}
                                alt={`Uploaded image ${index + 1}`}
                                className="w-full h-40 object-cover rounded cursor-pointer"
                                onClick={() => onClickImage(image.preview)}
                            />
                            <div className="absolute top-2 right-2 space-x-1">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => handleSetFavorite(index)}
                                    className={favoriteIndex === index ? 'bg-yellow-400 hover:bg-yellow-500' : ''}
                                    type='button'
                                >
                                    <Icon name='star' className={favoriteIndex === index ? 'fill-current' : ''} />
                                    <span className="sr-only">
                                        {favoriteIndex === index ? 'Remove as favorite' : 'Set as favorite'}
                                    </span>
                                </Button>
                                <Button size="icon" variant="destructive" onClick={() => handleRemove(index)}
                                    type='button'>
                                    <Icon name='close' />
                                    <span className="sr-only">Remove image</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

