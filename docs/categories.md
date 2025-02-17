# API Documentation

## POST `/api/categories`

### Request Body
Se omite el campo featured_category si no se quiere actualizar
```multipart/form-data
name: "Camiseta"
description: ""
featured_category: 'on'
parent_id: '1'
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
## POST `/api/categories/:id`
se envia url en el campo image si no se quiere actualizar, se omite si se quiere eliminar
Se omite el campo featured_category si no se quiere actualizar
### Request Body
```multipart/form-data
id: 1
name: "Camiseta"
description: ""
featured_category: 'on'
parent_id: "1"
filters: '[1, 2]'
_method: 'PUT'
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
        "value": 1,
        "label": "Ropa",
        "filters": [{
            "value": 1,
            "label": "Talla Alfabética"
        }, {
            "value": 2,
            "label": "Talla numérica"
        }]
    }, {
        "value": 2,
        "label": "Camiseta",
        "filters": [{
            "value": 1,
            "label": "Talla Alfabética"
        }]
    }]
}
```

## GET `/api/categories?selectable=true&full=true`

### Response Body
```json
{
    "success": true,
    "message": "Categories retrieved successfully",
    "body": [{
        "value": 1,
        "label": "Ropa",
        "filters": [{
            "value": 1,
            "label": "Talla Alfabética",
            "filters": [{
                "value": 21,
                "label": "XS"
            }, {
                "value": 22,
                "label": "S"
            }, {
                "value": 23,
                "label": "M"
            }]
        }, {
            "value": 2,
            "label": "Talla numérica",
            "filters": [{
                "value": 11,
                "label": "30"
            }, {
                "value": 12,
                "label": "31"
            }, {
                "value": 13,
                "label": "32"
            }]
        }]
    }, {
        "value": 2,
        "label": "Camiseta",
        "filters": [{
            "value": 1,
            "label": "Talla Alfabética",
            "filters": [{
                "value": 21,
                "label": "XS"
            }, {
                "value": 22,
                "label": "S"
            }, {
                "value": 23,
                "label": "M"
            }]
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
        "featured_category": true,
        "parent_id": {
            "value": 1,
            "label": "Ropa"
        },
        "filters": [{
            "value": 1,
            "label": "Talla Alfabética"
        }, {
            "value": 2,
            "label": "Talla numérica"
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