"use server"

import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { db } from '@/src/lib/db'
import type { Option } from '@/src/shared/types/select'

type ProductWithRelations = NonNullable<Awaited<ReturnType<typeof fetchProductById>>>

type ProductTableRow = {
  id: number
  name: string
  price: number
  active: boolean
}

type FilterCombinationInput = {
  price: number
  filters: number[]
}

const productInclude = {
  images: {
    orderBy: { id: 'asc' as const },
  },
  categories: {
    include: {
      category: {
        include: {
          categoryFilters: true,
        },
      },
    },
  },
  combinations: {
    include: {
      options: {
        include: {
          filterOption: true,
        },
      },
    },
    orderBy: { id: 'asc' as const },
  },
}

async function fetchProducts() {
  return db.product.findMany({
    orderBy: { id: 'asc' },
  })
}

async function fetchProductById(id: number) {
  return db.product.findUnique({
    where: { id },
    include: productInclude,
  })
}

function parseJsonArray<T>(value: FormDataEntryValue | null): T[] {
  if (typeof value !== 'string' || value.length === 0) {
    return []
  }

  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? parsed as T[] : []
  } catch {
    return []
  }
}

async function getCategoryFiltersWithOptions(categoryId: number) {
  const category = await db.category.findUnique({
    where: { id: categoryId },
    include: {
      categoryFilters: true,
    },
  })

  if (!category) {
    return []
  }

  const filterIds = category.categoryFilters.map((entry) => entry.filterId)

  const filters = await db.filter.findMany({
    where: { id: { in: filterIds } },
    include: {
      options: {
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  })

  return filters.map((filter) => ({
    value: filter.id,
    label: filter.name,
    isFixed: true,
    options: filter.options.map((option) => ({
      value: option.id,
      label: option.label,
    })),
  }))
}

async function mapProductDetail(product: ProductWithRelations) {
  const imageUrls = product.images.map((image) => image.url)
  const preferred = product.mainImage ?? imageUrls[0] ?? null

  const categories = await Promise.all(
    product.categories.map(async (entry) => ({
      value: entry.categoryId,
      label: entry.category.name,
      filters: await getCategoryFiltersWithOptions(entry.categoryId),
    }))
  )

  const filterCombinations = product.combinations.map((combination) => ({
    id: combination.id,
    price: String(combination.price),
    filters: combination.options.map((entry) => ({
      value: entry.filterOptionId,
      label: entry.filterOption.label,
    })),
  }))

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: String(product.price),
    featured_product: product.featuredProduct,
    active: product.active,
    categories,
    filter_combinations: filterCombinations,
    images: {
      values: imageUrls,
      preferred,
    },
    images_preferred: preferred,
  }
}

async function saveProductImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')

  await mkdir(uploadsDir, { recursive: true })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filename = `${Date.now()}-${safeName}`

  await writeFile(path.join(uploadsDir, filename), buffer)

  return `/uploads/products/${filename}`
}

async function syncProductCategories(productId: number, categoryIds: number[]) {
  await db.productCategory.deleteMany({ where: { productId } })

  if (categoryIds.length === 0) {
    return
  }

  await db.productCategory.createMany({
    data: categoryIds.map((categoryId) => ({ productId, categoryId })),
  })
}

async function syncProductCombinations(
  productId: number,
  combinations: FilterCombinationInput[]
) {
  await db.productCombination.deleteMany({ where: { productId } })

  for (const combination of combinations) {
    const created = await db.productCombination.create({
      data: {
        productId,
        price: combination.price,
        options: {
          create: combination.filters.map((filterOptionId) => ({ filterOptionId })),
        },
      },
    })

    void created
  }
}

async function syncProductImages(
  productId: number,
  relatedImages: File[],
  mainImage: string | null,
  removedImages: string[]
) {
  if (removedImages.length > 0) {
    await db.productImage.deleteMany({
      where: {
        productId,
        url: { in: removedImages },
      },
    })
  }

  for (const file of relatedImages) {
    if (file.size > 0) {
      const url = await saveProductImage(file)
      await db.productImage.create({
        data: { productId, url },
      })
    }
  }

  if (mainImage) {
    const existing = await db.productImage.findFirst({
      where: { productId, url: mainImage },
    })

    if (!existing) {
      await db.productImage.create({
        data: { productId, url: mainImage },
      })
    }

    await db.product.update({
      where: { id: productId },
      data: { mainImage },
    })
  }
}

export const getProducts = async (): Promise<ProductTableRow[]> => {
  try {
    const products = await fetchProducts()

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      active: product.active,
    }))
  } catch {
    return []
  }
}

export const getProductsSelectable = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        combinations: {
          include: {
            options: {
              include: {
                filterOption: true,
              },
            },
            stock: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    })

    return products.map((product) => ({
      value: product.id,
      label: product.name,
      unit_price: product.price,
      combinations: product.combinations.map((combination) => ({
        combination_id: combination.id,
        quantity: combination.stock?.quantity ?? 0,
        filters: combination.options.map((entry) => entry.filterOption.label),
      })),
    }))
  } catch {
    return []
  }
}

export const getProduct = async (id: string) => {
  try {
    const product = await fetchProductById(Number(id))

    if (!product) {
      return null
    }

    return mapProductDetail(product)
  } catch {
    return null
  }
}

export const save = async (data: FormData) => {
  try {
    const id = data.get('id')
    const name = data.get('name') as string
    const description = (data.get('description') as string) ?? ''
    const price = Number(data.get('price'))
    const featuredProduct =
      data.get('featured_product') === '1' || data.get('featured_product') === 'on'
    const active = data.get('active') === '1' || data.get('active') === 'on'
    const categoryIds = parseJsonArray<number>(data.get('categories'))
    const filterCombinations = parseJsonArray<FilterCombinationInput>(
      data.get('filter_combinations')
    )
    const removedImages = parseJsonArray<string>(data.get('delete_images'))
    const mainImageField = data.get('main_image')
    const relatedImages = data
      .getAll('related_images[]')
      .filter((entry): entry is File => entry instanceof File)

    let mainImage: string | null = null

    if (mainImageField instanceof File && mainImageField.size > 0) {
      mainImage = await saveProductImage(mainImageField)
    } else if (typeof mainImageField === 'string' && mainImageField.length > 0) {
      mainImage = mainImageField
    }

    if (id) {
      const productId = Number(id)

      await db.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          price,
          featuredProduct,
          active,
          ...(mainImage ? { mainImage } : {}),
        },
      })

      await syncProductCategories(productId, categoryIds)
      await syncProductCombinations(productId, filterCombinations)
      await syncProductImages(productId, relatedImages, mainImage, removedImages)

      return {
        id: productId,
        success: true,
        message: 'Product updated successfully',
      }
    }

    const created = await db.product.create({
      data: {
        name,
        description,
        price,
        featuredProduct,
        active,
        mainImage,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
        combinations: {
          create: filterCombinations.map((combination) => ({
            price: combination.price,
            options: {
              create: combination.filters.map((filterOptionId) => ({ filterOptionId })),
            },
          })),
        },
        images: {
          create: [
            ...(mainImage ? [{ url: mainImage }] : []),
            ...(await Promise.all(
              relatedImages
                .filter((file) => file.size > 0)
                .map(async (file) => ({ url: await saveProductImage(file) }))
            )),
          ],
        },
      },
    })

    return {
      id: created.id,
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export const deleteProduct = async (id: string) => {
  try {
    await db.product.delete({ where: { id: Number(id) } })

    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete product',
    }
  }
}
