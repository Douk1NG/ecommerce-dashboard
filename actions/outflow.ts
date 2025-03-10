'use server'

import outflowSchema from '@/schemas/outflow'
import { deleteOutflow, save as saveService } from '@/services/outflow'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/types/form'

export default async function SaveOutflow(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    const rawData = {
        id: id ? Number(id) : undefined,

    }

    const validatedData = outflowSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData
        }
    }

    const {
        success,
        message,
        id: response_id
    } = await saveService(rawData)
    if (success) {
        revalidatePath(`/[locale]/outflow`, 'page')

        return {
            success,
            message,
            data: {
                ...rawData,
                id: response_id
            }
        }
    }

    return {
        success: false,
        message,
        data: rawData
    }
}

export async function DeleteOutflow(
    id: string
) {
    const request = await deleteOutflow(id)

    const response = await request.json()

    if (request.ok) {
        revalidatePath(`/[locale]/outflow`, 'page')

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