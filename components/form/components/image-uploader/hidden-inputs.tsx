import type { HiddenInputsProps } from "@/types/components/image-uploader"

export const HiddenInputs = ({ images, name, preferred, maxFiles }: HiddenInputsProps) => {
    const inputName = maxFiles > 1 ? `${name}[]` : name
    return (

        <>
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