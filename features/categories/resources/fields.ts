import { Fields } from '@/types/form';
import type { FormValues } from '@/types/categories';

const fields: Fields<FormValues> = [
    {
        "label": "Name",
        "name": "name",
        "type": "text",
        "description": "Set the category name."
    },
    {
        "label": "Subcategories",
        "name": "subcategories",
        "type": "multiselect",
        "description": "Al seleccionar una subcategoría, estas, heredarán los filtros de la categoría.",
        "options": [
            { "value": "Mujer", "label": "Mujer" },
            { "value": "Tennis", "label": "Tennis" },
            { "value": "Short", "label": "Short" },
            { "value": "Running", "label": "Running" }
        ],
        "placeholder": "Select categories"
    },
    {
        "label": "Filters",
        "name": "filters",
        "type": "multiselect",
        "description": "Set the category filters.",
        "placeholder": "Select filters",
        "options": [
            { "value": "Numeric sizes", "label": "Mujer" },
            { "value": "Alpabetic sizes", "label": "Tennis" },
        ]
    }
]

export default fields;
