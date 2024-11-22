import { Fields } from '@/types/form';
import type { FormValues } from '@/types/filters';

const fields: Fields<FormValues> = [
    {
        "label": "Name",
        "name": "name",
        "type": "text",
        "description": "Set the category name."
    },
    {
        "label": "Filters",
        "name": "filters",
        "type": "multiselect",
        "creatable": true,
        "description": "Set the category filters.",
        "placeholder": "Select filters",
        "options": [
            { "value": "Numeric sizes", "label": "Mujer" },
            { "value": "Alpabetic sizes", "label": "Tennis" },
        ]
    }
]

export default fields;
