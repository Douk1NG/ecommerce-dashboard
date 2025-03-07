export type ImageFile = File & {
    preview: string
}

export type ExternalImage = {
    url: string
    name: string
}

export type ImageUploaderHandlers = {
    files: (files: FileList) => void
    drag: (e: React.DragEvent<HTMLDivElement>) => void
    drop: (e: React.DragEvent<HTMLDivElement>) => void
    change: (e: React.ChangeEvent<HTMLInputElement>) => void
    removeImage: (name: string, external?: boolean) => void
    setPreferred: (name: string) => void
    openCarousel: () => void
    closeCarousel: () => void
}

export type ImageCardProps = {
    image: ImageFile | ExternalImage;
    isExternal: boolean;
    preferred: {
        enabled: boolean;
    };
    preferredImageName?: string;
    readOnly?: boolean;
    handlers: {
        openCarousel: () => void;
        removeImage: (name: string, isExternal?: boolean) => void;
        setPreferred: (name: string) => void;
    };
}

export type UseImageUploaderProps = {
    maxFiles: number
    maxFileSize: number
    value?: {
        values: string[] | string
        preferred: string
    }
    readOnly?: boolean
}

export type ImageUploaderProps = {
    options?: {
        maxFiles?: number
        maxFileSize?: number
        preferred?: {
            enabled: boolean
        }
    }
}

export type ImageListProps = {
    images: ImageFile[]
    externalImages: ExternalImage[]
    preferred: {
        enabled: boolean
    }
    preferredImageName?: string
    readOnly?: boolean
    handlers: {
        removeImage: (name: string, external?: boolean) => void
        setPreferred: (name: string) => void
        openCarousel: () => void
    }
}

export type HiddenInputsProps = {
    images: ImageFile[]
    externalImages: ExternalImage[]
    removedExternalImages: string[]
    name?: string
    preferred: {
        enabled: boolean
        name?: string
    }
    maxFiles: number
}

export type DropZoneProps = {
    isLimitReached: boolean
    isSingleImage: boolean
    dragActive: boolean
    maxFileSize: number
    handlers: {
        drag: (e: React.DragEvent<HTMLDivElement>) => void
        drop: (e: React.DragEvent<HTMLDivElement>) => void
        change: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
    fileInputRef: React.RefObject<HTMLInputElement>
    children?: React.ReactNode
}

export type CarouselImage = ImageFile | ExternalImage

export type CarouselProps = {
    images: CarouselImage[]
    onClose: () => void
}