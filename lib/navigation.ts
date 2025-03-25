import { NavItem } from "@/types/nav"

const navItems: NavItem[] = [
    // {
    //     "title": "orders",
    //     "url": "/orders",
    //     "icon": "shopping-cart",
    // },
    {
        "title": "products",
        "url": "/products",
        "icon": "package",
        "items": [
            {
                "title": "categories",
                "url": "/categories",
                "icon": "tag"
            },
            {
                "title": "filters",
                "url": "/filters",
                "icon": "filter"
            }
        ]
    },
    {
        "title": "inventory",
        "url": "/inventory",
        "icon": "book-open-text",
        "items": []
    },
    {
        "title": "settings",
        "url": "/settings",
        "icon": "wrench"
    }
]

export default navItems