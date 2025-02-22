# API Documentation

## POST `/api/products`

### Request Body
- delete_images: [urls]
- main image: string | file  --> si es file reemplazar imagen principal, si es string se actualiza la imagen principal o no se actualiza
- related images: todas las imagenes nuevas
```multipart/form-data
name: "Camiseta"
description: ""
categories: "[1, 2]"
price: "100"
featured_product: "1"
filter_combinations: "[{"price": "100", "filters": "[1, 2]"}, {"price": "100", "filters": "[1]"}]"
main_image: 'Berserker Tattoo.jpeg'
related_images[]: File {
    size: 136887,
    type: 'image/jpeg',
    name: 'Berserker Tattoo.jpeg',
    lastModified: 1739581215568
}
active: "1"
```

## Response Body
```json
{
    "success": true,
    "message": "Product created successfully",
    "body": {
        "id": 1
    }
}
```

---
## POST `/api/products/:id`
- delete_images: [urls]
- main image: string | file  --> si es file reemplazar imagen principal, si es string se actualiza la imagen principal o no se actualiza
- related images: todas las imagenes nuevas
### Request Body
```multipart/form-data
id: 1
name: "Camiseta"
description: ""
categories: "[1, 2]"
price: "100"
featured_product: "1"
filter_combinations: "[{"price": "100", "filters": "[1, 2]"}, {"price": "100", "filters": "[1]"}]"
main_image: 'Berserker Tattoo.jpeg'
related_images[]: File {
    size: 136887,
    type: 'image/jpeg',
    name: 'Berserker Tattoo.jpeg',
    lastModified: 1739581215568
}
active: "1"
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

## GET `/api/products`

### Response Body
```json
{
    "success": true,
    "message": "Products retrieved successfully",
    "body": [{
        "id": 1,
        "name": "Ropa",
        "price": 100,
        "active": 1
    },
    {
        "id": 2,
        "name": "Camiseta",
        "price": 100,
        "active": 1
    }]
}
```

---
## GET `/api/products/:id`

### Response Body
```json
{
    "success": true,
    "message": "Product retrieved successfully",
    "body": {
        "id": 16,
        "name": "Camisa POLO",
        "description": "description",
        "price": "5000.00",
        "featured_product": false,
        "active": true,
        "categories": [
            {
                "value": 1,
                "label": "Ropa",
                "filters": [
                    {
                        "value": 3,
                        "label": "Tallas de ropa",
                        "filters": []
                    },
                    {
                        "value": 2,
                        "label": "Colores",
                        "filters": []
                    },
                    {
                        "value": 1,
                        "label": "Marca",
                        "filters": []
                    }
                ]
            }
        ],
        "filter_combinations": [
            {
                "id": 6,
                "filters": [{
                    "value": 2,
                    "label": "Colores"
                }],
                "price": "10000"
            },
            {
                "id": 11,
                "filters": [{
                    "value": 1,
                    "label": "Marca"
                }],
                "price": "10000"
            }
        ],
        "images": {
            "values": ["http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe7201551e_1739581216.jpeg", "http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe720986c0_1739581216.jpeg"],
            "preferred": "http://tenant1.localhost:8000/storage/tenancy/tenants/tenant1/products/16/67afe720986c0_1739581216.jpeg",
        }
    }
}
```

---

## DELETE `/api/products/:id`

### Response Body
```json
{
    "success": true,
    "message": "Product deleted successfully",
    "body": {}
}
```