'use server'
import { revalidatePath } from 'next/cache'
import categorySchema from '@/modules/schemas/categories'

import {
    getPropertyOfArray,
    safeParseBoolean,
    safeParseJSON
} from '@/lib/utils'

import {
    deleteCategory,
    save as saveService
} from '@/modules/services/categories'

import type { ActionResponse } from '@/types/form'

import type {
    CategoryFormData
} from '@/modules/types/categories'

export default async function SaveCategory(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    const rawData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name'),
        description: formData.get('description'),
        parent_id: formData.get('parent_id'),
        filters: getPropertyOfArray(safeParseJSON(formData.get('filters')), 'value'),
        image: formData.get('image'),
        featured_category: safeParseBoolean(formData.get('featured_category'))
    } as CategoryFormData

    const validatedData = categorySchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData
        }
    }

    formData.set('filters', JSON.stringify(rawData.filters))
    if (id) {
        formData.set('id', id)
        formData.set('_method', 'PUT')
    }

    console.log('post', { formData, rawData })
    return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: {},
        data: rawData
    }
    const {
        success,
        message,
        id: idResponse
    } = await saveService(formData)
    if (success) {
        revalidatePath(`/[locale]/categories`, 'page')

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