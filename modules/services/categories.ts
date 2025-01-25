"use server"
import { Category } from "@/modules/types/categories"

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
            return body.at(0)
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
        console.log(path, id)
        const { body, message } = await request.json()
        console.log(message)
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
        return body.at(0)
    } catch (error) {
        return []
    }
}

export const save = async (data: Category) => {
    try {
        const response = data.id ? await update(data) : await create(data)
        const { message, body } = await response.json()

        return {
            id: body.id,
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

export const create = async (data: Category) => await fetch(
    path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const update = async (data: Category) => await fetch(
    `${path}/${data.id}`, {
    method: 'POST',
    body: JSON.stringify({
        ...data,
        method: 'PUT'
    }),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
