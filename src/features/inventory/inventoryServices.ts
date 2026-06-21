"use server"

import { db } from '@/src/lib/db'

type InventoryRow = {
  id: number
  product: string
  quantity: number
  price: number
}

export const getInventory = async (): Promise<InventoryRow[]> => {
  try {
    const products = await db.product.findMany({
      include: {
        combinations: {
          include: {
            stock: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    })

    return products.map((product) => ({
      id: product.id,
      product: product.name,
      quantity: product.combinations.reduce(
        (total, combination) => total + (combination.stock?.quantity ?? 0),
        0
      ),
      price: product.price,
    }))
  } catch {
    return []
  }
}
