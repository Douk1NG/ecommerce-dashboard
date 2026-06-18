import { Fields } from '@/src/shared/types/form';
import type { Option } from "@/src/shared/types/select";

type FieldsProps = {
    categories: Option[],
    filters: Option[]
}

const fields: (props: FieldsProps) => Fields = ({ categories, filters }) => [
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
        "label": "scheme.parent_id",
        "name": "parent_id",
        "description": "descriptions.parent_id",
        "type": "select",
        "options": categories
    },
    {
        "label": "scheme.filters",
        "name": "filters",
        "description": "descriptions.filters",
        "type": "multiselect",
        "options": filters,
        "inheritFrom": {
            "field": "parent_id",
            "property": "filters"
        }
    },
    {
        "label": "scheme.featured_category",
        "name": "featured_category",
        "description": "descriptions.featured_category",
        "type": "switch"
    },
    {
        "label": "scheme.image",
        "name": "image",
        "description": "descriptions.image",
        "type": "image",
        "options": {
            "maxFiles": 1
        }
    }
]

export default fields;
