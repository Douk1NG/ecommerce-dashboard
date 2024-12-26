import { Fields } from '@/types/form';
import CONSTANTS from '@/modules/constants/products';

const fields = (
    categories = []
): Fields => {
    return [
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
            "label": CONSTANTS.SCHEME.PRICE,
            "name": CONSTANTS.KEYS.PRICE,
            "description": CONSTANTS.DESCRIPTION.PRICE,
            "type": "currency"
        },
        {
            "label": CONSTANTS.SCHEME.CATEGORIES,
            "name": CONSTANTS.KEYS.CATEGORIES,
            "description": CONSTANTS.DESCRIPTION.CATEGORIES,
            "type": "multiselect",
            "options": categories
        },
        {
            "label": CONSTANTS.SCHEME.IMAGES,
            "name": CONSTANTS.KEYS.IMAGES,
            "description": CONSTANTS.DESCRIPTION.IMAGES,
            "type": "file",
            "multiple": true
        },
        {
            "label": CONSTANTS.SCHEME.ACTIVE,
            "name": CONSTANTS.KEYS.ACTIVE,
            "description": CONSTANTS.DESCRIPTION.ACTIVE,
            "type": "switch"
        },
        {
            "label": CONSTANTS.SCHEME.FEATURED_PRODUCT,
            "name": CONSTANTS.KEYS.FEATURED_PRODUCT,
            "description": CONSTANTS.DESCRIPTION.FEATURED_PRODUCT,
            "type": "switch"
        },
    ]
}

export default fields;
