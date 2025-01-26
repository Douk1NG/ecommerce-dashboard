# API Documentation

## POST `/api/filter`

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
## PUT `/api/filters/:id`

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

## GET `/api/filter?selectable=true`

### Response Body
```json
{
    "success": true,
    "message": "Filters retrieved successfully",
    "body": [{
        "value": 1,
        "label": "Talla alfabética"
    }, {
        "value": 2,
        "label": "Talla númerica"
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
            "value": 1,
            "label": "XS"
        }, {
            "value": 2,
            "label": "S"
        }, {
            "value": 3,
            "label": "M"
        }, {
            "value": 4,
            "label": "L"
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