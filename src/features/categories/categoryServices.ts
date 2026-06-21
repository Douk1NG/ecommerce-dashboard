"use server"

import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { db } from '@/src/lib/db'
import type { Option } from '@/src/shared/types/select'
import type { Query } from '@/src/shared/types/services'

type CategoryWithRelations = Awaited<ReturnType<typeof fetchCategories>>[number]

async function fetchCategories() {
  return db.category.findMany({
    include: {
      categoryFilters: true,
      parent: true,
    },
    orderBy: { id: 'asc' },
  })
}

function parseFilterIds(filtersJson: string | null): number[] {
  if (!filtersJson) {
    return []
  }

  try {
    const parsed = JSON.parse(filtersJson) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map((id) => Number(id)).filter((id) => !Number.isNaN(id))
  } catch {
    return []
  }
}

async function getFilterOptions(filterIds: number[]): Promise<Option[]> {
  if (filterIds.length === 0) {
    return []
  }

  const filters = await db.filter.findMany({
    where: { id: { in: filterIds } },
    orderBy: { id: 'asc' },
  })

  return filters.map((filter) => ({
    value: filter.id,
    label: filter.name,
  }))
}

async function mapToTableRow(category: CategoryWithRelations) {
  const children = await db.category.findMany({
    where: { parentId: category.id },
    select: { name: true },
    orderBy: { name: 'asc' },
  })

  const filterIds = category.categoryFilters.map((entry) => entry.filterId)
  const filterOptions = await getFilterOptions(filterIds)

  return {
    id: category.id,
    name: category.name,
    subcategories: children.map((child) => child.name),
    filters: filterOptions.map((filter) => filter.label),
    featured_category: category.featuredCategory,
  }
}

async function mapToSelectable(category: CategoryWithRelations, full = false) {
  const filterIds = category.categoryFilters.map((entry) => entry.filterId)

  if (!full) {
    const filters = await getFilterOptions(filterIds)

    return {
      value: category.id,
      label: category.name,
      filters,
    }
  }

  const filters = await db.filter.findMany({
    where: { id: { in: filterIds } },
    include: {
      options: {
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  })

  return {
    value: category.id,
    label: category.name,
    filters: filters.map((filter) => ({
      value: filter.id,
      label: filter.name,
      isFixed: true,
      options: filter.options.map((option) => ({
        value: option.id,
        label: option.label,
      })),
    })),
  }
}

async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'categories')

  await mkdir(uploadsDir, { recursive: true })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filename = `${Date.now()}-${safeName}`

  await writeFile(path.join(uploadsDir, filename), buffer)

  return `/uploads/categories/${filename}`
}

async function syncCategoryFilters(categoryId: number, filterIds: number[]) {
  await db.categoryFilter.deleteMany({ where: { categoryId } })

  if (filterIds.length === 0) {
    return
  }

  await db.categoryFilter.createMany({
    data: filterIds.map((filterId) => ({ categoryId, filterId })),
  })
}

type CategoryTableRow = {
  id: number
  name: string
  subcategories: string[]
  filters: string[]
  featured_category: boolean
}

type CategorySelectable = Option & {
  filters: Array<Option & { isFixed?: boolean; options?: Option[] }>
}

export const getCategories = async (): Promise<CategoryTableRow[]> => {
  try {
    const categories = await fetchCategories()
    return Promise.all(categories.map(mapToTableRow))
  } catch {
    return []
  }
}

export const getCategoriesSelectable = async (query?: Query): Promise<CategorySelectable[]> => {
  try {
    const full = Boolean(query?.selectable?.full)
    const categories = await fetchCategories()
    return Promise.all(categories.map((category) => mapToSelectable(category, full)))
  } catch {
    return []
  }
}

export const getCategory = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: { id: Number(id) },
      include: {
        categoryFilters: true,
        parent: true,
      },
    })

    if (!category) {
      return null
    }

    const filterIds = category.categoryFilters.map((entry) => entry.filterId)
    const filters = await getFilterOptions(filterIds)

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      featured_category: category.featuredCategory,
      parent_id: category.parent
        ? { value: category.parent.id, label: category.parent.name }
        : undefined,
      filters,
      image: category.image ?? undefined,
    }
  } catch {
    return null
  }
}

export const save = async (data: FormData) => {
  try {
    const id = data.get('id')
    const name = data.get('name') as string
    const description = (data.get('description') as string) ?? ''
    const featuredCategory =
      data.get('featured_category') === '1' || data.get('featured_category') === 'on'
    const parentIdValue = data.get('parent_id')
    const filterIds = parseFilterIds(data.get('filters') as string | null)
    const imageField = data.get('image')

    let imagePath: string | undefined

    if (imageField instanceof File && imageField.size > 0) {
      imagePath = await saveImage(imageField)
    } else if (typeof imageField === 'string' && imageField.length > 0) {
      imagePath = imageField
    }

    if (id) {
      const categoryId = Number(id)

      await db.category.update({
        where: { id: categoryId },
        data: {
          name,
          description,
          featuredCategory,
          parentId: parentIdValue ? Number(parentIdValue) : null,
          ...(imagePath !== undefined ? { image: imagePath } : {}),
        },
      })

      await syncCategoryFilters(categoryId, filterIds)

      return {
        id: categoryId,
        success: true,
        message: 'Category updated successfully',
      }
    }

    const created = await db.category.create({
      data: {
        name,
        description,
        featuredCategory,
        parentId: parentIdValue ? Number(parentIdValue) : null,
        image: imagePath ?? null,
        categoryFilters: {
          create: filterIds.map((filterId) => ({ filterId })),
        },
      },
    })

    return {
      id: created.id,
      success: true,
      message: 'Category created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}


export const deleteCategory = async (id: string) => {
  try {
    await db.category.delete({ where: { id: Number(id) } })

    return {
      success: true,
      message: 'Category deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete category',
    }
  }
}
