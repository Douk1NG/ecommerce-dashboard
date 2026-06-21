import type { Option } from '@/src/shared/types/select'
import { z } from 'zod'
import outflowSchema from '@/src/features/inventory/outflowSchemas'

export type Outflow = z.infer<typeof outflowSchema>

export type OutflowTableRow = {
    id: number
    product: string
    quantity: number
    date: string
}

export type OutflowDetail = {
    id?: number
    product?: Option & {
        unit_price?: number
        combinations?: unknown[]
    }
    quantity?: number
    unit_price?: number
    total_price?: number
    reason?: string
    date?: string
    combinations?: unknown[]
}

export type TableProps = {
    dataSource: OutflowTableRow[]
}
