import { Fields } from '@/src/shared/types/form';
import CONSTANTS from '@/src/shared/constants/inflow';
import type { Option } from "@/src/shared/types/select";

type FieldsProps = {
    products?: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ products }) => [
    {
        "label": CONSTANTS.SCHEME.PRODUCT,
        "name": CONSTANTS.KEYS.PRODUCT,
        "description": CONSTANTS.DESCRIPTION.PRODUCT,
        "type": "select",
        ...(products ? { options: products } : {})
    },
    {
        "label": CONSTANTS.SCHEME.QUANTITY,
        "name": CONSTANTS.KEYS.QUANTITY,
        "description": CONSTANTS.DESCRIPTION.QUANTITY,
        "type": "number"
    },
    {
        "label": CONSTANTS.SCHEME.UNIT_PRICE,
        "name": CONSTANTS.KEYS.UNIT_PRICE,
        "description": CONSTANTS.DESCRIPTION.UNIT_PRICE,
        "type": "currency",
        "readOnly": true,
        "disabled": true,
        "inheritFrom": {
            "field": CONSTANTS.KEYS.PRODUCT,
            "property": CONSTANTS.KEYS.UNIT_PRICE
        }
    },
    {
        "label": CONSTANTS.SCHEME.COMBINATIONS,
        "name": CONSTANTS.KEYS.COMBINATIONS,
        "description": CONSTANTS.DESCRIPTION.COMBINATIONS,
        "type": "group_variant_inventory",
        "inheritFrom": {
            "field": CONSTANTS.KEYS.PRODUCT,
            "property": CONSTANTS.KEYS.COMBINATIONS
        }
    }
]

export default fields;
