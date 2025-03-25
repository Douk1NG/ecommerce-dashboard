import { Fields } from '@/types/form';
import CONSTANTS from '@/constants/products';
import type { Option } from "@/types/select";

type FieldsProps = {
    categories?: Option[]
    filter_combinations?: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ categories, filter_combinations }) => [
    {
        "label": CONSTANTS.SCHEME.NAME,
        "name": CONSTANTS.KEYS.NAME,
        "description": CONSTANTS.DESCRIPTIONS.NAME,
        "type": "text"
    },
    {
        "label": CONSTANTS.SCHEME.DESCRIPTION,
        "name": CONSTANTS.KEYS.DESCRIPTION,
        "description": CONSTANTS.DESCRIPTIONS.DESCRIPTION,
        "type": "textarea"
    },
    {
        "label": CONSTANTS.SCHEME.CATEGORIES,
        "name": CONSTANTS.KEYS.CATEGORIES,
        "description": CONSTANTS.DESCRIPTIONS.CATEGORIES,
        "type": "multiselect",
        "options": categories
    },
    {
        "label": CONSTANTS.SCHEME.PRICE,
        "name": CONSTANTS.KEYS.PRICE,
        "description": CONSTANTS.DESCRIPTIONS.PRICE,
        "type": "currency"
    },

    {
        "label": CONSTANTS.SCHEME.FEATURED_PRODUCT,
        "name": CONSTANTS.KEYS.FEATURED_PRODUCT,
        "description": CONSTANTS.DESCRIPTIONS.FEATURED_PRODUCT,
        "type": "switch"
    },
    {
        "label": CONSTANTS.SCHEME.FILTER_COMBINATIONS,
        "name": CONSTANTS.KEYS.FILTER_COMBINATIONS,
        "description": CONSTANTS.DESCRIPTIONS.FILTER_COMBINATIONS,
        "type": "group_variant_product",
        "inheritFrom": {
            "field": CONSTANTS.KEYS.CATEGORIES,
            "property": "filters"
        },
        "options": filter_combinations
    },
    {
        "label": CONSTANTS.SCHEME.IMAGES,
        "name": CONSTANTS.KEYS.IMAGES,
        "description": CONSTANTS.DESCRIPTIONS.IMAGES,
        "type": "image",
        "options": {
            "maxFiles": 5,
            "maxFileSize": 5 * 1024 * 1024,
            "preferred": {
                "enabled": true
            }
        }
    },
    {
        "label": CONSTANTS.SCHEME.ACTIVE,
        "name": CONSTANTS.KEYS.ACTIVE,
        "description": CONSTANTS.DESCRIPTIONS.ACTIVE,
        "type": "switch",
        "defaultValue": true
    }
]

export default fields;
