import CONSTANTS from '@/modules/constants/filters';
import { Fields } from '@/types/form';

const fields: Fields = [
    {
        "label": CONSTANTS.SCHEME.NAME,
        "name": CONSTANTS.KEYS.NAME,
        "description": CONSTANTS.DESCRIPTION.NAME,
        "type": "text"
    },
    {
        "label": CONSTANTS.SCHEME.FILTERS,
        "name": CONSTANTS.KEYS.FILTERS,
        "description": CONSTANTS.DESCRIPTION.FILTERS,
        "type": "tagbox"
    }
]

export default fields;
