'use server'

import filterSchema from '@/modules/schemas/filters'

import type {
    ActionResponse,
    FilterFormData
} from '@/modules/types/filters'

import { revalidatePath } from 'next/cache'

export async function save(
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {

        const rawData: FilterFormData = {
            id: formData.get('id') ? Number(formData.get('id')) : undefined,
            name: formData.get('name') as string,
            filters: formData.get('filters') as string
        }

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

        // Here you would typically save the address to your database
        console.log('Address submitted:', validatedData.data)

        return {
            success: true,
            message: 'Address saved successfully!',
        }
    } catch (error) {
        return {
            success: false,
            message: 'An unexpected error occurred',
        }
    }
}

