import { Fields } from '@/types/form';
import CONSTANTS from "@/modules/constants/categories";
import type { Option } from "@/types/components/select";

type FieldsProps = {
    categories: Option[],
    filters: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ categories, filters }) => [
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
        "label": CONSTANTS.SCHEME.PARENT_ID,
        "name": CONSTANTS.KEYS.PARENT_ID,
        "description": CONSTANTS.DESCRIPTION.PARENT_ID,
        "type": "select",
        "options": categories
    },
    {
        "label": CONSTANTS.SCHEME.FILTERS,
        "name": CONSTANTS.KEYS.FILTERS,
        "description": CONSTANTS.DESCRIPTION.FILTERS,
        "type": "multiselect",
        "options": filters,
        "inheritFrom": {
            "field": CONSTANTS.KEYS.PARENT_ID,
            "property": CONSTANTS.KEYS.FILTERS
        }
    },
    {
        "label": CONSTANTS.SCHEME.FEATURED_CATEGORY,
        "name": CONSTANTS.KEYS.FEATURED_CATEGORY,
        "description": CONSTANTS.DESCRIPTION.FEATURED_CATEGORY,
        "type": "switch"
    },
    {
        "label": CONSTANTS.SCHEME.IMAGE,
        "name": CONSTANTS.KEYS.IMAGE,
        "description": CONSTANTS.DESCRIPTION.IMAGE,
        "type": "image",
        "options": {
            "maxFiles": 1
        }
    }
]

export default fields;
