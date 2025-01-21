# API Documentation

## POST `/api/categories`

### Request Body
```multipart/form-data
name: "Camiseta"
description: ""
featured_category: true
parent: '{"id": 1, "value": "Ropa"}'
filters: '[1, 2]'
image: image.jpg
```

## Response Body
```json
{
    "success": true,
    "message": "Category created successfully",
    "body": {
        "id": 1
    }
}
```

---
## PUT `/api/categories/:id`

### Request Body
```multipart/form-data
id: 1
name: "Camiseta"
description: ""
featured_category: true
parent: '{"id": 1, "value": "Ropa"}'
filters: '[1, 2]'
image: image.jpg
```

## Response Body
```json
{
    "success": true,
    "message": "Filter updated successfully",
    "body": {}
}
```

---

## GET `/api/categories`

### Response Body
```json
{
    "success": true,
    "message": "Categories retrieved successfully",
    "body": [{
        "id": 1,
        "name": "Ropa",
        "subcategories": ["Camiseta", "Chaqueta"],
        "filters": ["Talla Alfabética", "Talla numérica"],
        "featured_category": false
    },
    {
        "id": 2,
        "name": "Camiseta",
        "subcategories": [],
        "filters": ["Talla Alfabética"],
        "featured_category": true
    }]
}
```

---

## GET `/api/categories?selectable=true`

### Response Body
```json
{
    "success": true,
    "message": "Categories retrieved successfully",
    "body": [{
        "id": 1,
        "value": "Ropa",
        "filters": [{
            "id": 1,
            "value": "Talla Alfabética"
        }, {
            "id": 2,
            "value": "Talla numérica"
        }]
    }, {
        "id": 2,
        "value": "Camiseta",
        "filters": [{
            "id": 1,
            "value": "Talla Alfabética"
        }]
    }]
}
```

---
## GET `/api/categories/:id`

### Response Body
```json
{
    "success": true,
    "message": "Category retrieved successfully",
    "body": {
        "id": 1,
        "name": "Ropa",
        "description": "",
        "featured_category": false,
        "parent": {
            "id": 1,
            "value": "Ropa"
        },
        "filters": [{
            "id": 1,
            "value": "Talla Alfabética"
        }, {
            "id": 2,
            "value": "Talla numérica"
        }],
        "image": "https://www.google.com/image.jpg"
    }
}
```

---

## DELETE `/api/categories/:id`

### Response Body
```json
{
    "success": true,
    "message": "Category deleted successfully",
    "body": {}
}
```