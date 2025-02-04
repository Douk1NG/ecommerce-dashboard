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
    preferredImageId: string | null
    readOnly?: boolean
    handlers: {
        removeImage: (id: string) => void
        setPreferred: (id: string) => void
        openCarousel: () => void
    }
}

export type HiddenInputsProps = {
    images: ImageFile[]
    name: string
    preferred: {

        enabled: boolean
        id: string | null
    },
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