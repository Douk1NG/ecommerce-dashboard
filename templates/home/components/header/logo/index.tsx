import Image from "next/image"

const Logo = () => {
    return (
        <div className="flex mr-auto relative w-[120px] md:w-[150px] h-full">
            <Image
                fill
                title="Logo"
                src="/images/logo.png"
                alt="Logo"
                priority={true}
                style={{
                    filter: "invert(1)",
                    objectFit: "cover"
                }}
                sizes="100%"
            />
        </div>
    )
}

export default Logo