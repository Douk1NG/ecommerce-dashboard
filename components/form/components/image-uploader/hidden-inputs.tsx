import type { HiddenInputsProps } from "@/types/image-uploader"

export const HiddenInputs = ({
    images,
    externalImages,
    name,
    preferred,
    maxFiles
}: HiddenInputsProps) => {
    const inputName = maxFiles > 1 ? `${name}[]` : name
    const externalInputName = maxFiles > 1 ? `${name}_external[]` : `${name}_external`

    return (
        <>
            {externalImages.map((file) => (
                <input
                    key={file.id}
                    type="hidden"
                    name={externalInputName}
                    value={file.id}
                />
            ))}
            {images.map((file) => (
                <input
                    key={file.id}
                    type="file"
                    name={inputName}
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