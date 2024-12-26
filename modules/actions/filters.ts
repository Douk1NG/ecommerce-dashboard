'use server'

import filterSchema from '@/modules/schemas/filters'

import type {
    ActionResponse,
    FilterFormData
} from '@/modules/types/filters'

export async function save(
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
        const rawData: FilterFormData = {
            id: Number(formData.get('id')),
            name: formData.get('name') as string,
            filters: formData.get('filters') as string
        }

        console.log(rawData)

        const parsedFilters = JSON.parse(rawData.filters)
        // Validate the form data
        const validatedData = filterSchema.safeParse(rawData)

        if (!validatedData.success) {
            return {
                success: false,
                message: 'Please fix the errors in the form',
                errors: validatedData.error.flatten().fieldErrors,
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

