import React, { useState } from "react"
import Icon from "@/components/icon"

interface CarouselProps {
    images: { id: string; preview: string; name: string }[]
    onClose: () => void
}

export default function Carousel({ images, onClose }: CarouselProps) {
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

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl flex justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    type="button"
                >
                    <Icon name="close" />
                </button>
                <div className="relative max-h-[80vh] max-w-[80vw] overflow-auto">
                    <img
                        src={images[currentIndex].preview}
                        alt={images[currentIndex].name}
                        className="object-cover"
                        title={images[currentIndex].name}
                    />
                </div>
                {!isSingleImage && <>
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <Icon
                                name="chevron-left"
                                className="h-6 w-6 text-black"
                            />
                        </button>
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <button
                            type="button"
                            onClick={goToNext}
                            className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <Icon
                                name="chevron-right"
                                className="h-6 w-6 text-black"
                            />
                        </button>
                    </div>
                </>}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                    <p className="text-white text-sm select-none">
                        {currentIndex + 1} / {images.length}
                    </p>
                </div>
            </div>
        </div>
    )
}

