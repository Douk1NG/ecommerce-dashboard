"use server"
import { Filter } from "@/modules/types/filters"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/filters`

export const getFilters = async () => {
    try {
        const request = await fetch(
            path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (request.ok) {
            return await request.json()
        }

        return []

    } catch (error) {
        return []
    }
}

export const getFilter = async (id: string) => {
    try {
        const request = await fetch(
            `${path}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const response = await request.json()

        return response
    } catch (error) {
        return null
    }
}

export const save = async (data: Filter) => {
    try {
        const response = data.id ? await update(data) : await create(data)
        const { message, id } = await response.json()

        return {
            id: id,
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

export const create = async (data: Filter) => await fetch(
    path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const update = async (data: Filter) => await fetch(
    path, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const deleteFilter = async (id: string) => await fetch(
    `${path}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
