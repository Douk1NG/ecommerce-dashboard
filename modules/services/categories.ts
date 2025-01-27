"use server"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/categories`

export const getCategories = async () => {
    try {
        const request = await fetch(
            path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (request.ok) {
            const { body } = await request.json()
            console.log(body, 'getAll')
            return body
        }

        return []

    } catch (error) {
        return []
    }
}

export const getCategory = async (id: string) => {
    try {
        const request = await fetch(
            `${path}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { body } = await request.json()
        console.log(body, 'getCategory')
        return body
    } catch (error) {
        return null
    }
}

export const getSelectableCategories = async () => {
    try {
        const request = await fetch(`${path}?selectable=true`, {
            headers: {
                'Authorization': `Bearer ${token}`
        }
    })
        const { body } = await request.json()
        console.log(body, 'getSelectableCategories')
        return body
    } catch (error) {
        return []
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

export const deleteCategory = async (id: string) => await fetch(
    `${path}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
