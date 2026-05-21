'use server'

import productSchema from '@/schemas/products'
import { deleteProduct, save as saveService, getProduct } from '@/services/products'
import { revalidatePath } from 'next/cache'

import type { ActionResponse } from '@/types/form'

import type {
    FilterCombination,
    ProductFormData
} from '@/types/products'

import {
    getPropertyOfArray
} from '@/lib/utils'

import {
    safeParseBoolean,
    safeParseJSON,
    safeParseNumber
} from '@/utils/safeParse'

export default async function SaveProduct(
    id: string | undefined,
    prevState: ActionResponse | null,
    formData: FormData
): Promise<ActionResponse> {
    // Retrieve existing product data when editing to preserve main image
    const existingProduct = id ? await getProduct(id) : null

    const rawData = {
        id: id ? Number(id) : undefined,
        name: formData.get('name'),
        description: formData.get('description'),
        categories: formData.getAll('categories'),
        price: safeParseNumber(formData.get('price')),
        featured_product: safeParseBoolean(formData.get('featured_product')),
        // @ts-ignore
        filter_combinations: safeParseJSON(formData.get('filter_combinations')).map((it: FilterCombination) => {
            return {
                price: safeParseNumber(it.price) as number,
                filters: getPropertyOfArray(it.filters, 'value') as number[]
            }
        }).filter((it: FilterCombination) => it.price !== undefined),
        images: formData.getAll('images'),
        images_preferred: formData.get('images_preferred') ?? (existingProduct?.images_preferred || null),
        images_removed: formData.getAll('images_removed'),
        active: safeParseBoolean(formData.get('active')),

    } as ProductFormData

    rawData.main_image = rawData.images_preferred
    rawData.related_images = rawData.images

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
    
    // Only set main_image if images_preferred has a value
    if (rawData.images_preferred) {
        formData.set('main_image', rawData.images_preferred)
    }
    
    formData.set('active', rawData.active ? '1' : '0')
    formData.set('featured_product', rawData.featured_product ? '1' : '0')

    rawData.related_images?.forEach((image: File) => {
        formData.append('related_images[]', image)
    })

    formData.delete('images')
    formData.delete('images_preferred')
    formData.delete('images_removed')

    if (id) {
        formData.set('id', id)
        formData.set('_method', 'PUT')
        formData.set('delete_images', JSON.stringify(rawData.images_removed))
    }

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