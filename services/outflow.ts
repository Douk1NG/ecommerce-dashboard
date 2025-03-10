"use server"
import type { Outflow } from "@/types/outflow"
import type { Query } from "@/types/services"

import { buildGetQuery } from "@/lib/utils"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/filters`

export const getOutflows = async (query?: Query) => {
    try {
        const queryString = buildGetQuery(query)
        const request = await fetch(
            path + queryString, {
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

export const getOutflow = async (id: string) => {
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

export const save = async (data: Outflow) => {
    try {
        const response = data.id ? await update(data) : await create(data)
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

export const create = async (data: Outflow) => await fetch(
    path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const update = async (data: Outflow) => await fetch(
    `${path}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const deleteOutflow = async (id: string) => await fetch(
    `${path}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
