"use server"
import type { Inflow } from "@/types/inflow"
import type { Query } from "@/types/services"

import { buildGetQuery } from "@/lib/utils"
import { randomInt } from "crypto"

// temp
const token = process.env.NEXT_PUBLIC_API_TOKEN
const path = `${process.env.NEXT_PUBLIC_API_URL}/entries`

export const getInflows = async (query?: Query) => {
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

        return [{
            id: 1,
            product: 'Product 1',
            quantity: 10,
            date: '2021-01-01'
        }, {
            id: 2,
            product: 'Product 2',
            quantity: 20,
            date: '2021-01-02'
        }, {
            id: 3,
            product: 'Product 3',
            quantity: 30,
            date: '2021-01-03'
        }]

    } catch (error) {
        return []
    }
}

export const getInflow = async (id: string) => {
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
        return {
            id: 1,
            product: {
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
            },
            quantity: randomInt(10, 100),
            date: '2021-01-01'
        }
    }
}

export const save = async (data: Inflow) => {
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

export const create = async (data: Inflow) => await fetch(
    path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const update = async (data: Inflow) => await fetch(
    `${path}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const deleteInflow = async (id: string) => await fetch(
    `${path}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
