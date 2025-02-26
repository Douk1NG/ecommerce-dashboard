import { Fields } from '@/types/form';
import CONSTANTS from '@/modules/constants/inflow';
import type { Option } from "@/types/select";

type FieldsProps = {
    products?: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ products }) => [
    {
        "label": CONSTANTS.SCHEME.PRODUCT_NAME,
        "name": CONSTANTS.KEYS.PRODUCT_ID,
        "description": CONSTANTS.DESCRIPTION.PRODUCT_NAME,
        "type": "select",
        "options": products
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
        "type": "currency"
    },
    {
        "label": CONSTANTS.SCHEME.COMBINATIONS,
        "name": CONSTANTS.KEYS.COMBINATIONS,
        "description": CONSTANTS.DESCRIPTION.COMBINATIONS,
        "type": "group_variant_inventory"
    }
]

export default fields;
