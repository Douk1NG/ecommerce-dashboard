"use server"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/products`

export const getProducts = async () => {
    try {
        const request = await fetch(
            path, {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (request.ok) {
            const { body } = await request.json()
            return body.products
        }

        return []

    } catch (error) {
        return []
    }
}

export const getProduct = async (id: string) => {
    try {
        const request = await fetch(

            `${path}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { body } = await request.json()

        return {
            "id": 16,
            "name": "Camisa POLO",
            "description": "description",
            "price": "5000.00",
            "featured_product": false,
            "active": true,
            "categories": [
                {
                    "value": 1,
                    "label": "Ropa",
                    "filters": [
                        {
                            "value": 3,
                            "label": "Tallas de ropa",
                            "isFixed": true,
                            "options": [
                                {
                                    "value": 331,
                                    "label": "S"
                                },
                                {
                                    "value": 332,
                                    "label": "M"
                                },
                                {
                                    "value": 333,
                                    "label": "L"
                                }
                            ]
                        },
                        {
                            "value": 2,
                            "label": "Colores",
                            "isFixed": true,
                            "options": [
                                {
                                    "value": 666,
                                    "label": "Rojo"
                                },
                                {
                                    "value": 667,
                                    "label": "Azul"
                                }
                            ]
                        },
                        {
                            "value": 1,
                            "label": "Marca",
                            "isFixed": true,
                            "options": [
                                {
                                    "value": 111,
                                    "label": "Adidas"
                                },
                                {
                                    "value": 112,
                                    "label": "Nike"
                                }
                            ]
                        }
                    ]
                }
            ],
            "filter_combinations": [
                {
                    "id": 6,
                    "filters": [{
                        "value": 666,
                        "label": "Rojo"
                    }],
                    "price": "10000"
                },
                {
                    "id": 11,
                    "filters": [{
                        "value": 111,
                        "label": "Nike"
                    }],
                    "price": "10000"
                }
            ],
            "images": {
                "values": ["http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe7201551e_1739581216.jpeg", "http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe720986c0_1739581216.jpeg"],
                "preferred": "http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe720986c0_1739581216.jpeg",
            }
        }
    } catch (error) {
        return null
    }
}

export const save = async (data: FormData) => {
    try {
        const id = data.get('id')
        const response = id ? await update(data, id as string) : await create(data)
        const { message, body } = await response.json()

        return {
            id: body?.id,
            success: response.ok,
            message
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unexpected error occurred'
        }
    }
}

export const create = async (data: FormData) => await fetch(
    path, {
    method: 'POST',
    body: data,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})

export const update = async (data: FormData, id: string) => await fetch(
    `${path}/${id}`, {
    method: 'POST',
    body: data,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})

export const deleteProduct = async (id: string) => await fetch(
    `${path}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

