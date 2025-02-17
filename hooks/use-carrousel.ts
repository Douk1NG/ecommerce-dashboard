import { useState } from "react"
import type { CarouselImage } from "@/types/image-uploader"

export function useCarousel(images: CarouselImage[]) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const isSingleImage = images.length === 1

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const currentImage = images[currentIndex]
    const imageUrl = currentImage.preview || currentImage.url
    const imageName = currentImage.name || 'Image'

    return {
        currentIndex,
        isSingleImage,
        goToPrevious,
        goToNext,
        currentImage,
        imageUrl,
        imageName
    }
}