export type ImageFile = File & {
    preview: string
    id: string
}

export type ExternalImage = {
    url: string
    id: string
}

export type ImageUploaderHandlers = {
    files: (files: FileList) => void
    drag: (e: React.DragEvent<HTMLDivElement>) => void
    drop: (e: React.DragEvent<HTMLDivElement>) => void
    change: (e: React.ChangeEvent<HTMLInputElement>) => void
    removeImage: (id: string) => void
    setPreferred: (id: string) => void
    openCarousel: () => void
    closeCarousel: () => void
}

export type ImageCardProps = {
    image: ImageFile | ExternalImage;
    isExternal: boolean;
    preferred: {
        enabled: boolean;
    };
    preferredImageId?: string;
    readOnly?: boolean;
    handlers: {
        openCarousel: () => void;
        removeImage: (id: string, isExternal?: boolean) => void;
        setPreferred: (id: string) => void;
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
    externalImages: Array<{ url: string, id: string }>
    preferred: {
        enabled: boolean
    }
    preferredImageId?: string
    readOnly?: boolean
    handlers: {
        removeImage: (id: string, external?: boolean) => void
        setPreferred: (id: string) => void
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
        id?: string
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

export type CarouselImage = {
    id: string
    preview: string
    name?: string
    url?: string
}

export type CarouselProps = {
    images: CarouselImage[]
    onClose: () => void
}