'use server'

import productSchema from '@/modules/schemas/products'
import { deleteProduct, save as saveService } from '@/modules/services/products'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/types/form'

import type {
    ProductFormData
} from '@/modules/types/products'

export default async function SaveProduct(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    const rawData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name'),
        description: formData.get('description')
    } as ProductFormData

    console.log(formData, rawData)
    const validatedData = productSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData
        }
    }

    if (id) {
        formData.set('id', id)
        formData.set('_method', 'PUT')
    }

    const {
        success,
        message,
        id: idResponse
    } = await saveService(formData)
    if (success) {
        revalidatePath(`/[locale]/products`, 'page')


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

export async function DeleteProduct(
    id: string
) {
    const request = await deleteProduct(id)

    const response = await request.json()

    if (request.ok) {
        revalidatePath(`/[locale]/products`, 'page')

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