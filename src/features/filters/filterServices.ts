"use server"

import { db } from '@/src/lib/db'
import type { Filter } from '@/src/shared/types/filters'
import type { Option } from '@/src/shared/types/select'
import type { Query } from '@/src/shared/types/services'

type FilterWithOptions = Awaited<ReturnType<typeof fetchFilters>>[number]

type FilterTableRow = {
  id: number
  name: string
  filters: string[]
}

async function fetchFilters() {
  return db.filter.findMany({
    include: {
      options: {
        orderBy: { id: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  })
}

function mapToTableRow(filter: FilterWithOptions): FilterTableRow {
  return {
    id: filter.id,
    name: filter.name,
    filters: filter.options.map((option) => option.label),
  }
}

function mapToSelectable(filter: FilterWithOptions): Option {
  return {
    value: filter.id,
    label: filter.name,
  }
}

function mapToDetail(filter: FilterWithOptions) {
  return {
    id: filter.id,
    name: filter.name,
    filters: filter.options.map((option) => ({
      value: option.id,
      label: option.label,
    })),
  }
}

async function syncFilterOptions(filterId: number, labels: string[]) {
  await db.filterOption.deleteMany({ where: { filterId } })

  if (labels.length === 0) {
    return
  }

  await db.filterOption.createMany({
    data: labels.map((label) => ({ filterId, label })),
  })
}

export const getFilters = async (): Promise<FilterTableRow[]> => {
  try {
    const filters = await fetchFilters()
    return filters.map(mapToTableRow)
  } catch {
    return []
  }
}

export const getFiltersSelectable = async (_query?: Query): Promise<Option[]> => {
  try {
    const filters = await fetchFilters()
    return filters.map(mapToSelectable)
  } catch {
    return []
  }
}

export const getFilter = async (id: string) => {
  try {
    const filter = await db.filter.findUnique({
      where: { id: Number(id) },
      include: {
        options: {
          orderBy: { id: 'asc' },
        },
      },
    })

    if (!filter) {
      return null
    }

    return mapToDetail(filter)
  } catch {
    return null
  }
}

export const save = async (data: Filter) => {
  try {
    const labels = data.filters

    if (data.id) {
      await db.filter.update({
        where: { id: data.id },
        data: { name: data.name },
      })

      await syncFilterOptions(data.id, labels)

      return {
        id: data.id,
        success: true,
        message: 'Filter updated successfully',
      }
    }

    const created = await db.filter.create({
      data: {
        name: data.name,
        options: {
          create: labels.map((label) => ({ label })),
        },
      },
    })

    return {
      id: created.id,
      success: true,
      message: 'Filter created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export const deleteFilter = async (id: string) => {
  try {
    await db.filter.delete({ where: { id: Number(id) } })

    return {
      success: true,
      message: 'Filter deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete filter',
    }
  }
}
