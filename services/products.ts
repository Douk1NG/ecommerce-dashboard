"use server"

import type { Query } from "@/types/services"
import { buildGetQuery } from "@/lib/utils"
import { randomInt } from "crypto"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/products`

export const getProducts = async (query?: Query) => {
    try {
        const queryString = buildGetQuery(query)
        const request = await fetch(
            path + queryString, {

            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'force-cache'
        })

        if (request.ok) {
            const { body } = await request.json()
            return body
        }

        return [{
            id: 1,
            value: 1,
            label: 'Product 1',
            unit_price: randomInt(100, 1000),
            combinations: [{
                combination_id: 1,
                quantity: randomInt(10, 100),
                filters: ['Filter 1', 'Filter 2']
            }, {
                combination_id: 2,
                quantity: randomInt(10, 100),
                filters: ['Filter 3', 'Filter 4']
            }]
        }, {
            id: 2,
            value: 2,
            label: 'Product 2',
            unit_price: randomInt(100, 1000),
            combinations: [{
                combination_id: 1,
                quantity: randomInt(10, 100),
                filters: ['Filter 5', 'Filter 6']
            }, {
                combination_id: 2,
                quantity: randomInt(10, 100),
                filters: ['Filter 7', 'Filter 8']
            }]
        }, {
            id: 3,
            value: 3,
            label: 'Product 3',
            unit_price: randomInt(100, 1000),
            combinations: [{
                combination_id: 3,
                quantity: randomInt(10, 100),
                filters: ['Filter 9', 'Filter 10']
            }]
        }]

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
            },
        })

        if (request.ok) {
            const { body } = await request.json()
            return body
        }

        return null
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

