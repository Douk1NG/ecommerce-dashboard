# API Documentation

## POST `/api/filter`

### Request Body
```json
{
    "name": "Talla alfabética",
    "filters": ["XS", "S", "M", "L", "XL", "OVERSIZE M"]
}
```

---

## PUT `/api/filter`

### Request Body
```json
{
    "id": 1,
    "name": "Talla alfabética",
    "filters": ["XS", "S", "M", "L", "XL", "OVERSIZE M"]
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
        "filters": ["XS", "S", "M", "L", "XL", "OVERSIZE M"]
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
    "filters": ["XS", "S", "M", "L", "XL", "OVERSIZE M"]
}
```