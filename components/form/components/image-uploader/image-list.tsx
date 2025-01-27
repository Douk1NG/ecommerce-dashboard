import { formatFileSize } from "@/lib/file"
import { Button } from "@/components/ui/button"
import Icon from "@/components/icon"
import type { ImageFile } from "@/types/components/image-uploader"

interface ImageListProps {
    images: ImageFile[]
    preferred: {
        enabled: boolean
    }
    preferredImageId: string | null
    handlers: {
        removeImage: (id: string) => void
        setPreferred: (id: string) => void
        openCarousel: () => void
    }
}

export const ImageList = ({
    images,
    preferred,
    preferredImageId,
    handlers
}: ImageListProps) => {
    if (images.length === 0) return null

    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            {images.map((file) => (
                <div key={file.id} className="relative">
                    <img
                        src={file.preview}
                        alt={file.name}
                        className="h-48 w-full object-cover rounded-md cursor-pointer"
                        onClick={handlers.openCarousel}
                        title="View image"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlers.removeImage(file.id)}
                        title="Remove image"
                        className="absolute top-0 right-0 rounded-full"
                    >
                        <Icon name="close" />
                    </Button>
                    {preferred.enabled && (
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