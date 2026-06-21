"use server"

import { db } from '@/src/lib/db'
import type { Inflow } from '@/src/shared/types/inflow'
import { getProductsSelectable } from '@/src/features/products/productServices'

type MovementLineInput = {
  combination_id?: number
  quantity: number
  unit_price: number
  total_price: number
}

async function applyStockChanges(
  lines: MovementLineInput[],
  direction: 'INFLOW' | 'OUTFLOW'
) {
  for (const line of lines) {
    if (!line.combination_id) {
      continue
    }

    const delta = direction === 'INFLOW' ? line.quantity : -line.quantity

    await db.combinationStock.upsert({
      where: { combinationId: line.combination_id },
      update: {
        quantity: {
          increment: delta,
        },
      },
      create: {
        combinationId: line.combination_id,
        quantity: Math.max(delta, 0),
      },
    })
  }
}

async function resolveProductId(data: Inflow, productId?: number) {
  if (productId) {
    return productId
  }

  const firstCombinationId = data.combinations[0]?.combination_id

  if (!firstCombinationId) {
    return null
  }

  const combination = await db.productCombination.findUnique({
    where: { id: firstCombinationId },
    select: { productId: true },
  })

  return combination?.productId ?? null
}

import type { InflowTableRow } from '@/src/shared/types/inflow'

export const getInflows = async (): Promise<InflowTableRow[]> => {
  try {
    const movements = await db.stockMovement.findMany({
      where: { type: 'INFLOW' },
      include: { product: true },
      orderBy: { date: 'desc' },
    })

    return movements.map((movement) => ({
      id: movement.id,
      product: movement.product.name,
      quantity: movement.quantity,
      date: movement.date.toISOString().slice(0, 10),
    }))
  } catch {
    return []
  }
}

export const getInflow = async (id: string) => {
  try {
    const movement = await db.stockMovement.findUnique({
      where: { id: Number(id) },
      include: {
        product: true,
        lines: true,
      },
    })

    if (!movement) {
      return null
    }

    const products = await getProductsSelectable()
    const product = products.find((entry) => entry.value === movement.productId)

    return {
      id: movement.id,
      product: product ?? {
        value: movement.productId,
        label: movement.product.name,
        unit_price: movement.unitPrice,
        combinations: [],
      },
      quantity: movement.quantity,
      unit_price: movement.unitPrice,
      total_price: movement.totalPrice,
      reason: movement.reason,
      date: movement.date.toISOString().slice(0, 10),
      combinations: movement.lines.map((line) => ({
        combination_id: line.combinationId,
        quantity: line.quantity,
        unit_price: line.unitPrice,
        total_price: line.totalPrice,
      })),
    }
  } catch {
    return null
  }
}

export const save = async (data: Inflow, productId?: number) => {
  try {
    const resolvedProductId = await resolveProductId(data, productId)

    if (!resolvedProductId) {
      return {
        success: false,
        message: 'Product is required for stock entries',
      }
    }

    if (data.id) {
      const existing = await db.stockMovement.findUnique({
        where: { id: data.id },
        include: { lines: true },
      })

      if (existing) {
        await applyStockChanges(
          existing.lines.map((line) => ({
            combination_id: line.combinationId,
            quantity: line.quantity,
            unit_price: line.unitPrice,
            total_price: line.totalPrice,
          })),
          'OUTFLOW'
        )
      }

      await db.stockMovementLine.deleteMany({ where: { movementId: data.id } })

      await db.stockMovement.update({
        where: { id: data.id },
        data: {
          productId: resolvedProductId,
          quantity: data.quantity,
          unitPrice: data.unit_price,
          totalPrice: data.total_price,
          reason: data.reason,
          date: new Date(data.date),
          lines: {
            create: data.combinations.map((line) => ({
              combinationId: line.combination_id!,
              quantity: line.quantity,
              unitPrice: line.unit_price,
              totalPrice: line.total_price,
            })),
          },
        },
      })

      await applyStockChanges(data.combinations, 'INFLOW')

      return {
        id: data.id,
        success: true,
        message: 'Inflow updated successfully',
      }
    }

    const created = await db.stockMovement.create({
      data: {
        type: 'INFLOW',
        productId: resolvedProductId,
        quantity: data.quantity,
        unitPrice: data.unit_price,
        totalPrice: data.total_price,
        reason: data.reason,
        date: new Date(data.date),
        lines: {
          create: data.combinations.map((line) => ({
            combinationId: line.combination_id!,
            quantity: line.quantity,
            unitPrice: line.unit_price,
            totalPrice: line.total_price,
          })),
        },
      },
    })

    await applyStockChanges(data.combinations, 'INFLOW')

    return {
      id: created.id,
      success: true,
      message: 'Inflow created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export const deleteInflow = async (id: string) => {
  try {
    const movement = await db.stockMovement.findUnique({
      where: { id: Number(id) },
      include: { lines: true },
    })

    if (movement) {
      await applyStockChanges(
        movement.lines.map((line) => ({
          combination_id: line.combinationId,
          quantity: line.quantity,
          unit_price: line.unitPrice,
          total_price: line.totalPrice,
        })),
        'OUTFLOW'
      )
    }

    await db.stockMovement.delete({ where: { id: Number(id) } })

    return {
      success: true,
      message: 'Inflow deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete inflow',
    }
  }
}
