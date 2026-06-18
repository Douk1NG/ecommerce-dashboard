import { Fields } from '@/src/shared/types/form';
import type { Option } from "@/src/shared/types/select";

type FieldsProps = {
    products?: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ products }) => [
    {
        "label": "scheme.product",
        "name": "product",
        "description": "description.product",
        "type": "select",
        ...(products ? { options: products } : {})
    },
    {
        "label": "scheme.quantity",
        "name": "quantity",
        "description": "description.quantity",
        "type": "number"
    },
    {
        "label": "scheme.unit_price",
        "name": "unit_price",
        "description": "description.unit_price",
        "type": "currency",
        "readOnly": true,
        "disabled": true,
        "inheritFrom": {
            "field": "product",
            "property": "unit_price"
        }
    },
    {
        "label": "scheme.combinations",
        "name": "combinations",
        "description": "description.combinations",
        "type": "group_variant_inventory",
        "inheritFrom": {
            "field": "product",
            "property": "combinations"
        }
    }
]

export default fields;
