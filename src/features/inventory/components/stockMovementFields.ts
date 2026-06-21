import { Fields } from '@/src/shared/types/form'
import type { Option } from '@/src/shared/types/select'

type FieldsProps = {
    products?: Option[]
}

const stockMovementFields: (props: FieldsProps) => Fields = ({ products }) => [
    {
        label: 'scheme.product',
        name: 'product',
        description: 'descriptions.product',
        type: 'select',
        ...(products ? { options: products } : {}),
    },
    {
        label: 'scheme.quantity',
        name: 'quantity',
        description: 'descriptions.quantity',
        type: 'number',
    },
    {
        label: 'scheme.unit_price',
        name: 'unit_price',
        description: 'descriptions.unit_price',
        type: 'currency',
        readOnly: true,
        disabled: true,
        inheritFrom: {
            field: 'product',
            property: 'unit_price',
        },
    },
    {
        label: 'scheme.total_price',
        name: 'total_price',
        description: 'descriptions.total_price',
        type: 'currency',
    },
    {
        label: 'scheme.reason',
        name: 'reason',
        description: 'descriptions.reason',
        type: 'text',
    },
    {
        label: 'scheme.date',
        name: 'date',
        description: 'descriptions.date',
        type: 'text',
    },
    {
        label: 'scheme.combinations',
        name: 'combinations',
        description: 'descriptions.combinations',
        type: 'group_variant_inventory',
        inheritFrom: {
            field: 'product',
            property: 'combinations',
        },
    },
]

export default stockMovementFields
