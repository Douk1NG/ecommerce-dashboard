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
                "combination_id": 1,
                "quantity": 10,
                "filters": ["Filter 1", "Filter 2"]
            }]
            },
            "quantity": 10,
            "date": "2021-01-01"
        }
}