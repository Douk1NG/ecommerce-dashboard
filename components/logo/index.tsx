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
            height={500}
            width={140}
        />
    )
}

export default Logo