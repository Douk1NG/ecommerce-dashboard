import type { ImageFile } from "@/types/components/image-uploader"

interface HiddenInputsProps {
    images: ImageFile[]
    name: string
    preferred: {
        enabled: boolean
        id: string | null
    }
}

export const HiddenInputs = ({ images, name, preferred }: HiddenInputsProps) => {
    return (
        <>
            {images.map((file) => (
                <input
                    key={file.id}
                    type="file"
                    name={`${name}[]`}
                    className="hidden"
                    ref={(element) => {
                        if (element) {
                            const dataTransfer = new DataTransfer()
                            dataTransfer.items.add(file)
                            element.files = dataTransfer.files
                        }
                    }}
                />
            ))}
            {preferred.enabled && preferred.id && (
                <input
                    type="hidden"
                    name={`${name}_preferred`}
                    value={preferred.id}
                />
            )}
        </>
    )
}