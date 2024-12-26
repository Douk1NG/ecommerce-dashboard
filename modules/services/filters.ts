"use server"
import { revalidatePath } from "next/cache"
import { Filter } from "@/modules/types/filters"

export const getFilters = async () => {
    const request = await fetch(
        'http://localhost:3000/es/api/filter', {
            cache: 'force-cache'
        }
    )
    if (request.ok) {
        const response = await request.json()
        const parsed = response.body.map((item: Record<string, unknown>) => {
            item.filters = (item.filters as Record<string, unknown>[])
            .map((filter: Record<string, unknown>) => filter.value).join(', ')
            return item
        })
        return parsed
    }
    return []
}

export const getFiltersMultiselect = async () => {
    const request = await fetch(
        'http://localhost:3000/es/api/filter', {
        cache: 'force-cache'
    })
    
    if (request.ok) {
        const response = await request.json()
        const parsed = response.body.map((item: Record<string, unknown>) => {
            return (item.filters as Record<string, unknown>[])
            .map((filter: Record<string, unknown>) => {
                return {
                    label: filter.value,
                    value: filter.id
                }
            })
        }).flat()

        return parsed
    }
    return []
}

export const getFilter = async (id: string) => {
    const request = await fetch(
        `http://localhost:3000/es/api/filter/${id}`, {
        cache: 'force-cache'
    })
    const response = await request.json()
    return response.body
}

export const create = async (data: Filter) => {
    const request = await fetch(
        'http://localhost:3000/es/api/filter', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const response = await request.json()
    revalidatePath('/filters')
    return response.body
}

export const update = async (data: Filter) => {
    const request = await fetch(
        `http://localhost:3000/es/api/filter/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    const response = await request.json()
    revalidatePath('/filters')
    return response.body
}
