import { formatFileSize } from "@/lib/file"
import { Button } from "@/components/ui/button"
import Icon from "@/components/icon"
import Image from "next/image"
import type { ImageListProps } from "@/types/image-uploader"

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
                <div key={file.id} className="relative h-48 w-full ">
                    <Image
                        src={file.url}
                        alt="External image"
                        className="object-cover rounded-md cursor-pointer"
                        onClick={handlers.openCarousel}
                        title="View image"
                        loading="lazy"
                        fill
                    />
                    {!readOnly && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlers.removeImage(file.id, true)}
                            title="Remove image"
                            className="absolute top-0 right-0 rounded-full"
                            type="button"
                        >
                            <Icon name="close" />
                        </Button>
                    )}
                    {preferred.enabled && !readOnly && (
                        <button
                            type="button"
                            onClick={() => handlers.setPreferred(file.id)}
                            className={`absolute bottom-0 right-0 mb-1 mr-1 rounded-full p-1
                                ${preferredImageId === file.id ? "bg-yellow-500" : "bg-gray-200"}`
                            }
                        >
                            <Icon
                                name="star"
                                className={preferredImageId === file.id ? "text-white" : "text-gray-600"}
                            />
                        </button>
                    )}
                </div>
            ))}
            {images.map((file) => (
                <div key={file.id} className="relative h-48 w-full">
                    <Image
                        src={file.preview}
                        alt={file.name}
                        className="object-cover rounded-md cursor-pointer"
                        onClick={handlers.openCarousel}
                        title="View image"
                        loading="lazy"
                        fill
                    />
                    {!readOnly && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlers.removeImage(file.id)}
                            title="Remove image"
                            className="absolute top-0 right-0 rounded-full"
                            type="button"
                        >
                            <Icon name="close" />
                        </Button>
                    )}
                    {preferred.enabled && !readOnly && (
                        <button
                            type="button"
                            onClick={() => handlers.setPreferred(file.id)}
                            className={`absolute bottom-0 right-0 mb-1 mr-1 rounded-full p-1
                                ${preferredImageId === file.id ? "bg-yellow-500" : "bg-gray-200"}`
                            }
                        >
                            <Icon
                                name="star"
                                className={preferredImageId === file.id ? "text-white" : "text-gray-600"}
                            />
                        </button>
                    )}
                    <p className="mt-1 text-xs text-gray-500 truncate">
                        {`${formatFileSize(file.size)} - ${file.name}`}
                    </p>
                </div>
            ))}
        </div>
    )
}