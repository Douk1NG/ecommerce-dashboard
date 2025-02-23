import { formatFileSize } from "@/lib/file"
import { Button } from "@/components/ui/button"
import Icon from "@/components/icon"
import Image from "next/image"
import type { ImageCardProps, ImageListProps, ImageFile, ExternalImage } from "@/types/image-uploader"

const ImageCard = ({
    image,
    isExternal,
    preferred,
    preferredImageId,
    readOnly,
    handlers
}: ImageCardProps) => {
    const { url, preview, name, size } = image as ImageFile & ExternalImage
    return (
        <div key={image.id} className="relative h-48 w-full">
            <Image
                src={isExternal ? url : preview }
                alt={isExternal ? url : name}
                className="object-cover rounded-md cursor-pointer"
                onClick={handlers.openCarousel}
                title="View image"
                loading="lazy"
                priority={false}
                fill
            />
            {!readOnly && (
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlers.removeImage(image.id, isExternal)}
                    title="Remove image"
                    className="cursor-pointer absolute top-0 right-0 rounded-full"
                    type="button"
                >
                    <Icon name="close" />
                </Button>
            )}
            {preferred.enabled && !readOnly && (
                <button
                    type="button"
                    onClick={() => handlers.setPreferred(image.id)}
                    className={`cursor-pointer absolute bottom-0 right-0 mb-1 mr-1 rounded-full p-1
                        ${preferredImageId === image.id ? "bg-yellow-500" : "bg-gray-200"}`
                    }
                >
                    <Icon
                        name="star"
                        className={preferredImageId === image.id ? "text-white" : "text-gray-600"}
                    />
                </button>
            )}
            {!isExternal && (
                <p className="mt-1 text-xs text-gray-500 truncate">
                    {`${formatFileSize(size)} - ${name}`}
                </p>
            )}
        </div>
    )
}

export const ImageList = ({
    images,
    externalImages,
    preferred,
    preferredImageId,
    readOnly,
    handlers
}: ImageListProps) => {
    if (images.length === 0 && externalImages.length === 0) return null

    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            {externalImages.map((file) => (
                <ImageCard
                    key={file.id}
                    image={file}
                    isExternal={true}
                    preferred={preferred}
                    preferredImageId={preferredImageId}
                    readOnly={readOnly}
                    handlers={handlers}
                />
            ))}
            {images.map((file) => (
                <ImageCard
                    key={file.id}
                    image={file}
                    isExternal={false}
                    preferred={preferred}
                    preferredImageId={preferredImageId}
                    readOnly={readOnly}
                    handlers={handlers}
                />
            ))}
        </div>
    )
}