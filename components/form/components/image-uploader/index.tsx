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
    }
}: ImageField) {
    const {
        images,
        preferredImageId,
        dragActive,
        carouselOpen,
        isLimitReached,
        isSingleImage,
        handlers,
        fileInputRef
    } = useImageUploader({ maxFiles, maxFileSize })

    return (
        <div className="w-full">
            <HiddenInputs
                images={images}
                name={name}
                preferred={{
                    enabled: preferred.enabled,
                    id: preferredImageId
                }}
            />
            <DropZone
                fileInputRef={fileInputRef}
                isLimitReached={isLimitReached}
                isSingleImage={isSingleImage}
                dragActive={dragActive}
                maxFileSize={maxFileSize}
                handlers={handlers}
            />
            <ImageList
                images={images}
                preferred={preferred}
                preferredImageId={preferredImageId}
                handlers={handlers}
            />
            {carouselOpen && (
                <Carousel
                    images={images}
                    onClose={handlers.closeCarousel}
                />
            )}
        </div>
    )
}