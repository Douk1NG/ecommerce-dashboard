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
            const { body } = await request.json()
            return body
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
        const { body } = await request.json()
        return body
    } catch (error) {
        return null
    }
}

export const getSelectableFilters = async () => {
    try {
        const request = await fetch(`${path}?selectable=true`, {
            headers: {
                'Authorization': `Bearer ${token}`
        }
    })
        const { body } = await request.json()

        const temp = body.map((filter: Filter) => ({
            value: filter.id,
            label: filter.name
        }))

        return temp
    } catch (error) {
        return []
    }
}

export const save = async (data: Filter) => {
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
    `${path}/${data.id}`, {
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
