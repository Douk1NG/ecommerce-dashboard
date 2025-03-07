'use server'

import productSchema from '@/modules/schemas/products'
import { deleteProduct, save as saveService } from '@/modules/services/products'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/types/form'

import type {
    FilterCombination,
    ProductFormData
} from '@/modules/types/products'

import {
    getPropertyOfArray,
    safeParseBoolean,
    safeParseJSON,
    safeParseNumber
} from '@/lib/utils'

export default async function SaveProduct(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    console.log(formData, 'formData')
    const rawData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name'),
        description: formData.get('description'),
        categories: formData.getAll('categories'),
        price: safeParseNumber(formData.get('price')),
        featured_product: safeParseBoolean(formData.get('featured_product')),
        filter_combinations: safeParseJSON(formData.get('filter_combinations')).map((it: FilterCombination) => {
            return {
                price: safeParseNumber(it.price) as number,
                filters: getPropertyOfArray(it.filters, 'value') as number[]
            }
        }),
        images: formData.getAll('images[]'),
        images_preferred: formData.get('images_preferred'),
        images_removed: formData.getAll('images_removed[]'),
        active: safeParseBoolean(formData.get('active')),

    } as ProductFormData

    rawData.main_image = rawData.images?.find((image: File) => image.name === rawData.images_preferred)
    rawData.related_images = rawData.images?.filter((image: File) => image.name !== rawData.images_preferred)

    const validatedData = productSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Please fix the errors in the form',
            errors: validatedData.error.flatten().fieldErrors,
            data: rawData
        }
    }

    formData.set('categories', JSON.stringify(rawData.categories.map((it: string) => Number(it))))
    formData.set('filter_combinations', JSON.stringify(rawData.filter_combinations))
    formData.set('price', rawData.price.toString())
    formData.set('main_image', rawData.main_image as File)
    formData.set('active', rawData.active ? '1' : '0')
    formData.set('featured_product', rawData.featured_product ? '1' : '0')

    rawData.related_images?.forEach((image: File) => {
        formData.set('related_images[]', image)
    })

    formData.delete('images[]')
    formData.delete('images_preferred')
    formData.delete('images_external[]')

    if (id) {
        formData.set('id', id)
        formData.set('_method', 'PUT')
        formData.set('delete_images', formData.get('images_removed[]') as string)
    }

    console.log(formData)

    const {
        success,
        message,
        id: response_id
    } = await saveService(formData)
    if (success) {
        revalidatePath(`/[locale]/products`, 'page')

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