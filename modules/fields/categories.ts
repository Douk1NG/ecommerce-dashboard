import { Fields } from '@/types/form';
import CONSTANTS from "@/modules/constants/categories";

const fields: Fields = [
    {
        "label": CONSTANTS.SCHEME.NAME,
        "name": CONSTANTS.KEYS.NAME,
        "description": CONSTANTS.DESCRIPTION.NAME,
        "type": "text"
    },
    {
        "label": CONSTANTS.SCHEME.SUBCATEGORIES,
        "name": CONSTANTS.KEYS.SUBCATEGORIES,
        "description": CONSTANTS.DESCRIPTION.SUBCATEGORIES,
        "type": "multiselect",
        "options": []
    },
    {
        "label": CONSTANTS.SCHEME.FILTERS,
        "name": CONSTANTS.KEYS.FILTERS,
        "description": CONSTANTS.DESCRIPTION.FILTERS,
        "type": "multiselect",
        "options": []
    }
]

export default fields;
