"use server"

export const getProducts = async () => {
    const request = await fetch(
        'http://localhost:3000/es/api/product', {
            cache: 'force-cache'
        }
    )

    try {
        const response = await request.json()
        return response.body
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getProduct = async (id: string) => {
    const request = await fetch(
        `http://localhost:3000/es/api/product/${id}`, {
        cache: 'force-cache'
    })

    try {
        const response = await request.json()
        return response.body
    } catch (error) {
        console.error(error)
        return null
    }
}