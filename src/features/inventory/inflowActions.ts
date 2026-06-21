'use server'

import inflowSchema from '@/src/features/inventory/inflowSchemas'
import { deleteInflow, save as saveService } from '@/src/features/inventory/inflowServices'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/src/shared/types/form'

function parseProductId(value: FormDataEntryValue | null) {
    const productId = Number(value)

    return Number.isNaN(productId) ? undefined : productId
}

export default async function SaveInflow(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    const rawData = {
        id: id ? Number(id) : undefined,
        quantity: Number(formData.get('quantity')),
        unit_price: Number(formData.get('unit_price')),
        total_price: Number(formData.get('total_price')),
        reason: String(formData.get('reason') || ''),
        date: String(formData.get('date') || ''),
        combinations: JSON.parse(String(formData.get('combinations') || '[]')),
    }

    const validatedData = inflowSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData,
        }
    }

    const {
        success,
        message,
        id: response_id,
    } = await saveService(validatedData.data, parseProductId(formData.get('product')))

    if (success) {
        revalidatePath('/[locale]/inflow', 'page')
        revalidatePath('/[locale]/inventory', 'page')

        return {
            success,
            message,
            data: {
                ...rawData,
                id: response_id,
            },
        }
    }

    return {
        success: false,
        message,
        data: rawData,
    }
}

export async function DeleteInflow(id: string) {
    const response = await deleteInflow(id)

    if (response.success) {
        revalidatePath('/[locale]/inflow', 'page')
        revalidatePath('/[locale]/inventory', 'page')

        return {
            success: true,
            message: response.message,
        }
    }

    return {
        success: false,
        message: response.message,
    }
}
