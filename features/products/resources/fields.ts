import { Fields } from '@/types/form';
import type { Product } from '@/features/products/types';

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
            {
                "label": "Electronics",
                "value": 1
            },
            {
                "label": "Clothing",
                "value": 2
            },
            {
                "label": "Books",
                "value": 3
            },
            {
                "label": "Home & Kitchen",
                "value": 4
            },
            {
                "label": "Beauty1",
                "value": 5
            },
            {
                "label": "Beauty2",
                "value": 6
            },
            {
                "label": "Beauty3",
                "value": 7
            },
            {
                "label": "Beauty4",
                "value": 8
            }
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
