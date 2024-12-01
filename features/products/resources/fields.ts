import { Fields } from '@/types/form';
import type { Product } from '@/types/products';

const fields: Fields<Product> = [
    {
        "label": "scheme.name",
        "name": "name",
        "type": "text",
        "description": "description.name"
    },
    {
        "label": "scheme.description",
        "name": "description",
        "type": "textarea",
        "description": "description.description"
    },
    {
        "label": "scheme.price",
        "name": "price",
        "type": "currency",
        "description": "description.price"
    },
    {
        "label": "scheme.categories",
        "name": "categories",
        "type": "multiselect",
        "description": "description.categories",
        "options": [
            { "value": "Mujer", "label": "Mujer" },
            { "value": "Tennis", "label": "Tennis" },
            { "value": "Short", "label": "Short" },
            { "value": "Running", "label": "Running" }
        ],
        "placeholder": "Select categories"
    },
    {
        "label": "scheme.images",
        "name": "images",
        "type": "file",
        "description": "description.images"
    },
    {
        "label": "scheme.active",
        "name": "active",
        "type": "switch",
        "description": "description.active"
    }
]

export default fields;
