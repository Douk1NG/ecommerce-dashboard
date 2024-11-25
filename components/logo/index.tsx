import Image from "next/image"

const Logo = () => {
    return (
        <Image
            title="Logo"
            src="/images/logo.png"
            alt="Logo"
            priority={true}
            style={{
                objectFit: "cover",
                aspectRatio: 2
            }}
            height={120}
            width={500}
        />
    )
}

export default Logo