import { Fields } from '@/types/form';
import type { Filter } from '@/features/filters/types';
import CONSTANTS from './constants';

const fields: Fields<Filter> = [
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
