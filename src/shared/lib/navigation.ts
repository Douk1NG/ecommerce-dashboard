import { NavItem } from "@/src/shared/types/nav"

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
        "items": [
            {
                "title": "inflow",
                "url": "/inflow",
                "icon": "book-open-text"
            },
            {
                "title": "outflow",
                "url": "/outflow",
                "icon": "book-open-text"
            }
        ]
    },
    {
        "title": "settings",
        "url": "/settings",
        "icon": "wrench"
    }
]

export default navItems