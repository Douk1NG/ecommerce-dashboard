import type { Option } from '@/src/shared/types/select'
import { z } from 'zod'
import inflowSchema from '@/src/features/inventory/inflowSchemas'

export type Inflow = z.infer<typeof inflowSchema>

export type InflowTableRow = {
    id: number
    product: string
    quantity: number
    date: string
}

export type InflowDetail = {
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
    dataSource: InflowTableRow[]
}
