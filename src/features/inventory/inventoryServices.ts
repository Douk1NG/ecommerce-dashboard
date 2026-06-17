"use server"

const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/inventory`

export const getInventory = async () => {
    try {
        const request = await fetch(
            path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { body } = await request.json()
        return body
    } catch (error) {
        return [{
            id: 1,
            product: 'Product 1',
            quantity: 10,
            price: 100
        }, {
            id: 2,
            product: 'Product 2',
            quantity: 20,
            price: 200
        }, {
            id: 3,
            product: 'Product 3',
            quantity: 30,
            price: 300
        }]
    }
}