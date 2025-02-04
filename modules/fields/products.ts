import { Fields } from '@/types/form';
import CONSTANTS from '@/modules/constants/products';
import type { Option } from "@/types/form";

type FieldsProps = {
    categories: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ categories }) => [
    {
        "label": CONSTANTS.SCHEME.NAME,
        "name": CONSTANTS.KEYS.NAME,
        "description": CONSTANTS.DESCRIPTION.NAME,
        "type": "text"
    },
    {
        "label": CONSTANTS.SCHEME.DESCRIPTION,
        "name": CONSTANTS.KEYS.DESCRIPTION,
        "description": CONSTANTS.DESCRIPTION.DESCRIPTION,
        "type": "textarea"
    },
    {
        "label": CONSTANTS.SCHEME.CATEGORIES,
        "name": CONSTANTS.KEYS.CATEGORIES,
        "description": CONSTANTS.DESCRIPTION.CATEGORIES,
        "type": "multiselect",
        "options": categories
    },
    {
        "label": CONSTANTS.SCHEME.PRICE,
        "name": CONSTANTS.KEYS.PRICE,
        "description": CONSTANTS.DESCRIPTION.PRICE,
        "type": "currency"
    },

    {
        "label": CONSTANTS.SCHEME.FEATURED_PRODUCT,
        "name": CONSTANTS.KEYS.FEATURED_PRODUCT,
        "description": CONSTANTS.DESCRIPTION.FEATURED_PRODUCT,
        "type": "switch"
    },
    {
        "label": CONSTANTS.SCHEME.FILTER_COMBINATIONS,
        "name": CONSTANTS.KEYS.FILTER_COMBINATIONS,
        "description": CONSTANTS.DESCRIPTION.FILTER_COMBINATIONS,
        "type": "tagbox",
        "inheritFrom": {
            "field": CONSTANTS.KEYS.CATEGORIES,
            "property": "filters"
        }
    },
    {
        "label": CONSTANTS.SCHEME.IMAGES,
        "name": CONSTANTS.KEYS.IMAGES,
        "description": CONSTANTS.DESCRIPTION.IMAGES,
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
        "description": CONSTANTS.DESCRIPTION.ACTIVE,
        "type": "switch"
    }
]

export default fields;
