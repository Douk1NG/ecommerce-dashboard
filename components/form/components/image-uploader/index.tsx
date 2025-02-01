import { DropZone } from './drop-zone'
import { ImageList } from './image-list'
import { HiddenInputs } from './hidden-inputs'
import { useImageUploader } from '@/hooks/use-image-uploader'
import Carousel from './carrousel'
import type { ImageField } from "@/types/form"

export default function ImageUploader({
    name,
    options: {
        maxFiles = 5,
        maxFileSize = 5 * 1024 * 1024,
        preferred = {
            enabled: false
        }
    },
    value,
    readOnly
}: ImageField) {
    const {
        images,
        externalImages,
        preferredImageId,
        dragActive,
        carouselOpen,
        isLimitReached,
        isSingleImage,
        handlers,
        fileInputRef
    } = useImageUploader({
        maxFiles,
        maxFileSize,
        value: value as string[],
        readOnly
    })

    const allImages = [
        ...externalImages.map(img => ({
            ...img,
            preview: img.url
        })),
        ...images
    ]

    return (
        <div className="w-full">
            <HiddenInputs
                images={images}
                name={name}
                preferred={{
                    enabled: preferred.enabled,
                    id: preferredImageId
                }}
                maxFiles={maxFiles}
            />
            {!readOnly && (
                <DropZone
                    fileInputRef={fileInputRef}
                    isLimitReached={isLimitReached}
                    isSingleImage={isSingleImage}
                    dragActive={dragActive}
                    maxFileSize={maxFileSize}
                    handlers={handlers}
                >
                    {<p className="mt-2 text-sm text-gray-600">
                        {images.length} / {maxFiles} images uploaded
                    </p>}
                </DropZone>
            )}
            <ImageList
                images={images}
                externalImages={externalImages}
                preferred={preferred}
                preferredImageId={preferredImageId}
                readOnly={readOnly}
                handlers={handlers}
            />
            {carouselOpen && (
                <Carousel
                    images={allImages}
                    onClose={handlers.closeCarousel}
                />
            )}
        </div>
    )
}