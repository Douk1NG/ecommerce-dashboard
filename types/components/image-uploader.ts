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