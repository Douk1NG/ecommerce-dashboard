import { Fields } from '@/src/shared/types/form';
import type { Option } from "@/src/shared/types/select";

type FieldsProps = {
    categories?: Option[]
    filter_combinations?: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ categories, filter_combinations }) => [
    {
        "label": "scheme.name",
        "name": "name",
        "description": "descriptions.name",
        "type": "text"
    },
    {
        "label": "scheme.description",
        "name": "description",
        "description": "descriptions.description",
        "type": "textarea"
    },
    {
        "label": "scheme.categories",
        "name": "categories",
        "description": "descriptions.categories",
        "type": "multiselect",
        ...(categories ? { options: categories } : {})
    },
    {
        "label": "scheme.price",
        "name": "price",
        "description": "descriptions.price",
        "type": "currency"
    },

    {
        "label": "scheme.featured_product",
        "name": "featured_product",
        "description": "descriptions.featured_product",
        "type": "switch"
    },
    {
        "label": "scheme.filter_combinations",
        "name": "filter_combinations",
        "description": "descriptions.filter_combinations",
        "type": "group_variant_product",
        "inheritFrom": {
            "field": "categories",
            "property": "filters"
        },
        ...(filter_combinations ? { options: filter_combinations } : {})
    },
    {
        "label": "scheme.images",
        "name": "images",
        "description": "descriptions.images",
        "type": "image",
        "options": {
            "maxFiles": 5,
            "maxFileSize": 5 * 1024 * 1024,
            "preferred": {
                "enabled": true
            }
        }
    },
    {
        "label": "scheme.active",
        "name": "active",
        "description": "descriptions.active",
        "type": "switch",
        "defaultValue": true
    }
]

export default fields;
