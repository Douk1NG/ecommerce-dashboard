const navItems = [
    {
        "title": "orders",
        "url": "/orders",
        "icon": "shopping-cart"
    },
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
        "title": "inventary",
        "url": "/inventary",
        "icon": "book-open-text",
        "items": [
            {
                "title": "inflow",
                "url": "inflow",
                "icon": "arrow-down-right"
            },
            {
                "title": "outflow",
                "url": "/outflow",
                "icon": "arrow-up-left"
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