import { Fields } from '@/types/form';
import CONSTANTS from "@/modules/constants/categories";
import type { Option } from "@/types/form";

const fields: (options: Option[]) => Fields = (options) => [
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
        "options": options,
        "propagates": {
            [CONSTANTS.KEYS.FILTERS]: CONSTANTS.KEYS.FILTERS
        }
    },
    {
        "label": CONSTANTS.SCHEME.FEATURED_CATEGORY,
        "name": CONSTANTS.KEYS.FEATURED_CATEGORY,
        "description": CONSTANTS.DESCRIPTION.FEATURED_CATEGORY,
        "type": "switch"
    },
    {
        "label": CONSTANTS.SCHEME.FILTERS,
        "name": CONSTANTS.KEYS.FILTERS,
        "description": CONSTANTS.DESCRIPTION.FILTERS,
        "type": "multiselect",
        "group": CONSTANTS.KEYS.FILTERS,
        "options": []
    },
    {
        "label": CONSTANTS.SCHEME.IMAGE,
        "name": CONSTANTS.KEYS.IMAGE,
        "description": CONSTANTS.DESCRIPTION.IMAGE,
        "type": "file"
    },
]

export default fields;
