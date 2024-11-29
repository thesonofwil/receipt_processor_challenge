# Receipt Processor Challenge

This is an implementation of [Fetch-Rewards Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge). The application is developed in TypeScript using Node.js and Express, and can be run using Docker.

## Endpoints

#### 1. POST /receipts/process

Generates a unique UUID for a receipt and stores the ID and receipt in a in-memory data structure. The ID is returned. Some basic validations are performed:

- In addition to the original constraints in [api.yaml](./spec/api.yaml), a few more constraints were added, including:
  - purchaseDates must be in YYYY-MM-DD format
  - purchaseTimes must be in HH:MM format
- No duplicate receipts can be posted
- The sum of prices must match the written total

**Request example**

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },
    {
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },
    {
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },
    {
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },
    {
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```

**Response example**

```json
{
  "id": "5e5d1d41-7b98-4134-b425-f45ee8559ee1"
}
```

#### 2. GET /receipts/{id}/points

Fetches the points earned for a given receipt ID. Points are calculated based on receipt details. If the receipt is not found, an error is returned.

**Response example**

```json
{
  "points": 35
}
```

## Docker Instructions

#### 1. Clone the repository

Clone the repository and navigate to the project directory

```bash
git clone https://github.com/thesonofwil/receipt_processor_challenge.git
cd receipt_processor_challenge
```

#### 2. Build the Docker Image

Ensure Docker is installed and build the image.

```bash
docker build -t receipt-processor .
```

#### 3. Run the Docker Container

Run the container to start the application.

```bash
docker run -p 3000:3000 receipt-processor
```

The application will now be accessible at http://localhost:3000.

#### 4. Test the Endpoints

Use a REST client such as Postman or cURL commands to call the APIs listed above.

Example cUrl commands:

- `POST /receipts/process`

```bash
curl -X POST http://localhost:3000/receipts/process \
  -H "Content-Type: application/json" \
  -d '{
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
      { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
      { "shortDescription": "Emils Cheese Pizza", "price": "12.25" },
      { "shortDescription": "Knorr Creamy Chicken", "price": "1.26" },
      { "shortDescription": "Doritos Nacho Cheese", "price": "3.35" },
      { "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ", "price": "12.00" }
    ],
    "total": "35.35"
  }'
```

- `GET /receipts/{id}/points`

```bash
curl -X GET http://localhost:3000/receipts/{id}/points
```

where `{id}` is the UUID generated from the POST call.

## Notes

- This application uses an in-memory data structure, so all receipts are lost when the application is stopped or restarted.
- If you make changes to the code, then the image must be rebuilt using the previous build command.
