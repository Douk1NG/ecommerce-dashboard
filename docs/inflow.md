# API Documentation

## GET `/api/entries`

### Response Body
```json
{
    "success": true,
    "message": "Entries retrieved successfully",
    "body": [{
        "id": 1,
        "product": "Product 1",
        "quantity": 10,
        "date": "2021-01-01"
        }, {
            "id": 2,
            "product": "Product 2",
            "quantity": 20,
            "date": "2021-01-02"
        }, {
            "id": 3,
            "product": "Product 3",
            "quantity": 30,
            "date": "2021-01-03"
        }]
}
```

---
## GET `/api/entries/:id`

### Response Body
```json
{
    "success": true,
    "message": "Entry retrieved successfully",
    "body": {
        "id": 1,
        "product": {
            "value": 1,
            "label": "Product 1",
            "unit_price": 100,
            "combinations": [{
                "value": 1,
                "label": "Combination 1",
                "price": 100
            }]
            },
            "quantity": 10,
            "date": "2021-01-01"
        }
}
```

---
## GET `/api/products?selectable=true&full=true`

### Response Body
```json
{
    "success": true,
    "message": "Products retrieved successfully",
    "body": [{
        "value": 1,
        "label": "Product 1",
        "price": 100,
        "combinations": [{
            "value": 1,
            "label": "Combination 1",
            "price": 100
        }]
    }, {
        "value": 2,
        "label": "Product 2",
        "price": 200,
        "combinations": [{
            "value": 1,
            "label": "Combination 1",
            "price": 100
        }]
    }]
}
```
