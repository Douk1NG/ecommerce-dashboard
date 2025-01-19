# API Documentation

## POST `/api/filter`

### Request Body
```json
{
    "name": "Talla alfabética",
    "filters": ["XS", "S", "M", "L", "XL"]
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

---

## GET `/api/filter`

### Response Body
```json
[
    {
        "id": 1,
        "name": "Talla alfabética",
        "filters": ["XS", "S", "M", "L"]
    }
    {
        "id": 2,
        "name": "Talla númerica",
        "filters": ["37", "38", "39", "40"]
    }
]
```

---

## GET `/api/filter/:id`

### Response Body
```json
{
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
```