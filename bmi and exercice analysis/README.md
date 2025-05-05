# Exercise Calculator API

A simple Node.js/Express API for BMI calculation and exercise analysis.

### Getting started

- To get the app running just install its dependencies with `npm install`

## 📋 Endpoints

### 1. BMI Calculator

**GET** `/bmi`  
Calculate BMI based on height and weight.

**Query Parameters:**

- `height` (number) - in centimeters
- `weight` (number) - in kilograms

**Example:**

```bash
GET /bmi?height=180&weight=72
```

**Success response:**

```json
{
  "height": 180,
  "weight": 72,
  "bmi": "Normal (healthy weight)"
}
```

**Error response:**

```json
{
  "error": "malformatted parameters"
}
```

### 2. Exercise analysis

**POST** `/exercises`

Analyze daily exercise hours against target.

**Request Body:**

```json
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

**Success response:**

```json
{
  "periodLength": 7,
  "trainingDays": 4,
  "success": false,
  "rating": 2,
  "ratingDescription": "not too bad but could be better",
  "target": 2.5,
  "average": 1.214
}
```

**Error response:**

```json
{
  "error": "malformatted parameters"
}
```
