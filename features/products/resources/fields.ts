import { Fields } from '@/types/form';
import type { FormValues } from '@/types/products';

const fields: Fields<FormValues> = [
    {
        "label": "Title",
        "name": "title",
        "type": "text",
        "description": "Set the product title."
    },
    {
        "label": "Description",
        "name": "description",
        "type": "textarea",
        "description": "Set the product description."
    },
    {
        "label": "Price",
        "name": "price",
        "type": "currency",
        "description": "Set the product price."
    },
    {
        "label": "Categories",
        "name": "categories",
        "type": "multiselect",
        "description": "Set the product categories.",
        "options": [
            { "value": "Mujer", "label": "Mujer" },
            { "value": "Tennis", "label": "Tennis" },
            { "value": "Short", "label": "Short" },
            { "value": "Running", "label": "Running" }
        ],
        "placeholder": "Select categories"
    },
    {
        "label": "Image",
        "name": "image",
        "type": "file",
        "description": "Set the product image."
    },
    {
        "label": "Active",
        "name": "active",
        "type": "switch",
        "description": "Set the product status."
    }
]

export default fields;
