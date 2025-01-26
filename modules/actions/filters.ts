'use server'

import filterSchema from '@/modules/schemas/filters'
import { deleteFilter, save as saveService } from '../services/filters'
import { revalidatePath } from 'next/cache'

import type { FilterFormData } from '@/modules/types/filters'
import type { ActionResponse } from '@/types/form'

export default async function SaveFilter(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    const rawData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name'),
        filters: formData.get('filters')
    } as FilterFormData

    const parsedFilters = JSON.parse(rawData.filters)
    const filters = parsedFilters.map((filter: Record<string, unknown>) => filter.value)

    rawData.filters = filters
    const validatedData = filterSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData
        }
    }

    const { success, message, id: idResponse } = await saveService(validatedData.data)
    if (success) {
        revalidatePath(`/[locale]/filters`, 'page')

        return {
            success,
            message,
            data: {
                ...rawData,
                id: idResponse || rawData.id
            }
        }
    }

    return {
        success: false,
        message,
        data: rawData
    }
}

export async function DeleteFilter(
    id: string
) {
    const request = await deleteFilter(id)
    const response = await request.json()

    if (request.ok) {
        revalidatePath(`/[locale]/filters`, 'page')

        return {
            success: true,
            message: response.message
        }
    }

    return {
        success: false,
        message: response.message
    }
}