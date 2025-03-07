import type { HiddenInputsProps, ImageFile } from "@/types/image-uploader"

export const HiddenInputs = ({
    images,
    removedExternalImages,
    name,
    preferred,
    maxFiles
}: HiddenInputsProps) => {
    const inputName = maxFiles > 1 ? `${name}[]` : name
    const externalInputName = maxFiles > 1 ? `${name}_external[]` : `${name}_external`
    const externalImages = images.filter((image) => 'url' in image)
    const uploadedImages = images.filter((image) => image instanceof File)

    return (
        <>
            {externalImages.map((file) => (
                <input
                    key={file.name}
                    type="hidden"
                    name={externalInputName}
                    value={file.name}
                />
            ))}
            {uploadedImages.map((file) => (
                <input
                    key={file.name}
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
            {preferred.enabled && preferred.name && (
                <input
                    type="hidden"
                    name={`${name}_preferred`}
                    value={preferred.name}
                />
            )}
            {removedExternalImages.map((name) => (
                <input
                    key={`removed-${name}`}
                    type="hidden"
                    name={`${name}_removed[]`}
                    value={name}
                />
            ))}
        </>
    )
}