'use server'

import productSchema from '@/modules/schemas/products'

import type {
    ActionResponse
} from '@/modules/types/products'

export async function save(
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    return {
        success: true,
        message: 'Product saved successfully!',
    }
}