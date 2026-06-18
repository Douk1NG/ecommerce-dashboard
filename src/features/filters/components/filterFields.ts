import { Fields } from '@/src/shared/types/form';

const fields: Fields = [
    {
        "label": "scheme.name",
        "name": "name",
        "description": "descriptions.name",
        "type": "text"
    },
    {
        "label": "scheme.filters",
        "name": "filters",
        "description": "descriptions.filters",
        "type": "tagbox"
    }
]

export default fields;
