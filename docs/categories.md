# API Documentation

## POST `/api/categories`

### Request Body
```json
{
    "name": "Talla alfabética",
    "filters": ["XS", "S", "M", "L", "XL"]
}
```

## Response Body
```json
{
    "success": true,
    "message": "Filter created successfully",
    "body": {
        "id": 1
    }
}
```

---
## PUT `/api/filter`

### Request Body
```json
{
    "id": 1,
    "name": "Talla alfabética",
    "filters": ["XS", "S", "M", "L"]
}
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

## GET `/api/filter`

### Response Body
```json
{
    "success": true,
    "message": "Filters retrieved successfully",
    "body": [{
        "id": 1,
        "name": "Talla alfabética",
        "filters": ["XS", "S", "M", "L"]
    }, {
        "id": 2,
        "name": "Talla númerica",
        "filters": ["37", "38", "39", "40"]
    }]
}
```

---
## GET `/api/filter/:id`

### Response Body
```json
{
    "success": true,
    "message": "Filter retrieved successfully",
    "body": {
        "id": 1,
        "name": "Talla alfabética",
        "filters": [{
            "id": 1,
            "value": "XS"
        }, {
            "id": 2,
            "value": "S"
        }, {
            "id": 3,
            "value": "M"
        }, {
            "id": 4,
            "value": "L"
        }]
    }
}
```

---

## DELETE `/api/filter/:id`

### Response Body
```json
{
    "success": true,
    "message": "Filter deleted successfully",
    "body": {}
}
```