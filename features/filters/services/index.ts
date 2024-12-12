import { Filter } from "../types"

export const getFilters = async () => {
    const request = await fetch('http://localhost:3000/es/api/filter')
    const response = await request.json()
    return response.body
}

export const getFilter = async (id: string) => {
    const request = await fetch(`http://localhost:3000/es/api/filter/${id}`)
    const response = await request.json()
    return response.body
}

export const createFilter = async (data: Filter) => {
    const request = await fetch('http://localhost:3000/es/api/filter', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const response = await request.json()
    return response.body
}

export const updateFilter = async (data: Filter) => {
    console.log(data)
    const request = await fetch(`http://localhost:3000/es/api/filter/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    const response = await request.json()
    return response.body
}
