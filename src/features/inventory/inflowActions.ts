'use server'

import inflowSchema from '@/src/features/inventory/inflowSchemas'
import { deleteInflow, save as saveService } from '@/src/features/inventory/inflowServices'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/src/shared/types/form'

export default async function SaveInflow(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    const rawData = {
        id: id ? Number(id) : undefined,

    }

    const validatedData = inflowSchema.safeParse(rawData)

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
        revalidatePath(`/[locale]/inflow`, 'page')

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

export async function DeleteInflow(
    id: string
) {
    const request = await deleteInflow(id)

    const response = await request.json()

    if (request.ok) {
        revalidatePath(`/[locale]/inflow`, 'page')

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