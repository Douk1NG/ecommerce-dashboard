import { Fields } from '@/types/form';
import type { Filter } from '@/features/filters/types';

const fields: Fields<Filter> = [
    {
        "label": "scheme.name",
        "name": "name",
        "type": "text",
        "description": "description.name"
    },
    {
        "label": "scheme.filters",
        "name": "filters",
        "type": "tagbox",
        "description": "description.filters",
        // "placeholder": "Select filters"
    }
]

export default fields;
