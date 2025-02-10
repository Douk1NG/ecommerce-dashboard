import Icon from "@/components/icon"
import { useCarousel } from "@/hooks/use-carrousel"
import type { CarouselProps } from "@/types/components/image-uploader"

export default function Carousel({ images, onClose }: CarouselProps) {
    const {
        currentIndex,
        isSingleImage,
        goToPrevious,
        goToNext,
        imageUrl,
        imageName
    } = useCarousel(images)

    return (
        <div
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative max-w-7xl w-[90vw] mx-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-2 top-4 bg-white/50 hover:bg-white/75 rounded-full p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 z-10"
                    type="button"
                    aria-label="Close gallery"
                >
                    <Icon name="close" className="h-6 w-6 text-black" />
                </button>

                <div className="relative h-[80vh] flex items-center justify-center rounded-lg bg-black/20">
                    <img
                        src={imageUrl}
                        alt={imageName}
                        className="max-h-full max-w-full object-contain rounded-sm"
                        title={imageName}
                        loading="eager"
                    />
                </div>

                {!isSingleImage && (
                    <>
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                            aria-label="Previous image"
                        >
                            <Icon name="chevron-left" className="h-6 w-6 text-black" />
                        </button>
                        <button
                            type="button"
                            onClick={goToNext}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                            aria-label="Next image"
                        >
                            <Icon name="chevron-right" className="h-6 w-6 text-black" />
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                    <p className="text-white text-sm select-none" role="status">
                        {currentIndex + 1} / {images.length}
                    </p>
                </div>
            </div>
        </div>
    )
}

