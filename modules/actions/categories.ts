'use server'

import categorySchema from '@/modules/schemas/categories'
import { deleteCategory, save as saveService } from '@/modules/services/categories'
import { revalidatePath } from 'next/cache'

import type {
    ActionResponse,
    CategoryFormData
} from '@/modules/types/categories'

export default async function SaveCategory(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    const rawData: CategoryFormData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name') as string,
        subcategories: formData.get('subcategories') as string,
        filters: formData.get('filters') as string
    }

    const parsedFilters = JSON.parse(rawData.filters)
    const filters = parsedFilters.map((filter: Record<string, unknown>) => filter.value)

    rawData.filters = filters
    const validatedData = categorySchema.safeParse(rawData)

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

export async function DeleteCategory(
    id: string
) {
    const request = await deleteCategory(id)
    const response = await request.json()

    if (request.ok) {
        revalidatePath(`/[locale]/categories`, 'page')

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