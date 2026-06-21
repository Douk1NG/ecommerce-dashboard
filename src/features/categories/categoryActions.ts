'use server'
import { revalidatePath } from 'next/cache'
import categorySchema from '@/src/features/categories/categorySchemas'

import {
    safeParseBoolean
} from '@/src/shared/utils/safeParse'

import {
    deleteCategory,
    save as saveService
} from '@/src/features/categories/categoryServices'

import type { ActionResponse } from '@/src/shared/types/form'

import type {
    CategoryFormData
} from '@/src/shared/types/categories'

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
        filters: formData.getAll('filters'),
        image: formData.get('image'),
        featured_category: safeParseBoolean(formData.get('featured_category')),
        external_images: formData.get('external_images')
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

    formData.set('filters', JSON.stringify(rawData.filters?.map(filter => Number(filter))))
    if (id) {
        formData.set('id', id)
        formData.set('_method', 'PUT')

        if (rawData.external_images) {
            formData.set('image', rawData.external_images)
        }
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
    const response = await deleteCategory(id)

    if (response.success) {
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